
"use client"

import { useState, useRef, useEffect } from "react"
import { Loader2, Camera, UserCheck, UserX } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { staff } from "@/lib/data"
import { toast } from "@/hooks/use-toast"
import { verifyFace } from "@/ai/flows/verify-face"
import type { Staff } from "@/lib/types"

export default function FaceAuthPage() {
  const [loading, setLoading] = useState(false)
  const [selectedStaffId, setSelectedStaffId] = useState<string>("")
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)
  const [mode, setMode] = useState<"clockIn" | "clockOut">("clockIn")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        setHasCameraPermission(true)

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error("Error accessing camera:", error)
        setHasCameraPermission(false)
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings to use this feature.",
        })
      }
    }

    getCameraPermission()
    
    return () => {
        // Stop camera stream when component unmounts
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [])

  const captureFrame = (): string | null => {
    if (!videoRef.current || !canvasRef.current) return null
    const video = videoRef.current
    const canvas = canvasRef.current

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const context = canvas.getContext("2d")
    if (!context) return null

    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
    return canvas.toDataURL("image/jpeg")
  }

  const handleAttendance = async () => {
    if (!selectedStaffId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select your name.",
      })
      return
    }

    const photoDataUri = captureFrame()
    if (!photoDataUri) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not capture frame from video.",
      })
      return
    }

    setLoading(true)

    try {
      const result = await verifyFace({
        staffId: selectedStaffId,
        photoDataUri,
      })
      const staffMember = staff.find(s => s.id === selectedStaffId) as Staff

      if (result.isVerified) {
        // In a real app, you would now update the attendance record in your database.
        toast({
          title: `Successfully Clocked ${mode === 'clockIn' ? 'In' : 'Out'}`,
          description: `Welcome, ${staffMember.name}! Your attendance has been recorded.`,
        })
      } else {
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: "Face not recognized. Please try again.",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: "Could not process face verification. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Face Authentication</h1>
        <p className="text-muted-foreground">
          Clock in and out using your face.
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Attendance Camera</CardTitle>
          <CardDescription>
            Position your face in the center of the frame and select your name.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
            <video ref={videoRef} className="w-full aspect-video rounded-md" autoPlay muted />
            <canvas ref={canvasRef} className="hidden" />
             {hasCameraPermission === false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                    <Alert variant="destructive">
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera access to use this feature.
                        </AlertDescription>
                    </Alert>
                </div>
            )}
             {hasCameraPermission === null && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <p className="mt-2 text-muted-foreground">Initializing camera...</p>
                 </div>
             )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="staff-select">Select Your Name</Label>
            <Select onValueChange={setSelectedStaffId} value={selectedStaffId}>
              <SelectTrigger id="staff-select">
                <SelectValue placeholder="Select your name from the list" />
              </SelectTrigger>
              <SelectContent>
                {staff.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
           <div className="flex gap-4">
             <Button 
                className="w-full" 
                onClick={() => { setMode("clockIn"); handleAttendance(); }}
                disabled={loading || !hasCameraPermission}
            >
                {loading && mode === "clockIn" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserCheck className="mr-2 h-4 w-4" />}
                Clock In
            </Button>
            <Button 
                variant="destructive" 
                className="w-full" 
                onClick={() => { setMode("clockOut"); handleAttendance(); }}
                disabled={loading || !hasCameraPermission}
            >
                {loading && mode === "clockOut" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserX className="mr-2 h-4 w-4" />}
                Clock Out
            </Button>
           </div>
        </CardContent>
      </Card>
    </div>
  )
}
