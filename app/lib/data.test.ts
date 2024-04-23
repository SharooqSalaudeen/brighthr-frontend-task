import { fetchAbsences } from './data'; // Adjust the import path as per your file structure

describe('fetchAbsences function', () => {
    it('should fetch absences without filtering or sorting', async () => {
        const absences = await fetchAbsences(undefined, undefined);
        await expect(absences).toHaveLength(20);
    });

    it('should fetch absences filtered by employeeName', async () => {
        const absences = await fetchAbsences('Amiah Fenton', undefined);
        expect(absences[0].employeeName).toBe('Amiah Fenton');
    });

    it('should fetch absences sorted by name', async () => {
        const absences = await fetchAbsences(undefined, 'name');
        expect(absences).toHaveLength(20);
        expect(absences[0].employeeName).toBe('Alexi Schramm');
    });

    it('should fetch absences sorted by absenceType', async () => {
        const absences = await fetchAbsences(undefined, 'absenceType');
        expect(absences).toHaveLength(20);
        expect(absences[0].absenceType).toBe('Annual Leave');
    });

    it('should fetch absences sorted by startDate', async () => {
        const absences = await fetchAbsences(undefined, 'startDate');
        expect(absences).toHaveLength(20);
        expect(absences[0].startDate).toBeDefined();
    });

    it('should fetch absences sorted by endDate', async () => {
        const absences = await fetchAbsences(undefined, 'endDate');
        expect(absences).toHaveLength(20);
        expect(absences[0].endDate).toBeDefined();
    });

    it('should return an empty array if no absences match the employeeName', async () => {
        const absences = await fetchAbsences('Non Existent Employee');
        expect(absences).toHaveLength(0);
    });

    it('should handle errors when fetching absences', async () => {
        jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Failed to fetch absences'));

        await expect(fetchAbsences()).rejects.toThrow('Failed to fetch absence data.');
    });
});
