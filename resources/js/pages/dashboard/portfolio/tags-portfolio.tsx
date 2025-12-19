import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { TagsManager, TagItem } from '@/components/tags/tags-manager';
import { useEffect } from 'react';
import { SharedPageProps } from '@/types/page-props';


interface TagData {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    type: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    portfolios_count: number; // Count of portfolio items using this tag
}

interface PageProps extends SharedPageProps {
    tags: TagData[];
    editTag?: TagData;
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Portfolio Tags', href: '/dashboard/portfolio-tags' },
];

export default function TagsPortfolio() {
    const props = usePage<PageProps>().props;
    
    // Transform backend data to frontend format
    const transformTags = (backendTags: TagData[] = []): TagItem[] => {
        if (!Array.isArray(backendTags)) return [];
        
        return backendTags.map(tag => ({
            id: tag.id,
            name: tag.name || '',
            slug: tag.slug || '',
            description: tag.description || '',
            itemCount: tag.portfolios_count || 0,
            createdAt: tag.created_at ? new Date(tag.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        }));
    };

    const initialTags = transformTags(props.tags || []);
    
    // Get editing tag if exists
    let editingTag = null;
    if (props.editTag) {
        const transformed = transformTags([props.editTag]);
        if (transformed.length > 0) {
            editingTag = transformed[0];
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

    const handleSaveTag = (tagData: any) => {
        const data = {
            name: tagData.name,
            description: tagData.description,
        };

        if (editingTag) {
            router.put(`/dashboard/portfolio-tags/${editingTag.id}`, data, {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    router.reload();
                },
                onError: (errors) => {
                    alert('Error updating tag: ' + JSON.stringify(errors));
                }
            });
        } else {
            router.post('/dashboard/portfolio-tags', data, {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    router.reload();
                },
                onError: (errors) => {
                    alert('Error creating tag: ' + JSON.stringify(errors));
                }
            });
        }
    };

    const handleDeleteTag = (id: number) => {
        // NO CONFIRM HERE - It's already handled in TagsManager
        router.delete(`/dashboard/portfolio-tags/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload();
            },
            onError: (errors) => {
                alert('Error deleting tag: ' + JSON.stringify(errors));
            }
        });
    };

    const handleEditTag = (id: number) => {
        router.visit(`/dashboard/portfolio-tags/${id}/edit`);
    };

    const handleCancelEdit = () => {
        router.visit('/dashboard/portfolio-tags');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Portfolio Tags" />
            <TagsManager
                title="Portfolio Tags"
                breadcrumbs={breadcrumbs}
                itemType="portfolio"
                initialTags={initialTags}
                editingTag={editingTag}
                onSave={handleSaveTag}
                onDelete={handleDeleteTag}
                onEdit={handleEditTag}
                onCancelEdit={handleCancelEdit}
            />
        </AppLayout>
    );
}