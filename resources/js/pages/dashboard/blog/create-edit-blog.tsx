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
import { SharedPageProps } from '@/types/page-props';
import { useCategories } from '@/contexts/CategoriesContext';


type Category = {
    id: number;
    name: string;
};

type Tag = {
    id: number;
    name: string;
};

interface PageProps extends SharedPageProps {
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
        category_details?: Category[];
        tag_details?: Tag[];
    };
    categories: Category[];
    tags: Tag[];
    isEdit?: boolean;
    flash?: {
        success?: string;
        error?: string;
    };
}


export default function CreateEditBlog() {
    const { blog, categories, tags, isEdit, flash } = usePage<PageProps>().props;

    
    

    
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
        if (flash?.success) alert(flash.success);
        if (flash?.error) alert(flash.error);
    }, [flash]);

    // // Log categories and tags for debugging
    // useEffect(() => {
    //     console.log('Available Categories:', props.categories);
    //     console.log('Available Tags:', props.tags);
    //     console.log('Blog Data:', blog);
    // }, [props.categories, props.tags, blog]);

     ;

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
            featured_image: formData.featured_image, 
            categories: formData.categories || [], 
            tags: formData.tags || [],
        };
        //  console.log('Final data to submit:', data);
        // console.log('Submitting data to backend:', data);

        if (isEdit && blog) {
            router.put(`/dashboard/edit-blog/${blog.id}`, data, {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit('/dashboard/blogs');
                },
                onError: (errors) => {
                    console.error('Update errors:', errors);
                    alert('Error updating blog: ' + JSON.stringify(errors));
                }
            });
        } else {
            router.post('/dashboard/create-blog', data, {
                preserveScroll: true,
                onSuccess: () => {
                    router.visit('/dashboard/blogs');
                },
                onError: (errors) => {
                    console.error('Create errors:', errors);
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
        featured_image: blog.featured_image
        ? Number(blog.featured_image)
        : null,
        featured_image_url: blog.featured_image_url,
        status: blog.status,
        categories: blog.categories, // This should be array of category IDs
        tags: blog.tags, // This should be array of tag IDs
    } : {};

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Blog' : 'Create Blog'} />
            <CreateEditForm
                title={isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
                breadcrumbs={breadcrumbs}
                type="blog"
                initialCategories={categories}
                initialTags={tags}
                initialData={initialData}
                onSubmit={handleSubmit}
            >
                {/* Blog-specific fields */}
                <div className="space-y-6 mt-6">
                    <div className="grid grid-cols-2 gap-4">
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
        </AppLayout>
    );
}