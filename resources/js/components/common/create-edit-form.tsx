import React, { useEffect, useState } from 'react';
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
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FolderOpen } from 'lucide-react';

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
        featured_image?: number | null;
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

        // console.log('Form data to submit:', submitData);

        // Call the onSubmit prop
        onSubmit(submitData);
    };

    const getItemTypeLabel = () => {
        return type === 'blog' ? 'Blog Post' : 'Portfolio Item';
    };

    const handleFileSelect = (fileId: number | null, fileUrl?: string) => {
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
        <>
            <Head title={title} />
            <div className="pt-10">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <FormHeader
                                title={title}
                                subtitle={`Fill in the details to create a new ${getItemTypeLabel().toLowerCase()}`}
                            />
                            
                            <div className="row">
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
                                    {children}
                                </div>

                                {/* Right column - Sidebar */}
                                <div className="col-2 space-y-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <Button
                                                onClick={handleSubmit}
                                                className="w-full bg-(--blue) hover:bg-(--blue) text-white"
                                            >
                                                {formData.status === 'published' ? 'Publish' : 'Save Draft'} {getItemTypeLabel()}
                                            </Button>
                                            <div className="mt-4">
                                                <Label>Status</Label>
                                                <select
                                                    value={formData.status}
                                                    onChange={(e) => updateFormData('status', e.target.value)}
                                                    className="w-full border rounded p-2 mt-1"
                                                >
                                                    <option value="draft">Draft</option>
                                                    <option value="published">Published</option>
                                                    <option value="archived">Archived</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Featured Image */}
                                
                                    <div >
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
                                        {/* Hidden input for form submission */}
                                        <input 
                                            type="hidden" 
                                            name="featured_image" 
                                            value={formData.featured_image || ''}
                                        />
                                    </div>
                                    

                                    {/* Categories */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <FolderOpen className="h-5 w-5" />
                                            {type === 'blog' ? 'Blog Categories' : 'Portfolio Categories'}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                    
                                            <div className="space-y-2">
                                                {initialCategories.map((category) => (
                                                    <div key={category.id} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`category-${category.id}`}
                                                            checked={formData.categories.includes(category.id)}
                                                            onChange={(e) => {
                                                                const newCategories = e.target.checked
                                                                    ? [...formData.categories, category.id]
                                                                    : formData.categories.filter(id => id !== category.id);
                                                                updateFormData('categories', newCategories);
                                                            }}
                                                            className="mr-2"
                                                        />
                                                        <label htmlFor={`category-${category.id}`}>
                                                            {category.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Hidden input for form submission */}
                                            <input 
                                                type="hidden" 
                                                name="categories" 
                                                value={JSON.stringify(formData.categories)}
                                            />
                                        </CardContent>
                                    </Card>

                                    {/* Tags */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <FolderOpen className="h-5 w-5" />
                                                {type === 'blog' ? 'Blog Tags' : 'Portfolio Tags'}

                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <h3 className="font-semibold mb-3">
                                            </h3>
                                            <div className="space-y-2">
                                                {initialTags.map((tag) => (
                                                    <div key={tag.id} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`tag-${tag.id}`}
                                                            checked={formData.tags.includes(tag.id)}
                                                            onChange={(e) => {
                                                                const newTags = e.target.checked
                                                                    ? [...formData.tags, tag.id]
                                                                    : formData.tags.filter(id => id !== tag.id);
                                                                updateFormData('tags', newTags);
                                                            }}
                                                            className="mr-2"
                                                        />
                                                        <label htmlFor={`tag-${tag.id}`}>
                                                            {tag.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                            {/* Hidden input for form submission */}
                                            <input 
                                                type="hidden" 
                                                name="tags" 
                                                value={JSON.stringify(formData.tags)}
                                            />
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}