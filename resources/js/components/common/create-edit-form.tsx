import React, { useState } from 'react';
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

export interface CreateEditFormProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    type: 'blog' | 'portfolio';
    initialCategories: CategoryOption[];
    initialTags: TagOption[];
    onSubmit: (data: FormData) => void;
    children?: React.ReactNode;
}

export function CreateEditForm({
    title,
    breadcrumbs,
    type,
    initialCategories,
    initialTags,
    onSubmit,
    children
}: CreateEditFormProps) {
    // Form state
    const [formTitle, setFormTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [newTag, setNewTag] = useState('');
    const [status, setStatus] = useState<'draft' | 'published'>('draft');
    const [allTags, setAllTags] = useState<TagOption[]>(initialTags);

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
        setFormTitle(value);
        if (!slug) {
            setSlug(generateSlug(value));
        }
    };

    // Handle featured image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFeaturedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove featured image
    const removeFeaturedImage = () => {
        setFeaturedImage(null);
        setImagePreview('');
    };

    // Handle category toggle
    const handleCategoryToggle = (id: number) => {
        setSelectedCategories(prev =>
            prev.includes(id)
                ? prev.filter(catId => catId !== id)
                : [...prev, id]
        );
    };

    // Handle tag toggle
    const handleTagToggle = (tagId: number) => {
        setSelectedTags(prev => 
            prev.includes(tagId)
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
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
        setSelectedTags(prev => [...prev, newTagObj.id]);
        setNewTag('');
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Prepare form data
        const formData = new FormData();
        formData.append('title', formTitle);
        formData.append('slug', slug);
        formData.append('description', description);
        formData.append('content', content);
        formData.append('type', type);
        formData.append('status', status);
        
        selectedCategories.forEach(id => {
            formData.append('categories[]', id.toString());
        });
        
        selectedTags.forEach(tagId => {
            formData.append('tags[]', tagId.toString());
        });
        
        if (featuredImage) {
            formData.append('featured_image', featuredImage);
        }

        // Call the onSubmit prop
        onSubmit(formData);
    };

    const getItemTypeLabel = () => {
        return type === 'blog' ? 'Blog Post' : 'Portfolio Item';
    };

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
                                                value={formTitle}
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
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value)}
                                                placeholder={`${type}-item-url-slug`}
                                            />
                                            <p className="text-sm text-gray-500 mt-1">
                                                URL-friendly version of the title
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <div>
                                            <Label htmlFor="description">Description *</Label>
                                            <Textarea
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder={`Brief description of your ${getItemTypeLabel().toLowerCase()}`}
                                                rows={4}
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
                                            status={status}
                                            onStatusChange={setStatus}
                                            onSubmit={() => handleSubmit}
                                            submitLabel={`${status === 'published' ? 'Publish' : 'Save Draft'} ${getItemTypeLabel()}`}
                                        />

                                        <ImageUpload
                                            imagePreview={imagePreview}
                                            onImageUpload={handleImageUpload}
                                            onRemoveImage={removeFeaturedImage}
                                            label={`${getItemTypeLabel()} Image`}
                                        />

                                        <CategoriesSelector
                                            categories={initialCategories}
                                            selectedCategories={selectedCategories}
                                            onCategoryToggle={handleCategoryToggle}
                                            title={type === 'blog' ? 'Blog Categories' : 'Portfolio Categories'}
                                        />

                                        <TagsSelector
                                            allTags={allTags}
                                            selectedTags={selectedTags}
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