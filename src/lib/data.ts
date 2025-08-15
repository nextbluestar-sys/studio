import type { Product, Staff, Customer, Complaint, Attendance } from './types';

export const products: Product[] = [
  { id: 'prod-001', name: 'CCTV Camera', description: 'High-definition surveillance camera.' },
  { id: 'prod-002', name: 'Access Control System', description: 'Secure entry management system.' },
  { id: 'prod-003', name: 'Intrusion Alarm System', description: 'Advanced security alarm system.' },
  { id: 'prod-004', name: 'Intercom and PA System', description: 'Communication and public address system.' },
  { id: 'prod-005', name: 'Video Door Phone', description: 'Visual and audio verification for entry.' },
];

export const staff: Staff[] = [
  { id: 'staff-001', name: 'Alice Johnson', email: 'alice@managepro.com', role: 'Manager', salary: 60000, username: 'alicej', password: 'password123', phone: '555-0111', address: '123 Tech Avenue, Silicon Valley', photo: null },
  { id: 'staff-002', name: 'Bob Williams', email: 'bob@managepro.com', role: 'Technician', salary: 45000, username: 'bobw', password: 'password123', phone: '555-0112', address: '456 Circuit Board, Innovation City', photo: null },
  { id: 'staff-003', name: 'Charlie Brown', email: 'charlie@managepro.com', role: 'Support Specialist', salary: 40000, username: 'charlieb', password: 'password123', phone: '555-0113', address: '789 Logic Lane, Compuburg', photo: null },
  { id: 'staff-004', name: 'Diana Prince', email: 'diana@managepro.com', role: 'Technician', salary: 48000, username: 'dianap', password: 'password123', phone: '555-0114', address: '101 Data Drive, Server Town', photo: null },
];

export const customers: Customer[] = [
  { id: 'cust-001', name: 'Global Corp', email: 'contact@globalcorp.com', phone: '555-0101', joinedDate: '2023-01-15', purchaseHistory: [products[0], products[1]], value: 15000 },
  { id: 'cust-002', name: 'Innovate LLC', email: 'info@innovatellc.com', phone: '555-0102', joinedDate: '2023-03-22', purchaseHistory: [products[2]], value: 8000 },
  { id: 'cust-003', name: 'Synergy Inc', email: 'support@synergy.com', phone: '555-0103', joinedDate: '2023-05-10', purchaseHistory: [products[3], products[4]], value: 25000 },
  { id: 'cust-004', name: 'Tech Solutions', email: 'accounts@techsolutions.com', phone: '555-0104', joinedDate: '2023-06-18', purchaseHistory: [products[0]], value: 5000 },
];

export const complaints: Complaint[] = [
  { id: 'comp-001', customer: customers[0], product: products[1], description: 'Access control panel is not responding.', date: '2024-07-10', assignedTo: staff[1], status: 'In Progress', priority: 'High' },
  { id: 'comp-002', customer: customers[2], product: products[3], description: 'Intercom has a lot of static noise.', date: '2024-07-08', assignedTo: staff[2], status: 'Open', priority: 'Medium' },
  { id: 'comp-003', customer: customers[1], product: products[2], description: 'False alarms from the intrusion system at night.', date: '2024-07-11', assignedTo: staff[3], status: 'Open', priority: 'High' },
  { id: 'comp-004', customer: customers[3], product: products[0], description: 'Video feed from one of the CCTV cameras is blurry.', date: '2024-07-05', assignedTo: staff[1], status: 'Resolved', priority: 'Low' },
];

export const attendance: Attendance[] = [
    { id: 'att-001', staff: staff[0], date: '2024-07-12', clockIn: '08:55', clockOut: '17:05', status: 'Present' },
    { id: 'att-002', staff: staff[1], date: '2024-07-12', clockIn: '09:00', clockOut: '17:00', status: 'Present' },
    { id: 'att-003', staff: staff[2], date: '2024-07-12', clockIn: null, clockOut: null, status: 'On Leave' },
    { id: 'att-004', staff: staff[3], date: '2024-07-12', clockIn: '09:15', clockOut: '17:30', status: 'Present' },
    { id: 'att-005', staff: staff[0], date: '2024-07-11', clockIn: '09:05', clockOut: '17:00', status: 'Present' },
    { id: 'att-006', staff: staff[1], date: '2024-07-11', clockIn: '08:45', clockOut: '16:50', status: 'Present' },
    { id: 'att-007', staff: staff[2], date: '2024-07-11', clockIn: '09:00', clockOut: '17:00', status: 'Present' },
    { id: 'att-008', staff: staff[3], date: '2024-07-11', clockIn: null, clockOut: null, status: 'Absent' },
];
