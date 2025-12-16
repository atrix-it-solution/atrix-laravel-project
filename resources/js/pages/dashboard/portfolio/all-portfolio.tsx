import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PortfolioTable, PortfolioItem } from '@/components/portfolio/portfolio-table';
import { SearchHeader } from '@/components/common/search-header';
import { useTable } from '@/hooks/useTable';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Portfolio',
        href: "/dashboard/allportfolio",
    },
];

// Mock data
const initialPortfolioItems: PortfolioItem[] = [
    {
        id: 1,
        title: 'E-commerce Website',
        slug: 'ecommerce-website',
        client: 'Fashion Store',
        category: 'Web Development',
        status: 'published',
        featured: true,
        createdAt: '2024-03-15',
        updatedAt: '2024-03-16',
    },
    {
        id: 2,
        title: 'Mobile App Design',
        slug: 'mobile-app-design',
        client: 'Tech Startup',
        category: 'UI/UX Design',
        status: 'published',
        featured: false,
        createdAt: '2024-03-10',
        updatedAt: '2024-03-12',
    },
    // ... more items
];

export default function AllPortfolio() {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const {
        data: portfolioItems,
        filteredData: filteredItems,
        sortField,
        sortDirection,
        searchQuery,
        setSearchQuery,
        handleSort,
        deleteItem,
    } = useTable<PortfolioItem>({
        initialData: initialPortfolioItems,
        searchFields: ['title', 'client', 'category', 'slug'],
        defaultSortField: 'createdAt',
    });

    const handleEdit = (item: PortfolioItem) => {
        // Handle edit logic
        console.log('Edit portfolio item:', item);
    };

    const handleDelete = (item: PortfolioItem) => {
        if (confirm('Are you sure you want to delete this portfolio item?')) {
            deleteItem(item.id);
        }
    };

    const handleCreate = () => {
        // Handle create logic
        setShowCreateForm(true);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Portfolio Items" />
            
            <div className='pt-10'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className="col">
                            <SearchHeader
                                title="All Portfolio Items"
                                subtitle="Manage and view all your portfolio projects"
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                onCreate={handleCreate}
                                createButtonText="Add New Portfolio"
                                totalItems={portfolioItems.length}
                                filteredItems={filteredItems.length}
                                searchPlaceholder="Search by title, client, or category..."
                            />

                            <PortfolioTable
                                items={filteredItems}
                                sortField={sortField}
                                sortDirection={sortDirection}
                                onSort={handleSort}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />

                            {/* Create form would go here */}
                            {showCreateForm && (
                                <div className="mt-6 p-6 border rounded-lg">
                                    {/* Create form content */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}