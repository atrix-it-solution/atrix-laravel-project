import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'CreateEditBlog',
        href: "",
    },
];

export default function CreateEditBlog() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create-Edit-Blog" />
           <div>
            CreateEditBlog
           </div>
        </AppLayout>
    );
}
