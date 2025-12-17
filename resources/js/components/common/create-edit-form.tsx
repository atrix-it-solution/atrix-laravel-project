

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
    onSubmit: (data: FormData) => void;
    children?: React.ReactNode;
    initialData?: {
        title?: string;
        slug?: string;
        description?: string;
        content?: string;
        featured_image?: string;
        featured_image_url?: string;
        status?: 'draft' | 'published';
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
    // Form state - consolidated into one object
    const [formData, setFormData] = useState({
        title: initialData.title || '',
        slug: initialData.slug || '',
        description: initialData.description || '',
        content: initialData.content || '',
        featured_image: initialData.featured_image || null,
        featured_image_url: initialData.featured_image_url || '',
        status: initialData.status || 'draft' as 'draft' | 'published',
        categories: initialData.categories || [] as number[],
        tags: initialData.tags || [] as number[],
    });

    // Additional state for UI
    const [imagePreview, setImagePreview] = useState<string>(initialData.featured_image_url || '');
    const [newTag, setNewTag] = useState('');
    const [allTags, setAllTags] = useState<TagOption[]>(initialTags);

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
        if (!formData.slug) {
            updateFormData('slug', generateSlug(value));
        }
    };

    // Handle featured image upload (for direct file upload)
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            // Store file object if you want to handle file upload directly
            // updateFormData('featured_image_file', file);
        }
    };

    // Remove featured image
    const removeFeaturedImage = () => {
        updateFormData('featured_image', null);
        setImagePreview('');
    };

    // Handle category toggle
    const handleCategoryToggle = (id: number) => {
        const newCategories = formData.categories.includes(id)
            ? formData.categories.filter(catId => catId !== id)
            : [...formData.categories, id];
        updateFormData('categories', newCategories);
    };

    // Handle tag toggle
    const handleTagToggle = (tagId: number) => {
        const newTags = formData.tags.includes(tagId)
            ? formData.tags.filter(id => id !== tagId)
            : [...formData.tags, tagId];
        updateFormData('tags', newTags);
    };

    // Handle adding new tag
    const handleAddNewTag = () => {
        const tagName = newTag.trim();
        if (!tagName) return;

        // Prevent duplicate tags
        const exists = allTags.some(
            tag => tag.name.toLowerCase() === tagName.toLowerCase()
        );

        if (exists) {
            setNewTag('');
            return;
        }

        const newTagObj = {
            id: Date.now(), // temporary unique ID
            name: tagName,
        };

        setAllTags(prev => [...prev, newTagObj]);
        updateFormData('tags', [...formData.tags, newTagObj.id]);
        setNewTag('');
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Prepare form data
        const submitFormData = new FormData();
        submitFormData.append('title', formData.title);
        submitFormData.append('slug', formData.slug);
        submitFormData.append('description', formData.description);
        submitFormData.append('content', formData.content);
        submitFormData.append('type', type);
        submitFormData.append('status', formData.status);
        
        formData.categories.forEach(id => {
            submitFormData.append('categories[]', id.toString());
        });
        
        formData.tags.forEach(tagId => {
            submitFormData.append('tags[]', tagId.toString());
        });
        
        // If you have a file upload, add it
        // if (formData.featured_image_file) {
        //     submitFormData.append('featured_image', formData.featured_image_file);
        // } else if (formData.featured_image) {
        //     submitFormData.append('featured_image_id', formData.featured_image);
        // }

        // For now, just pass the featured image ID
        if (formData.featured_image) {
            submitFormData.append('featured_image', formData.featured_image);
        }

        // Call the onSubmit prop
        onSubmit(submitFormData);
    };

    const getItemTypeLabel = () => {
        return type === 'blog' ? 'Blog Post' : 'Portfolio Item';
    };

     const handleFileSelect = (fileId: string | null, fileUrl?: string) => {
        updateFormData('featured_image', fileId);
        if (fileUrl) {
            updateFormData('featured_image_url', fileUrl);
            setImagePreview(fileUrl);
        } else {
            updateFormData('featured_image_url', '');
            setImagePreview('');
        }
    };

    // When initialData changes, update image preview
    useEffect(() => {
        if (initialData.featured_image_url) {
            setImagePreview(initialData.featured_image_url);
        }
    }, [initialData.featured_image_url]);

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
                                            <Label htmlFor="slug">Slug</Label>
                                            <Input
                                                id="slug"
                                                value={formData.slug}
                                                onChange={(e) => updateFormData('slug', e.target.value)}
                                                placeholder={`${type}-item-url-slug`}
                                            />
                                            <p className="text-sm text-gray-500 mt-1">
                                                URL-friendly version of the title
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <Label htmlFor="description">Description *</Label>
                                            <RichTextEditor
                                                value={formData.content}
                                                onChange={(content) => updateFormData('content', content)}
                                                placeholder={`Write your ${getItemTypeLabel().toLowerCase()} content here...`}
                                                label="Content"
                                                
                                                required
                                            />
                                        </div>

                                        {/* Content Editor - Can be customized per type */}
                                        {children}

                                        {/* Additional fields can be added here */}
                                    </div>

                                    {/* Right column - Sidebar */}
                                    <div className="col-2 space-y-6">
                                        <PublishCard
                                            status={formData.status}
                                            onStatusChange={(status) => updateFormData('status', status)}
                                            onSubmit={handleSubmit}
                                            submitLabel={`${formData.status === 'published' ? 'Publish' : 'Save Draft'} ${getItemTypeLabel()}`}
                                        />
                                        
                                        {/* Media component for selecting from existing files */}
                                        <Media
                                            onFileSelect={handleFileSelect} // Use the updated handler
                                            selectedFile={formData.featured_image}
                                            title="Featured Image"
                                            setName="Set Featured Image"
                                            Componenttitle="Featured Image"
                                            h1="Select Featured Image"
                                            SetButtonName="Use as Featured Image"
                                        />

                                        <CategoriesSelector
                                            categories={initialCategories}
                                            selectedCategories={formData.categories}
                                            onCategoryToggle={handleCategoryToggle}
                                            title={type === 'blog' ? 'Blog Categories' : 'Portfolio Categories'}
                                        />

                                        <TagsSelector
                                            allTags={allTags}
                                            selectedTags={formData.tags}
                                            onTagToggle={handleTagToggle}
                                            onAddTag={handleAddNewTag}
                                            newTag={newTag}
                                            onNewTagChange={setNewTag}
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