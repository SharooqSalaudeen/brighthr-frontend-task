import { unstable_noStore as noStore } from 'next/cache';
import { Absence, AbsenceConflict, AbsenseTableData } from './types';
import { formatDateToLocal } from './utils';

export async function fetchAbsences(employeeName?: string, sortBy?: string): Promise<AbsenseTableData[]> {
    noStore();

    try {
        const res = await fetch('https://front-end-kata.brighthr.workers.dev/api/absences');
        const data: Absence[] = await res.json();

        const promises = data.map(async (item) => {
            const startDate = formatDateToLocal(item.startDate);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + item.days);
            const endDateString = endDate.toISOString();

            try {
                const { conflicts }: AbsenceConflict = await fetchAbsenceConflict(item.id);

                return {
                    id: item.id,
                    employeeId: item.employee.id,
                    employeeName: item.employee.firstName + ' ' + item.employee.lastName,
                    startDate: formatDateToLocal(item.startDate),
                    endDate: formatDateToLocal(endDateString),
                    approved: item.approved,
                    absenceType:
                        item.absenceType === 'ANNUAL_LEAVE'
                            ? 'Annual Leave'
                            : item.absenceType === 'MEDICAL'
                            ? 'Medical'
                            : 'Sickness',
                    conflicts: conflicts,
                } as AbsenseTableData;
            } catch (error) {
                console.error('Error fetching absence conflict:', error);
                return null;
            }
        });

        const rowData = await Promise.all(promises);

        // Filter out null items from rowData
        const filteredData = rowData.filter((item) => item !== null) as AbsenseTableData[];

        // If either employeeName or sortBy is provided, apply filtering and sorting
        if (employeeName || sortBy) {
            const filteredAndSortedData = filteredData.filter((item) => {
                return !employeeName || item.employeeName === employeeName;
            });

            if (sortBy) {
                filteredAndSortedData.sort((a, b) => {
                    if (sortBy === 'name') {
                        const nameA = a.employeeName.toUpperCase();
                        const nameB = b.employeeName.toUpperCase();
                        return nameA.localeCompare(nameB);
                    } else if (sortBy === 'absenceType') {
                        const typeA = a.absenceType.toUpperCase();
                        const typeB = b.absenceType.toUpperCase();
                        return typeA.localeCompare(typeB);
                    } else if (sortBy === 'startDate') {
                        const dateA = new Date(a.startDate);
                        const dateB = new Date(b.startDate);
                        return dateA.getTime() - dateB.getTime();
                    } else if (sortBy === 'endDate') {
                        const dateA = new Date(a.endDate);
                        const dateB = new Date(b.endDate);
                        return dateA.getTime() - dateB.getTime();
                    }
                    return 0;
                });
            }

            return filteredAndSortedData;
        }

        // If no filtering or sorting is required, return the filtered data directly
        return filteredData;
    } catch (error) {
        console.error('Failed to fetch revenue data:', error);
        throw new Error('Failed to fetch revenue data.');
    }
}

export async function fetchAbsenceConflict(id: number) {
    noStore();
    try {
        const res = await fetch(`https://front-end-kata.brighthr.workers.dev/api/conflict/${id}`);
        const data: AbsenceConflict = await res.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch absence conflict data:', error);
        throw new Error('Failed to fetch absence conflcit data.');
    }
}
