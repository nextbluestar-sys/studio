
"use client"

import { Staff } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Logo from "@/app/components/logo"
import { Phone, Home } from "lucide-react"

interface DigitalIdCardProps {
  staff: Staff
}

export default function DigitalIdCard({ staff }: DigitalIdCardProps) {
  const getInitials = (name: string) => {
    if (!name) return ""
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  const avatarSrc = staff.photo || `https://avatar.vercel.sh/${staff.name}.png`

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-lg border border-gray-200 w-full max-w-sm mx-auto font-sans">
      <div className="flex justify-between items-center pb-4 border-b-2 border-primary">
        <div className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-bold text-primary">Bluestar Connect</h1>
        </div>
      </div>
      <div className="text-center pt-6">
        <Avatar className="w-28 h-28 mx-auto border-4 border-white shadow-md">
          <AvatarImage src={avatarSrc} alt={staff.name} />
          <AvatarFallback>{getInitials(staff.name)}</AvatarFallback>
        </Avatar>
        <h2 className="mt-4 text-2xl font-bold text-gray-800">{staff.name}</h2>
        <p className="text-base text-gray-500">{staff.role}</p>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-4 text-gray-700">
        <div className="flex items-center">
            <Phone className="w-5 h-5 mr-3 text-primary" />
            <span className="text-sm">{staff.phone || "Not provided"}</span>
        </div>
        <div className="flex items-start">
            <Home className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm">{staff.address || "Not provided"}</span>
        </div>
      </div>
       <div className="text-center pt-4 mt-4 border-t border-gray-200">
        <p className="text-xs text-gray-400">Staff ID: {staff.id}</p>
      </div>
    </div>
  )
}
