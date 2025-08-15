"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { toast } from "@/hooks/use-toast"

export default function AttendanceConfigurationPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    const handleSaveSettings = () => {
        toast({
            title: "Settings Saved",
            description: "Your attendance configurations have been updated.",
        })
    }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance Configuration</h1>
        <p className="text-muted-foreground">
          Manage company-wide attendance settings.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Weekly Offs</CardTitle>
            <CardDescription>
              Set the default weekly off days for the company.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="weekly-off-1">First Weekly Off</Label>
                <Select defaultValue="saturday">
                    <SelectTrigger id="weekly-off-1">
                        <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                        <SelectItem value="monday">Monday</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="weekly-off-2">Second Weekly Off (Optional)</Label>
                <Select defaultValue="sunday">
                    <SelectTrigger id="weekly-off-2">
                        <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="saturday">Saturday</SelectItem>
                        <SelectItem value="sunday">Sunday</SelectItem>
                        <SelectItem value="monday">Monday</SelectItem>
                    </SelectContent>
                </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Holiday Management</CardTitle>
            <CardDescription>
              Add or remove company holidays for the year.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                />
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="holiday-name">Holiday Name</Label>
                    <Input id="holiday-name" placeholder="e.g., New Year's Day" />
                </div>
                <Button>Add Holiday</Button>
                <div className="space-y-2 pt-4">
                    <h4 className="font-medium">Upcoming Holidays</h4>
                    <div className="text-sm text-muted-foreground">
                        <p>Jan 1, 2024 - New Year's Day</p>
                        <p>Aug 15, 2024 - Independence Day</p>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
       <div className="flex justify-end">
            <Button onClick={handleSaveSettings}>Save All Settings</Button>
        </div>
    </div>
  )
}
