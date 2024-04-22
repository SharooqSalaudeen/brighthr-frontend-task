import Image from "next/image";
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from "./components/Skeletons/skeletons";
import Table from "./components/Table/table";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
            <Suspense
                fallback={<InvoicesTableSkeleton />}
            >
                <Table query={query} />
            </Suspense>
    </main>
  );
}
