import Image from "next/image";
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from "./components/Skeletons/skeletons";
import Table from "./components/Table/table";

export default function Home() {
    return (
        <main className="flex  flex-col justify-between items-center p-6 min-h-screen">
            <Suspense
                fallback={<InvoicesTableSkeleton />}
            >
                <Table />
            </Suspense>
        </main>
    );
}
