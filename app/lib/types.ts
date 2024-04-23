export type Absence = {
    id: number;
    startDate: string;
    days: number;
    absenceType: 'ANNUAL_LEAVE' | 'MEDICAL' | 'SICKNESS';
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
    id: number;
    employeeId: string;
    employeeName: string;
    startDate: string;
    endDate: string;
    approved: boolean;
    absenceType: string;
    conflicts: boolean;
};
