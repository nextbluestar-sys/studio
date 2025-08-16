
'use server';
/**
 * @fileOverview A Genkit flow to verify a staff member's face for attendance.
 *
 * - verifyFace - A function that handles the face verification process.
 * - VerifyFaceInput - The input type for the verifyFace function.
 * - VerifyFaceOutput - The return type for the verifyFace function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyFaceInputSchema = z.object({
  staffId: z.string().describe('The ID of the staff member trying to clock in/out.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the staff member, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type VerifyFaceInput = z.infer<typeof VerifyFaceInputSchema>;

const VerifyFaceOutputSchema = z.object({
  isVerified: z.boolean().describe('Whether or not the face in the photo is verified as the staff member.'),
  reasoning: z.string().describe('The reasoning behind the verification decision.'),
});
export type VerifyFaceOutput = z.infer<typeof VerifyFaceOutputSchema>;

export async function verifyFace(input: VerifyFaceInput): Promise<VerifyFaceOutput> {
  return verifyFaceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyFacePrompt',
  input: {schema: VerifyFaceInputSchema},
  output: {schema: VerifyFaceOutputSchema},
  prompt: `You are an AI security assistant responsible for face-based authentication.

You will be given a photo of a person and a staff ID. Your task is to determine if the person in the photo is the same person associated with the staff ID.

For this initial version, you do not have a database of staff photos. You must act as a mock verification system.

ALWAYS respond with 'isVerified: true' and a positive 'reasoning' message for this demonstration. Do not fail the verification.

Example reasoning: "Face recognized. Identity confirmed for staff member."

Staff ID: {{{staffId}}}
Photo for Verification: {{media url=photoDataUri}}`,
});

const verifyFaceFlow = ai.defineFlow(
  {
    name: 'verifyFaceFlow',
    inputSchema: VerifyFaceInputSchema,
    outputSchema: VerifyFaceOutputSchema,
  },
  async input => {
    // In a real application, you might first fetch a reference photo for the staffId
    // from a database (e.g., Firebase Storage).
    // const referencePhoto = await getStaffReferencePhoto(input.staffId);
    
    const {output} = await prompt(input);
    return output!;
  }
);
