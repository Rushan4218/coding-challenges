# Challenge 001 — Department Payroll Report

## Problem

You are given an array of employees. Each employee belongs to a department and has a salary.

Write a function that generates a payroll report grouped by department.

For each department, the report must contain:

- The total number of employees
- The total salary
- The average salary
- The highest-paid employee

## Input

```ts
type Employee = {
  id: number;
  name: string;
  department: string;
  salary: number;
};
```

## Function

```ts
function generatePayrollReport(employees: Employee[]): PayrollReport;
```

## Example

### Input

```ts
const employees = [
  { id: 1, name: "Alice", department: "Engineering", salary: 80000 },
  { id: 2, name: "Bob", department: "Engineering", salary: 60000 },
  { id: 3, name: "Charlie", department: "HR", salary: 50000 },
  { id: 4, name: "David", department: "Engineering", salary: 90000 },
  { id: 5, name: "Eve", department: "HR", salary: 70000 },
];
```

### Output

```ts
{
  Engineering: {
    totalEmployees: 3,
    totalSalary: 230000,
    averageSalary: 76666.67,
    highestPaid: {
      id: 4,
      name: "David",
      salary: 90000
    }
  },
  HR: {
    totalEmployees: 2,
    totalSalary: 120000,
    averageSalary: 60000,
    highestPaid: {
      id: 5,
      name: "Eve",
      salary: 70000
    }
  }
}
```

## Requirements

- Return an empty object when there are no employees.
- Departments should be discovered dynamically from the input.
- `averageSalary` must be rounded to 2 decimal places.
- Do not modify the original array.
- Do not sort the entire employee array just to find the highest-paid employee.
- Employees may belong to any department.

## Bonus

Add the percentage of the company's total payroll represented by each department:

```ts
{
  Engineering: {
    totalEmployees: 3,
    totalSalary: 230000,
    averageSalary: 76666.67,
    payrollPercentage: 65.71,
    highestPaid: {
      id: 4,
      name: "David",
      salary: 90000
    }
  }
}
```
