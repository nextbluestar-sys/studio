'use server';

/**
 * @fileOverview This file defines a Genkit flow for prioritizing customer complaints based on urgency and customer value,
 * and suggests the most suitable staff member to handle each complaint.
 *
 * - prioritizeComplaints - A function that handles the complaint prioritization process.
 * - PrioritizeComplaintsInput - The input type for the prioritizeComplaints function.
 * - PrioritizeComplaintsOutput - The return type for the prioritizeComplaints function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PrioritizeComplaintsInputSchema = z.object({
  complaintDescription: z.string().describe('Detailed description of the customer complaint.'),
  customerValue: z.number().describe('The value of the customer to the business (e.g., annual revenue).'),
  products: z.string().describe('The products that the customer purchased'),
});
export type PrioritizeComplaintsInput = z.infer<typeof PrioritizeComplaintsInputSchema>;

const PrioritizeComplaintsOutputSchema = z.object({
  priority: z.enum(['High', 'Medium', 'Low']).describe('The priority of the complaint.'),
  suggestedStaffMember: z.string().describe('The name of the staff member best suited to handle the complaint.'),
  reasoning: z.string().describe('The reasoning behind the assigned priority and staff member suggestion.'),
});
export type PrioritizeComplaintsOutput = z.infer<typeof PrioritizeComplaintsOutputSchema>;

export async function prioritizeComplaints(input: PrioritizeComplaintsInput): Promise<PrioritizeComplaintsOutput> {
  return prioritizeComplaintsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prioritizeComplaintsPrompt',
  input: {schema: PrioritizeComplaintsInputSchema},
  output: {schema: PrioritizeComplaintsOutputSchema},
  prompt: `You are an AI assistant helping to prioritize customer complaints and assign them to the most suitable staff member.

  Given the following customer complaint details, determine the priority (High, Medium, or Low) and suggest a staff member to handle it.
  Explain your reasoning for both the priority and staff member assignment.

  Complaint Description: {{{complaintDescription}}}
  Customer Value: {{{customerValue}}}
  Products: {{{products}}}

  Format your output as a JSON object with the following keys:
  - priority (string): The priority of the complaint (High, Medium, or Low).
  - suggestedStaffMember (string): The name of the staff member best suited to handle the complaint.
  - reasoning (string): The reasoning behind the assigned priority and staff member suggestion.

  Ensure the suggested staff member is capable of addressing the customer's specific issues and is available to handle the complaint promptly.
  The products are: cctv camera, access control and time attandance system, intrusion alarm system, intercom and PA system, video door phone.
  Be concise and professional in your response.
`,
});

const prioritizeComplaintsFlow = ai.defineFlow(
  {
    name: 'prioritizeComplaintsFlow',
    inputSchema: PrioritizeComplaintsInputSchema,
    outputSchema: PrioritizeComplaintsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
