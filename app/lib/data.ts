import { unstable_noStore as noStore } from "next/cache";
import { Absence, AbsenceConflict } from "./types";
import { formatDateToLocal } from "./utils";
import { log } from "console";

export async function fetchAllAbsences() {
  noStore();
  try {
    const res = await fetch("https://front-end-kata.brighthr.workers.dev/api/absences");
    const data: Absence[] = await res.json();
    console.log("data", data);
    let tableData: Absence[] = [];

    data.forEach(async (item) => {
      const startDate = formatDateToLocal(item.startDate);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + item.days);
      const endDateString = endDate.toISOString();

      const { conflicts }: AbsenceConflict = await fetchAbsenceConflict(item.id);

      const rowData = {
        employeeName: item.employee.firstName + " " + item.employee.lastName,
        startDate: formatDateToLocal(item.startDate),
        endDate: formatDateToLocal(endDateString),
        approved: item.approved,
        absenceType:
          item.absenceType === "ANNUAL_LEAVE"
            ? "Annual Leave"
            : item.absenceType === "MEDICAL"
            ? "Medical"
            : "Sickness",
        conflicts: conflicts,
      };

      console.log("rowData", rowData);
    });
  } catch (error) {
    console.error("Failed to fetch revenue data:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}

export async function fetchAbsenceConflict(id: number) {
  noStore();
  try {
    const res = await fetch(`https://front-end-kata.brighthr.workers.dev/api/conflict/${id}`);
    const data: AbsenceConflict = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch absence conflict data:", error);
    throw new Error("Failed to fetch absence conflcit data.");
  }
}
