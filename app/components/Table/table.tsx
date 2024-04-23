import Image from 'next/image';
import Status from '@/app/components/Status/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchAbsences } from '@/app/lib/data';
import { Absence, AbsenseTableData } from '@/app/lib/types';
import Alert from '../Alert/alert';
import clsx from 'clsx';
import Link from 'next/link';
import SearchParams from './SearchParams';
import { ArrowDownIcon } from '@heroicons/react/24/outline';

export default async function Table({ employeeName, sortBy }: { employeeName?: string; sortBy?: string }) {
    const absences: AbsenseTableData[] = await fetchAbsences(employeeName, sortBy);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <div className="md:hidden">
                        {absences?.map((item: AbsenseTableData) => (
                            <div
                                key={item.id}
                                className={clsx('mb-2 w-full rounded-md bg-white p-4', {
                                    'bg-red-100 ': item.conflicts === true,
                                })}
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div className="flex gap-2">
                                        <SearchParams name="employeeName" value={item.employeeName} routeType="push">
                                            <p className="text-blue-500 ">{item.employeeName}</p>
                                        </SearchParams>
                                        {item.conflicts && <Alert conflicts={item.conflicts} />}
                                    </div>
                                    <div className="whitespace-nowrap px-3 py-3">{item.absenceType}</div>
                                    <Status status={item.approved} />
                                </div>
                                <div className="flex w-full items-center justify-between pt-4">
                                    <div>
                                        <p>From : {formatDateToLocal(item.startDate)}</p>
                                    </div>
                                    <div>
                                        <p>To : {formatDateToLocal(item.endDate)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 ">
                                    <SearchParams name="sortBy" value="name" routeType="replace">
                                        <span className="inline-flex items-center  ">
                                            Employee Name
                                            <ArrowDownIcon
                                                className={clsx('ml-1 w-5 text-gray-500 rounded-full p-1', {
                                                    'bg-gray-200 text-gray-500': sortBy === 'name',
                                                })}
                                            />
                                        </span>
                                    </SearchParams>
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium ">
                                    <SearchParams name="sortBy" value="absenceType" routeType="replace">
                                        <span className="inline-flex items-center  ">
                                            Absense Type
                                            <ArrowDownIcon
                                                className={clsx('ml-1 w-5 text-gray-500 rounded-full p-1', {
                                                    'bg-gray-200 text-gray-500': sortBy === 'absenceType',
                                                })}
                                            />
                                        </span>
                                    </SearchParams>
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium ">
                                    <SearchParams name="sortBy" value="startDate" routeType="replace">
                                        <span className="inline-flex items-center ">
                                            Start Date
                                            <ArrowDownIcon
                                                className={clsx('ml-1 w-5 text-gray-500 rounded-full p-1', {
                                                    'bg-gray-200 text-gray-500': sortBy === 'startDate',
                                                })}
                                            />
                                        </span>
                                    </SearchParams>
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium ">
                                    <SearchParams name="sortBy" value="endDate" routeType="replace">
                                        <span className="inline-flex items-center ">
                                            End Date
                                            <ArrowDownIcon
                                                className={clsx('ml-1 w-5 text-gray-500 rounded-full p-1', {
                                                    'bg-gray-200 text-gray-500': sortBy === 'endDate',
                                                })}
                                            />
                                        </span>
                                    </SearchParams>
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {absences?.map((item: AbsenseTableData) => (
                                <tr
                                    key={item.id}
                                    className={clsx(
                                        'w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg',
                                        {
                                            'bg-red-100 ': item.conflicts === true,
                                        },
                                    )}
                                >
                                    <td className=" flex flex-row gap-2 whitespace-nowrap py-3 pl-6 pr-3 ">
                                        <SearchParams name="employeeName" value={item.employeeName} routeType="push">
                                            <p className="text-blue-500 ">{item.employeeName}</p>
                                        </SearchParams>
                                        {item.conflicts && <Alert conflicts={item.conflicts} />}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">{item.absenceType}</td>

                                    <td className="whitespace-nowrap px-3 py-3">{formatDateToLocal(item.startDate)}</td>
                                    <td className="whitespace-nowrap px-3 py-3">{formatDateToLocal(item.endDate)}</td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <Status status={item.approved} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
