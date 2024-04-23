import { Suspense } from 'react';
import { AbsenceTableSkeleton } from './components/Skeletons/skeletons';
import Table from './components/Table/table';
import Breadcrumbs from './components/Breadcrumbs/breadcrumbs';

export default function Page({
    searchParams,
}: {
    searchParams?: {
        employeeName?: string;
        sortBy?: string;
    };
}) {
    const employeeName = searchParams?.employeeName || '';
    const sortBy = searchParams?.sortBy || '';

    return (
        <main className="flex flex-col justify-between items-center p-6 min-h-screen">
            <div className="w-full max-w-[900px]">
                <div>
                    <Breadcrumbs
                        breadcrumbs={[{ label: `Absences ${employeeName ? `- ${employeeName}` : ''}`, href: '/' }]}
                    />
                </div>
                <Suspense fallback={<AbsenceTableSkeleton />}>
                    <Table employeeName={employeeName} sortBy={sortBy} />
                </Suspense>
            </div>
        </main>
    );
}
