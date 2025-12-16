import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CategoriesManager, CategoryItem } from '@/components/categories/categories-manager';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: "/dashboard/categories-blog",
    },
];

// Mock data for blog categories
const initialBlogCategories: CategoryItem[] = [
    {
        id: 1,
        name: 'Technology',
        slug: 'technology',
        description: 'All about technology and innovation',
        parentId: null,
        itemCount: 15,
        createdAt: '2024-01-15',
    },
    {
        id: 2,
        name: 'Web Development',
        slug: 'web-development',
        description: 'Frontend and backend development',
        parentId: 1,
        parentName: 'Technology',
        itemCount: 8,
        createdAt: '2024-02-10',
    },
    {
        id: 3,
        name: 'Mobile Development',
        slug: 'mobile-development',
        description: 'iOS and Android development',
        parentId: 1,
        parentName: 'Technology',
        itemCount: 5,
        createdAt: '2024-02-20',
    },
    {
        id: 4,
        name: 'Lifestyle',
        slug: 'lifestyle',
        description: 'Daily life and personal development',
        parentId: null,
        itemCount: 12,
        createdAt: '2024-01-20',
    },
    {
        id: 5,
        name: 'Health & Fitness',
        slug: 'health-fitness',
        description: 'Health tips and fitness guides',
        parentId: 4,
        parentName: 'Lifestyle',
        itemCount: 7,
        createdAt: '2024-03-05',
    },
];

export default function CategoriesBlog() {
    const handleCategoriesChange = (categories: CategoryItem[]) => {
        // Handle categories change (e.g., save to API)
        console.log('Blog categories updated:', categories);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog Categories" />
            <CategoriesManager
                title="Blog Categories"
                breadcrumbs={breadcrumbs}
                itemType="blog"
                initialCategories={initialBlogCategories}
                onCategoriesChange={handleCategoriesChange}
            />
        </AppLayout>
    );
}