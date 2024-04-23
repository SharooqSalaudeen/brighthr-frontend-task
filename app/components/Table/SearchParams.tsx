'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type SearchParamsType = {
    children: React.ReactNode;
    name: string;
    value: string;
    routeType: 'push' | 'replace';
};

export default function SearchParams({ children, name, value, routeType = 'replace' }: SearchParamsType) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace, push } = useRouter();

    const handleClick = () => {
        const params = new URLSearchParams(searchParams);
        params.set(name, value);
        if (routeType == 'push') {
            push(`${pathname}?${params.toString()}`);
        } else {
            replace(`${pathname}?${params.toString()}`);
        }
    };
    return (
        <div className="cursor-pointer" onClick={() => handleClick()}>
            {children}
        </div>
    );
}
