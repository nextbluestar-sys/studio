import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { complaints } from "@/lib/data";

export default function RecentComplaints() {
  const recentComplaints = complaints.slice(0, 5);

  return (
    <div className="space-y-4">
      {recentComplaints.map((complaint) => (
        <div className="flex items-center" key={complaint.id}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://avatar.vercel.sh/${complaint.customer.name}.png`} alt="Avatar" />
            <AvatarFallback>{complaint.customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {complaint.customer.name}
            </p>
            <p className="text-sm text-muted-foreground truncate max-w-xs">
              {complaint.description}
            </p>
          </div>
          <div className="ml-auto font-medium text-sm">{complaint.date}</div>
        </div>
      ))}
    </div>
  );
}
