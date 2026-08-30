import { generatePayrollReport } from "./solution.js";

describe("generatePayrollReport", () => {
  it("returns an empty object for an empty array", () => {
    expect(generatePayrollReport([])).toEqual({});
  });

  it("generates a report for multiple departments", () => {
    const employees = [
      { id: 1, name: "Alice", department: "Engineering", salary: 80000 },
      { id: 2, name: "Bob", department: "Engineering", salary: 60000 },
      { id: 3, name: "Charlie", department: "HR", salary: 50000 },
      { id: 4, name: "David", department: "Engineering", salary: 90000 },
      { id: 5, name: "Eve", department: "HR", salary: 70000 },
    ];

    expect(generatePayrollReport(employees)).toEqual({
      Engineering: {
        totalEmployees: 3,
        totalSalary: 230000,
        averageSalary: 76666.67,
        highestPaid: {
          id: 4,
          name: "David",
          salary: 90000,
        },
      },
      HR: {
        totalEmployees: 2,
        totalSalary: 120000,
        averageSalary: 60000,
        highestPaid: {
          id: 5,
          name: "Eve",
          salary: 70000,
        },
      },
    });
  });

  it("handles a department with a single employee", () => {
    const employees = [
      {
        id: 1,
        name: "Alice",
        department: "Engineering",
        salary: 85000,
      },
    ];

    expect(generatePayrollReport(employees)).toEqual({
      Engineering: {
        totalEmployees: 1,
        totalSalary: 85000,
        averageSalary: 85000,
        highestPaid: {
          id: 1,
          name: "Alice",
          salary: 85000,
        },
      },
    });
  });

  it("does not modify the original array", () => {
    const employees = [
      { id: 1, name: "Alice", department: "Engineering", salary: 80000 },
      { id: 2, name: "Bob", department: "Engineering", salary: 60000 },
    ];

    const original = employees.map((employee) => ({ ...employee }));

    generatePayrollReport(employees);

    expect(employees).toEqual(original);
  });
});
