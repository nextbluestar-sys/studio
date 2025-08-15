export interface Product {
  id: string;
  name: string;
  description: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  role: string;
  salary: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  purchaseHistory: Product[];
  value: number;
}

export interface Complaint {
  id: string;
  customer: Customer;
  product: Product;
  description: string;
  date: string;
  assignedTo: Staff | null;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
  reasoning?: string;
}

export interface Attendance {
    id: string;
    staff: Staff;
    date: string;
    clockIn: string | null;
    clockOut: string | null;
    status: 'Present' | 'Absent' | 'On Leave' | 'Holiday' | 'Weekly Off' | 'Half Day' | 'Paid Leave';
}
