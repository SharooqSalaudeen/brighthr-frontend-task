import Image from "next/image";
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from "./components/Skeletons/skeletons";
import Table from "./components/Table/table";
import Breadcrumbs from "./components/Breadcrumbs/breadcrumbs";

export default function Home() {
    return (
        <main className="flex flex-col justify-between items-center p-6 min-h-screen">
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Absences', href: '/' },
                ]}
            />
            <div className="w-full max-w-[900px]">
                <Suspense
                    fallback={<InvoicesTableSkeleton />}
                >
                    <Table />
                </Suspense>
            </div>
        </main>
    );
}
