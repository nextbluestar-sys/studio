"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, Download } from "lucide-react"
import { format, getDaysInMonth } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { attendance as allAttendance, staff as allStaff } from "@/lib/data"
import type { Attendance, Staff } from "@/lib/types"

interface ReportData {
  staff: Staff;
  present: number;
  absent: number;
  onLeave: number;
  totalDays: number;
}

interface SalaryData {
  staff: Staff;
  baseSalary: number;
  deductions: number;
  netSalary: number;
}

export default function ReportsPage() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const handleGenerateReport = (): { attendanceReport: ReportData[], salaryReport: SalaryData[] } => {
    const reportDate = new Date(selectedYear, selectedMonth);
    const totalDaysInMonth = getDaysInMonth(reportDate);

    const attendanceReport: ReportData[] = allStaff.map(staff => {
      const staffAttendance = allAttendance.filter(
        a => a.staff.id === staff.id &&
             new Date(a.date).getFullYear() === selectedYear &&
             new Date(a.date).getMonth() === selectedMonth
      );

      const present = staffAttendance.filter(a => a.status === "Present").length;
      const absent = staffAttendance.filter(a => a.status === "Absent").length;
      const onLeave = staffAttendance.filter(a => a.status === "On Leave").length;

      return { staff, present, absent, onLeave, totalDays: totalDaysInMonth };
    });

    const salaryReport: SalaryData[] = attendanceReport.map(report => {
        const workingDays = report.totalDays - new Date(selectedYear, selectedMonth, 1).getDay(); // Simple logic
        const perDaySalary = report.staff.salary / workingDays;
        const deductions = report.absent * perDaySalary;
        const netSalary = report.staff.salary - deductions;

        return {
            staff: report.staff,
            baseSalary: report.staff.salary,
            deductions: parseFloat(deductions.toFixed(2)),
            netSalary: parseFloat(netSalary.toFixed(2))
        }
    });

    return { attendanceReport, salaryReport };
  };

  const { attendanceReport, salaryReport } = handleGenerateReport();

  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i,
    label: format(new Date(0, i), "MMMM"),
  }));
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate monthly attendance and salary reports.
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Reports
        </Button>
      </div>

      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Report Filters</CardTitle>
          <CardDescription>Select the month and year for the reports.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="w-full">
            <Select value={selectedMonth.toString()} onValueChange={(val) => setSelectedMonth(parseInt(val))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value.toString()}>{month.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
             <Select value={selectedYear.toString()} onValueChange={(val) => setSelectedYear(parseInt(val))}>
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Attendance Report</CardTitle>
            <CardDescription>
              Summary of staff attendance for {format(new Date(selectedYear, selectedMonth), "MMMM yyyy")}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff</TableHead>
                  <TableHead>Present</TableHead>
                  <TableHead>Absent</TableHead>
                  <TableHead>On Leave</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceReport.map(data => (
                  <TableRow key={data.staff.id}>
                    <TableCell className="font-medium">{data.staff.name}</TableCell>
                    <TableCell>{data.present}</TableCell>
                    <TableCell>{data.absent}</TableCell>
                    <TableCell>{data.onLeave}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Salary Report</CardTitle>
            <CardDescription>
              Salary details for {format(new Date(selectedYear, selectedMonth), "MMMM yyyy")}.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Staff</TableHead>
                  <TableHead>Base Salary</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Salary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salaryReport.map(data => (
                  <TableRow key={data.staff.id}>
                    <TableCell className="font-medium">{data.staff.name}</TableCell>
                    <TableCell>{formatCurrency(data.baseSalary)}</TableCell>
                    <TableCell className="text-destructive">{formatCurrency(data.deductions)}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(data.netSalary)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
