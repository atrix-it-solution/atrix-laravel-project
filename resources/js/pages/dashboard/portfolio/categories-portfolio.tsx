import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CategoriesManager, CategoryItem } from '@/components/categories/categories-manager';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories Portfolio',
        href: "/dashboard/categories-portfolio",
    },
];

// Mock data for portfolio categories
const initialPortfolioCategories: CategoryItem[] = [
    {
        id: 1,
        name: 'Web Development',
        slug: 'web-development',
        description: 'Websites and web applications',
        parentId: null,
        itemCount: 8,
        createdAt: '2024-01-15',
    },
    {
        id: 2,
        name: 'E-commerce',
        slug: 'e-commerce',
        description: 'Online stores and shopping platforms',
        parentId: 1,
        parentName: 'Web Development',
        itemCount: 4,
        createdAt: '2024-02-10',
    },
    {
        id: 3,
        name: 'Mobile Apps',
        slug: 'mobile-apps',
        description: 'iOS and Android applications',
        parentId: null,
        itemCount: 6,
        createdAt: '2024-02-15',
    },
    {
        id: 4,
        name: 'UI/UX Design',
        slug: 'ui-ux-design',
        description: 'User interface and experience design',
        parentId: null,
        itemCount: 10,
        createdAt: '2024-01-25',
    },
    {
        id: 5,
        name: 'Branding',
        slug: 'branding',
        description: 'Logo and brand identity design',
        parentId: 4,
        parentName: 'UI/UX Design',
        itemCount: 5,
        createdAt: '2024-03-01',
    },
];

export default function CategoriesPortfolio() {
    const handleCategoriesChange = (categories: CategoryItem[]) => {
        // Handle categories change (e.g., save to API)
        console.log('Portfolio categories updated:', categories);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Portfolio Categories" />
            <CategoriesManager
                title="Portfolio Categories"
                breadcrumbs={breadcrumbs}
                itemType="portfolio"
                initialCategories={initialPortfolioCategories}
                onCategoriesChange={handleCategoriesChange}
            />
        </AppLayout>
    );
}