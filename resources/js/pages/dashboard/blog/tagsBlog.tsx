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
    blogs_count: number; // Count of blog posts using this tag
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
    { title: 'Blog Tags', href: '/dashboard/blog-tags' },
];

export default function TagsBlog() {
    const props = usePage<PageProps>().props;
    
    // Transform backend data to frontend format
    const transformTags = (backendTags: TagData[] = []): TagItem[] => {
        if (!Array.isArray(backendTags)) return [];
        
        return backendTags.map(tag => ({
            id: tag.id,
            name: tag.name || '',
            slug: tag.slug || '',
            description: tag.description || '',
            itemCount: tag.blogs_count || 0,
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
            router.put(`/dashboard/blog-tags/${editingTag.id}`, data, {
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
            router.post('/dashboard/blog-tags', data, {
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
        router.delete(`/dashboard/blog-tags/${id}`, {
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
        router.visit(`/dashboard/blog-tags/${id}/edit`);
    };

    const handleCancelEdit = () => {
        router.visit('/dashboard/blog-tags');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog Tags" />
            <TagsManager
                title="Blog Tags"
                breadcrumbs={breadcrumbs}
                itemType="blog"
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