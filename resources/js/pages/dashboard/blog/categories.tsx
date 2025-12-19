import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { CategoriesManager, CategoryItem } from '@/components/categories/categories-manager';
import { useEffect } from 'react';
import { SharedPageProps } from '@/types/page-props';

interface CategoryData {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    parent_id: number | null;
    type: string;
    created_at: string;
    updated_at: string;
    parent?: {
        name: string;
    };
    blogs_count: number;
}

interface PageProps extends SharedPageProps {
    categories: CategoryData[];
    editCategory?: CategoryData;
    parentCategories: CategoryData[];
    allCategories: CategoryData[];
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Blog Categories', href: '/dashboard/blog-categories' },
];

export default function CategoriesBlog() {
    const props = usePage<PageProps>().props;
    
  

    // Transform backend data to frontend format
    const transformCategories = (backendCategories: CategoryData[] = []): CategoryItem[] => {
        if (!Array.isArray(backendCategories)) return [];
        
        return backendCategories.map(category => ({
            id: category.id,
            name: category.name || '',
            slug: category.slug || '',
            description: category.description || '',
            parentId: category.parent_id,
            itemCount: category.blogs_count || 0,
            createdAt: category.created_at ? new Date(category.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            parentName: category.parent?.name || ''
        }));
    };

    const initialCategories = transformCategories(props.categories || []);
    const parentCategoriesList = transformCategories(props.parentCategories || []);
    const allCategoriesList = transformCategories(props.allCategories || []);
    
    // Get editing category if exists
    let editingCategory = null;
    if (props.editCategory) {
        const transformed = transformCategories([props.editCategory]);
        if (transformed.length > 0) {
            editingCategory = transformed[0];
        }
    }

    // Show flash messages
    useEffect(() => {
        if (props.flash?.success) {
            alert(props.flash.success);
        }
        if (props.flash?.error) {
            alert(props.flash.error);
        }
    }, [props.flash]);

    const handleSaveCategory = (categoryData: any) => {
        
        const data = {
            name: categoryData.name,
            description: categoryData.description,
            parent_id: categoryData.parentId || null,
        };

        if (editingCategory) {
            router.put(`/dashboard/blog-categories/${editingCategory.id}`, data, {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload();
                },
                onError: (errors) => {
                    console.error('Update errors:', errors);
                    alert('Error updating category: ' + JSON.stringify(errors));
                }
            });
        } else {
            router.post('/dashboard/blog-categories', data, {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload();
                },
                onError: (errors) => {
                    console.error('Create errors:', errors);
                    alert('Error creating category: ' + JSON.stringify(errors));
                }
            });
        }
    };

    const handleDeleteCategory = (id: number) => {
        
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(`/dashboard/blog-categories/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload();
                },
                onError: (errors) => {
                    console.error('Delete errors:', errors);
                    alert('Error deleting category: ' + JSON.stringify(errors));
                }
            });
        }
    };

    const handleEditCategory = (id: number) => {
        router.visit(`/dashboard/blog-categories/${id}/edit`);
    };

    const handleCancelEdit = () => {
        router.visit('/dashboard/blog-categories');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog Categories" />
            <CategoriesManager
                title="Blog Categories"
                breadcrumbs={breadcrumbs}
                itemType="blog"
                initialCategories={initialCategories}
                editingCategory={editingCategory}
                parentCategories={parentCategoriesList}
                allCategories={allCategoriesList}
                onSave={handleSaveCategory}
                onDelete={handleDeleteCategory}
                onEdit={handleEditCategory}
                onCancelEdit={handleCancelEdit}
            />
        </AppLayout>
    );
}