export type Absence = {
  id: number;
  startDate: string;
  days: number;
  absenceType: "ANNUAL_LEAVE" | "MEDICAL" | "SICKNESS";
  employee: Employee;
  approved: boolean;
};

export type Employee = {
  firstName: string;
  lastName: string;
  id: string;
};

export type AbsenceConflict = {
  conflicts: boolean;
};

export type AbsenseTableData = {
  employeeName: string;
  startDate: string;
  endDate: string;
  approved: boolean;
  absenseType: "ANNUAL_LEAVE" | "MEDICAL" | "SICKNESS";
  conflicts: boolean;
};
