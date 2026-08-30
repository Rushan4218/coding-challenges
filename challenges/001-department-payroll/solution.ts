export type Employee = {
  id: number;
  name: string;
  department: string;
  salary: number;
};

export type DepartmentReport = {
  totalEmployees: number;
  totalSalary: number;
  averageSalary: number;
  highestPaid: {
    id: number;
    name: string;
    salary: number;
  };
};

export type PayrollReport = Record<string, DepartmentReport>;

export function generatePayrollReport(employees: Employee[]): PayrollReport {
  // TODO: Implement
  throw new Error("Not implemented");
}
