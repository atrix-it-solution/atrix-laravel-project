import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
    Upload, 
    Image as ImageIcon,
    Tag, 
    FolderOpen,
    Trash2,
    Plus,
    X,
    Save
} from 'lucide-react';

// Form input interfaces
export interface CategoryOption {
    id: number;
    name: string;
}

export interface TagOption {
    id: number;
    name: string;
}

// Image upload component
interface ImageUploadProps {
    imagePreview: string;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: () => void;
    label?: string;
}

export function ImageUpload({
    imagePreview,
    onImageUpload,
    onRemoveImage,
    label = "Featured Image"
}: ImageUploadProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {imagePreview ? (
                    <div className="space-y-3">
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Featured preview"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <Button
                                type="button"
                                size="sm"
                                variant="destructive"
                                className="absolute top-2 right-2"
                                onClick={onRemoveImage}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-500 mb-3">
                            Upload a featured image
                        </p>
                        <Label htmlFor="featured-image" className="cursor-pointer">
                            <Button type="button" variant="outline">
                                Choose Image
                            </Button>
                            <Input
                                id="featured-image"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={onImageUpload}
                            />
                        </Label>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

// Categories selector component
interface CategoriesSelectorProps {
    categories: CategoryOption[];
    selectedCategories: number[];
    onCategoryToggle: (id: number) => void;
    title?: string;
}

export function CategoriesSelector({
    categories,
    selectedCategories,
    onCategoryToggle,
    title = "Category"
}: CategoriesSelectorProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category.id)}
                                onChange={() => onCategoryToggle(category.id)}
                                className="rounded"
                            />
                            <span className="text-sm">{category.name}</span>
                        </label>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

// Tags selector component
interface TagsSelectorProps {
    allTags: TagOption[];
    selectedTags: number[];
    onTagToggle: (id: number) => void;
    onAddTag: () => void;
    newTag: string;
    onNewTagChange: (value: string) => void;
    title?: string;
}

export function TagsSelector({
    allTags,
    selectedTags,
    onTagToggle,
    onAddTag,
    newTag,
    onNewTagChange,
    title = "Tags"
}: TagsSelectorProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Add new tag */}
                    <div>
                        <Label>Add New Tag</Label>
                        <div className="flex gap-2 mt-2">
                            <Input
                                placeholder="Type tag and press Enter"
                                value={newTag}
                                onChange={(e) => onNewTagChange(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        onAddTag();
                                    }
                                }}
                            />
                            <Button 
                                type="button" 
                                variant="outline"
                                onClick={onAddTag}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Available tags */}
                    <div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {allTags.map((tag) => (
                                <Badge
                                    key={tag.id}
                                    variant={selectedTags.includes(tag.id) ? "default" : "outline"}
                                    className="cursor-pointer"
                                    onClick={() => onTagToggle(tag.id)}
                                >
                                    {tag.name}
                                    {selectedTags.includes(tag.id) && (
                                        <X className="h-3 w-3 ml-1" />
                                    )}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Publish/Save card component
interface PublishCardProps {
    status: 'draft' | 'published';
    onStatusChange?: (status: 'draft' | 'published') => void;
    onSubmit: () => void;
    submitLabel?: string;
    showStatusToggle?: boolean;
}

export function PublishCard({
    status,
    onStatusChange,
    onSubmit,
    submitLabel = "Publish",
    showStatusToggle = true
}: PublishCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Publish</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {showStatusToggle && onStatusChange && (
                    <div className="flex gap-2">
                        
                        <Button
                            type="button"
                            variant={status === 'published' ? 'default' : 'outline'}
                            size="sm"
                            className="flex-1"
                            onClick={() => onStatusChange('published')}
                        >
                            Publish
                        </Button>
                    </div>
                )}
                
            </CardContent>
        </Card>
    );
}

// Form header component
interface FormHeaderProps {
    title: string;
    subtitle?: string;
}

export function FormHeader({ title, subtitle }: FormHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-muted-foreground mt-2">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}