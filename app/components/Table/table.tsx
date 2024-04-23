import Status from '@/app/components/Status/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchAbsences } from '@/app/lib/data';
import { AbsenseTableData } from '@/app/lib/types';
import Alert from '../Alert/alert';
import clsx from 'clsx';
import SearchParamsHandler from '../SearchParamsHandler/SearchParamsHandler';
import { ArrowDownIcon } from '@heroicons/react/24/outline';

export default async function Table({ employeeName, sortBy }: { employeeName?: string; sortBy?: string }) {
    const absences: AbsenseTableData[] = await fetchAbsences(employeeName, sortBy);

    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg p-2 md:pt-0 ">
                    {/*  Mobile repsonsive view */}
                    <div className="md:hidden">
                        {absences.length === 0 && <div className='flex justify-center'> No Data</div>}
                        {absences?.map((item: AbsenseTableData) => (
                            <div
                                key={item.id}
                                className={clsx('mb-2 w-full rounded-md p-4 bg-gray-50 border-[0.5px]  border-gray-300 ', {
                                    'bg-red-100 ': item.conflicts === true,
                                })}
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div className="flex gap-2">
                                        <SearchParamsHandler name="employeeName" value={item.employeeName} routeType="push">
                                            <p className="text-blue-500 "> {item.employeeName}</p>
                                        </SearchParamsHandler>
                                        {item.conflicts && <Alert />}
                                    </div>
                                    <Status status={item.approved} />
                                </div>
                                <div className="whitespace-nowrap  py-3 pt-4">Type: {item.absenceType}</div>
                                <div className="flex w-full items-center justify-between ">
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
                    {/* Desktop view */}
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 ">
                                    <SearchParamsHandler name="sortBy" value="name" routeType="replace">
                                        <span className="inline-flex items-center  ">
                                            Employee Name
                                            <ArrowDownIcon
                                                className={clsx('ml-1 w-5 text-gray-500 rounded-full p-1', {
                                                    'bg-gray-200 text-gray-500': sortBy === 'name',
                                                })}
                                            />
                                        </span>
                                    </SearchParamsHandler>
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium ">
                                    <SearchParamsHandler name="sortBy" value="absenceType" routeType="replace">
                                        <span className="inline-flex items-center  ">
                                            Absense Type
                                            <ArrowDownIcon
                                                className={clsx('ml-1 w-5 text-gray-500 rounded-full p-1', {
                                                    'bg-gray-200 text-gray-500': sortBy === 'absenceType',
                                                })}
                                            />
                                        </span>
                                    </SearchParamsHandler>
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium ">
                                    <SearchParamsHandler name="sortBy" value="startDate" routeType="replace">
                                        <span className="inline-flex items-center ">
                                            Start Date
                                            <ArrowDownIcon
                                                className={clsx('ml-1 w-5 text-gray-500 rounded-full p-1', {
                                                    'bg-gray-200 text-gray-500': sortBy === 'startDate',
                                                })}
                                            />
                                        </span>
                                    </SearchParamsHandler>
                                </th>
                                <th scope="col" className="px-3 py-5 font-medium ">
                                    <SearchParamsHandler name="sortBy" value="endDate" routeType="replace">
                                        <span className="inline-flex items-center ">
                                            End Date
                                            <ArrowDownIcon
                                                className={clsx('ml-1 w-5 text-gray-500 rounded-full p-1', {
                                                    'bg-gray-200 text-gray-500': sortBy === 'endDate',
                                                })}
                                            />
                                        </span>
                                    </SearchParamsHandler>
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
                                        <SearchParamsHandler name="employeeName" value={item.employeeName} routeType="push">
                                            <p className="text-blue-500 ">{item.employeeName}</p>
                                        </SearchParamsHandler>
                                        {item.conflicts && <Alert />}
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
                    {absences.length === 0 && <div className='flex justify-center'> No Data</div>}

                </div>
            </div>
        </div>
    );
}
