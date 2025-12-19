import { useState, useEffect } from 'react';
import { CreateEditForm } from '@/components/common/create-edit-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { router, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface CategoryOption {
    id: number;
    name: string;
    slug: string;
}

interface TagOption {
    id: number;
    name: string;
    slug: string;
}

interface PageProps {
    blog?: {
        id: number;
        title: string;
        slug: string;
        description: string;
        content: string;
        featured_image: string | null;
        featured_image_url: string | null;
        author: string;
        author_description: string;
        meta_title: string;
        meta_description: string;
        status: 'draft' | 'published' | 'archived';
        is_featured: boolean;
        published_at: string | null;
        categories: number[];
        tags: number[];
        category_details?: CategoryOption[];
        tag_details?: TagOption[];
    };
    categories: CategoryOption[];
    tags: TagOption[];
    isEdit?: boolean;
    flash?: {
        success?: string;
        error?: string;
    };
}

export default function CreateEditBlog() {
    const props = usePage<PageProps>().props;
    const isEdit = props.isEdit || false;
    const blog = props.blog;
    
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Blogs', href: '/dashboard/blogs' },
        { title: isEdit ? 'Edit Blog' : 'Create Blog', href: '#' },
    ];

    // Blog-specific form state
    const [author, setAuthor] = useState(blog?.author || '');
    const [authorDescription, setAuthorDescription] = useState(blog?.author_description || '');
    const [metaTitle, setMetaTitle] = useState(blog?.meta_title || '');
    const [metaDescription, setMetaDescription] = useState(blog?.meta_description || '');
    const [isFeatured, setIsFeatured] = useState(blog?.is_featured || false);
    const [publishedAt, setPublishedAt] = useState(blog?.published_at || '');

    // Show flash messages
    useEffect(() => {
        if (props.flash?.success) {
            alert(props.flash.success);
        }
        if (props.flash?.error) {
            alert(props.flash.error);
        }
    }, [props.flash]);

    // Log categories and tags for debugging
    useEffect(() => {
        console.log('Available Categories:', props.categories);
        console.log('Available Tags:', props.tags);
        console.log('Blog Data:', blog);
    }, [props.categories, props.tags, blog]);

    const handleSubmit = (formData: any) => {
        // Combine formData with blog-specific fields
        const data = {
            ...formData,
            author,
            author_description: authorDescription,
            meta_title: metaTitle,
            meta_description: metaDescription,
            is_featured: isFeatured,
            published_at: publishedAt || null,
        };

        console.log('Submitting data:', data);

        if (isEdit && blog) {
            router.put(`/dashboard/blogs/${blog.id}`, data, {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit('/dashboard/blogs');
                },
                onError: (errors) => {
                    alert('Error updating blog: ' + JSON.stringify(errors));
                }
            });
        } else {
            router.post('/dashboard/blogs', data, {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit('/dashboard/blogs');
                },
                onError: (errors) => {
                    alert('Error creating blog: ' + JSON.stringify(errors));
                }
            });
        }
    };

    // If editing, prepare initial data with categories and tags
    const initialData = blog ? {
        title: blog.title,
        slug: blog.slug,
        description: blog.description,
        content: blog.content,
        featured_image: blog.featured_image,
        featured_image_url: blog.featured_image_url,
        status: blog.status,
        categories: blog.categories, // This should be array of category IDs
        tags: blog.tags, // This should be array of tag IDs
    } : {};

    return (
        <>
           
            <CreateEditForm
                title={isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
                breadcrumbs={breadcrumbs}
                type="blog"
                initialCategories={props.categories}
                initialTags={props.tags}
                initialData={initialData}
                onSubmit={handleSubmit}
            >
                {/* Blog-specific fields */}
                <div className="space-y-6 mt-6">
                    <div className="">
                        <div>
                            <Label htmlFor="author">Author Name</Label>
                            <Input
                                id="author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Enter author name"
                            />
                        </div>
                        
                        <div className="flex items-center space-x-2 pt-6">
                            <Checkbox
                                id="is_featured"
                                checked={isFeatured}
                                onCheckedChange={(checked) => setIsFeatured(!!checked)}
                            />
                            <Label htmlFor="is_featured">Featured Post</Label>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="author_description">Author Description</Label>
                        <Textarea
                            id="author_description"
                            value={authorDescription}
                            onChange={(e) => setAuthorDescription(e.target.value)}
                            placeholder="Enter author description"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="meta_title">Meta Title (SEO)</Label>
                            <Input
                                id="meta_title"
                                value={metaTitle}
                                onChange={(e) => setMetaTitle(e.target.value)}
                                placeholder="Enter meta title for SEO"
                            />
                        </div>
                        
                        <div>
                            <Label htmlFor="published_at">Publish Date & Time</Label>
                            <Input
                                type="datetime-local"
                                id="published_at"
                                value={publishedAt}
                                onChange={(e) => setPublishedAt(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                        <Textarea
                            id="meta_description"
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            placeholder="Enter meta description for SEO"
                            rows={3}
                        />
                    </div>
                </div>
            </CreateEditForm>  
       </>
    );
}