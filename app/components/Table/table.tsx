import Image from 'next/image';
import Status from '@/app/components/Status/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchAllAbsences } from '@/app/lib/data';
import { Absence } from '@/app/lib/types';

export default async function Table() {
    const absences = await fetchAllAbsences()
    return (
        <div className="mt-6 flow-root">
            {/* <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {absences?.map((absence: Absence
                        ) => (
                            <div
                                key={absence.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <p>{invoice.name}</p>
                                    </div>
                                    <Status status={absence.status} />
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>

                                        <p>{formatDateToLocal(absence.date)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-5 font-medium sm:pl-6"
                                >
                                    Employee Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Absense Type
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Start Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    End Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Status
                                </th>

                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {absences?.map((absence: Absence) => (
                                <tr
                                    key={absence.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <p>{absence.name}</p>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {absence.email}
                                    </td>

                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDateToLocal(absence.date)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <Status
                                            status={absence.status}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div> */}
        </div>
    );
}
