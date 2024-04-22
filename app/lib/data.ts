import { unstable_noStore as noStore } from 'next/cache';
import { Absence, AbsenceConflict, AbsenseTableData } from './types';
import { formatDateToLocal } from './utils';
import { log } from 'console';

export async function fetchAllAbsences(): Promise<AbsenseTableData[]> {
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
        return rowData.filter((item) => item !== null) as AbsenseTableData[];
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
