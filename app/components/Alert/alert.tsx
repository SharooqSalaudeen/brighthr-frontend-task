import { BellAlertIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Alert() {
    return (
        <span className={clsx('inline-flex items-center rounded-full px-2 py-1 text-xs', 'bg-red-500 text-white')}>
            <BellAlertIcon className=" w-4 text-white" />
        </span>
    );
}
