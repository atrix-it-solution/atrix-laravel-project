import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
    FormHeader,
    ImageUpload,
    CategoriesSelector,
    TagsSelector,
    PublishCard,
    CategoryOption,
    TagOption
} from './form-components';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import RichTextEditor from '../ui/RichTextEditor';
import Media from './media';

export interface CreateEditFormProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    type: 'blog' | 'portfolio';
    initialCategories: CategoryOption[];
    initialTags: TagOption[];
    onSubmit: (data: any) => void;
    children?: React.ReactNode;
    initialData?: {
        title?: string;
        slug?: string;
        description?: string;
        content?: string;
        featured_image?: string | null;
        featured_image_url?: string | null;
        status?: 'draft' | 'published' | 'archived';
        categories?: number[];
        tags?: number[];
    };
}

export function CreateEditForm({
    title,
    breadcrumbs,
    type,
    initialCategories,
    initialTags,
    onSubmit,
    children,
    initialData = {}
}: CreateEditFormProps) {
    // Form state
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        slug: initialData.slug || '',
        description: initialData.description || '',
        content: initialData.content || '',
        featured_image: initialData.featured_image || null,
        featured_image_url: initialData.featured_image_url || '',
        status: initialData.status || 'draft' as 'draft' | 'published' | 'archived',
        categories: initialData.categories || [] as number[],
        tags: initialData.tags || [] as number[],
    });

    // Update form data
    const updateFormData = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Generate slug from title
    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    };

    // Handle title change and auto-generate slug
    const handleTitleChange = (value: string) => {
        updateFormData('title', value);
        if (!formData.slug || value !== initialData.title) {
            const slug = generateSlug(value);
            updateFormData('slug', slug);
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.title.trim()) {
            alert('Please enter a title');
            return;
        }
        
        if (!formData.content.trim()) {
            alert('Please enter content');
            return;
        }

        // Prepare the data object
        const submitData = {
            ...formData,
            // Ensure slug is set
            slug: formData.slug || generateSlug(formData.title),
        };

        // Call the onSubmit prop
        onSubmit(submitData);
    };

    const getItemTypeLabel = () => {
        return type === 'blog' ? 'Blog Post' : 'Portfolio Item';
    };

    const handleFileSelect = (fileId: string | null, fileUrl?: string) => {
        updateFormData('featured_image', fileId);
        if (fileUrl) {
            updateFormData('featured_image_url', fileUrl);
        } else {
            updateFormData('featured_image_url', '');
        }
    };

    // When initialData changes, update form
    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                slug: initialData.slug || '',
                description: initialData.description || '',
                content: initialData.content || '',
                featured_image: initialData.featured_image || null,
                featured_image_url: initialData.featured_image_url || '',
                status: initialData.status || 'draft',
                categories: initialData.categories || [],
                tags: initialData.tags || [],
            });
        }
    }, [initialData]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            
            <div className="pt-10">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <FormHeader
                                title={title}
                                subtitle={`Fill in the details to create a new ${getItemTypeLabel().toLowerCase()}`}
                            />

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    {/* Left column - Main content */}
                                    <div className="col-10 space-y-6">
                                        {/* Title */}
                                        <div>
                                            <Label htmlFor="title">Title *</Label>
                                            <Input
                                                id="title"
                                                value={formData.title}
                                                onChange={(e) => handleTitleChange(e.target.value)}
                                                placeholder={`Enter ${getItemTypeLabel().toLowerCase()} title`}
                                                required
                                            />
                                        </div>

                                        {/* Slug */}
                                        <div>
                                            <Label htmlFor="slug">Slug *</Label>
                                            <Input
                                                id="slug"
                                                value={formData.slug}
                                                onChange={(e) => updateFormData('slug', e.target.value)}
                                                placeholder={`${type}-item-url-slug`}
                                                required
                                            />
                                            <p className="text-sm text-gray-500 mt-1">
                                                URL-friendly version of the title
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <Label htmlFor="description">Short Description</Label>
                                            <Textarea
                                                id="description"
                                                value={formData.description}
                                                onChange={(e) => updateFormData('description', e.target.value)}
                                                placeholder={`Enter a short description of your ${getItemTypeLabel().toLowerCase()}`}
                                                rows={3}
                                            />
                                        </div>

                                        {/* Content Editor */}
                                        <div>
                                            <Label htmlFor="content">Content *</Label>
                                            <RichTextEditor
                                                value={formData.content}
                                                onChange={(content) => updateFormData('content', content)}
                                                placeholder={`Write your ${getItemTypeLabel().toLowerCase()} content here...`}
                                                label="Content"
                                            />
                                        </div>

                                        {/* Additional type-specific fields (passed as children) */}
                                        {children}
                                    </div>

                                    {/* Right column - Sidebar */}
                                    <div className="col-2 space-y-6">
                                        <PublishCard
                                            status={formData.status}
                                            onStatusChange={(status) => updateFormData('status', status)}
                                            onSubmit={handleSubmit}
                                            submitLabel={`${formData.status === 'published' ? 'Publish' : 'Save Draft'} ${getItemTypeLabel()}`}
                                        />
                                        
                                        {/* Featured Image */}
                                        <div className="card">
                                            <div className="card-header">
                                                <h4 className="card-title">Featured Image</h4>
                                            </div>
                                            <div className="card-body">
                                                <Media
                                                    onFileSelect={handleFileSelect}
                                                    selectedFile={formData.featured_image}
                                                    title="Featured Image"
                                                    setName="Set Featured Image"
                                                    Componenttitle="Featured Image"
                                                    h1="Select Featured Image"
                                                    SetButtonName="Use as Featured Image"
                                                />
                                                {formData.featured_image_url && (
                                                    <div className="mt-3">
                                                        <img 
                                                            src={formData.featured_image_url} 
                                                            alt="Featured" 
                                                            className="w-full h-32 object-cover rounded"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Categories */}
                                        <CategoriesSelector
                                            categories={initialCategories}
                                            selectedCategories={formData.categories}
                                            onCategoryToggle={(id) => {
                                                const newCategories = formData.categories.includes(id)
                                                    ? formData.categories.filter(catId => catId !== id)
                                                    : [...formData.categories, id];
                                                updateFormData('categories', newCategories);
                                            }}
                                            title={type === 'blog' ? 'Blog Categories' : 'Portfolio Categories'}
                                        />

                                        {/* Tags */}
                                        <TagsSelector
                                            allTags={initialTags}
                                            selectedTags={formData.tags}
                                            onTagToggle={(id) => {
                                                const newTags = formData.tags.includes(id)
                                                    ? formData.tags.filter(tagId => tagId !== id)
                                                    : [...formData.tags, id];
                                                updateFormData('tags', newTags);
                                            }}
                                            title={type === 'blog' ? 'Blog Tags' : 'Portfolio Tags'}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}