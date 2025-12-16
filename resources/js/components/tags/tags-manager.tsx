import React, { useState, useMemo } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Edit, 
    Trash2,
    Search,
    ArrowUpDown,
    ChevronUp,
    ChevronDown,
    Save,
    X
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface TagItem {
    id: number;
    name: string;
    slug: string;
    description: string;
    itemCount: number;
    createdAt: string;
}

interface TagsManagerProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    itemType: 'blog' | 'portfolio' | 'generic';
    initialTags?: TagItem[];
    onTagsChange?: (tags: TagItem[]) => void;
}

type SortField = 'name' | 'slug' | 'itemCount' | 'createdAt' | null;
type SortDirection = 'asc' | 'desc';

export function TagsManager({ 
    title, 
    breadcrumbs, 
    itemType = 'generic',
    initialTags = [],
    onTagsChange 
}: TagsManagerProps) {
    // Form state
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    
    // Table state
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Tags data
    const [tags, setTags] = useState<TagItem[]>(initialTags);

    // Generate slug from name
    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/--+/g, '-')
            .trim();
    };

    // Handle name change and auto-generate slug
    const handleNameChange = (value: string) => {
        setName(value);
        if (!slug || editingId === null) {
            setSlug(generateSlug(value));
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!name || !description) {
            alert('Please fill in all required fields');
            return;
        }

        if (editingId) {
            // Update existing tag
            const updatedTags = tags.map(tag => 
                tag.id === editingId 
                    ? {
                        ...tag,
                        name,
                        slug,
                        description,
                    }
                    : tag
            );
            setTags(updatedTags);
            onTagsChange?.(updatedTags);
            setEditingId(null);
        } else {
            // Add new tag
            const newTag: TagItem = {
                id: tags.length + 1,
                name,
                slug,
                description,
                itemCount: 0,
                createdAt: new Date().toISOString().split('T')[0],
            };
            const updatedTags = [...tags, newTag];
            setTags(updatedTags);
            onTagsChange?.(updatedTags);
        }

        // Reset form
        resetForm();
    };

    // Reset form
    const resetForm = () => {
        setName('');
        setSlug('');
        setDescription('');
        setEditingId(null);
    };

    // Edit tag
    const handleEdit = (tag: TagItem) => {
        setName(tag.name);
        setSlug(tag.slug);
        setDescription(tag.description);
        setEditingId(tag.id);
    };

    // Delete tag
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this tag?')) {
            const updatedTags = tags.filter(tag => tag.id !== id);
            setTags(updatedTags);
            onTagsChange?.(updatedTags);
            
            if (editingId === id) {
                resetForm();
            }
        }
    };

    // Handle sorting
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Render sort icon
    const renderSortIcon = (field: SortField) => {
        if (sortField !== field) {
            return <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />;
        }
        return sortDirection === 'asc' ? 
            <ChevronUp className="ml-2 h-4 w-4" /> : 
            <ChevronDown className="ml-2 h-4 w-4" />;
    };

    // Filter and sort tags
    const filteredAndSortedTags = useMemo(() => {
        let result = tags;

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(tag => 
                tag.name.toLowerCase().includes(query) ||
                tag.slug.toLowerCase().includes(query) ||
                tag.description.toLowerCase().includes(query)
            );
        }

        // Apply sorting
        if (sortField) {
            result = [...result].sort((a, b) => {
                let aValue = a[sortField];
                let bValue = b[sortField];

                if (sortField === 'createdAt') {
                    aValue = new Date(aValue as string).getTime();
                    bValue = new Date(bValue as string).getTime();
                }

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                if (aValue < bValue) {
                    return sortDirection === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortDirection === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return result;
    }, [tags, sortField, sortDirection, searchQuery]);

    // Get item type label
    const getItemTypeLabel = () => {
        switch (itemType) {
            case 'blog': return 'posts';
            case 'portfolio': return 'items';
            default: return 'items';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="container-fluid py-6">
                <div className="row">
                    <div className="col-12 mb-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold">{title}</h1>
                                <p className="text-gray-500 mt-1">
                                    Manage tags for your {itemType} {getItemTypeLabel()}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search tags..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 w-[250px]"
                                    />
                                </div>
                                <Badge variant="secondary">
                                    {filteredAndSortedTags.length} tags
                                </Badge>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {editingId ? 'Edit Tag' : 'Add New Tag'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="name">Name *</Label>
                                            <Input
                                                id="name"
                                                value={name}
                                                onChange={(e) => handleNameChange(e.target.value)}
                                                placeholder={`Enter ${itemType} tag name`}
                                                required
                                            />
                                        </div>
                                        
                                        <div>
                                            <Label htmlFor="slug">Slug</Label>
                                            <Input
                                                id="slug"
                                                value={slug}
                                                onChange={(e) => setSlug(e.target.value)}
                                                placeholder={`${itemType}-tag-url-slug`}
                                            />
                                            <p className="text-sm text-gray-500 mt-1">
                                                URL-friendly version of the name
                                            </p>
                                        </div>
                                
                                        <div>
                                            <Label htmlFor="description">Description *</Label>
                                            <Textarea
                                                id="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder={`Brief description of the ${itemType} tag`}
                                                rows={4}
                                                required
                                            />
                                        </div>

                                        <div className="flex gap-2 pt-4">
                                            <Button type="submit" className="gap-2">
                                                <Save className="h-4 w-4" />
                                                {editingId ? 'Update Tag' : 'Add Tag'}
                                            </Button>
                                            {editingId && (
                                                <Button type="button" variant="outline" onClick={resetForm} className="gap-2">
                                                    <X className="h-4 w-4" />
                                                    Cancel
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                    
                    <div className="col-8">
                        <div className="border custombordercolor rounded-lg overflow-hidden w-[100%]">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead 
                                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() => handleSort('name')}
                                        >
                                            <div className="flex items-center">
                                                Name
                                                {renderSortIcon('name')}
                                            </div>
                                        </TableHead>
                                        <TableHead 
                                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() => handleSort('slug')}
                                        >
                                            <div className="flex items-center">
                                                Slug
                                                {renderSortIcon('slug')}
                                            </div>
                                        </TableHead>
                                        <TableHead 
                                            className="cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() => handleSort('itemCount')}
                                        >
                                            <div className="flex items-center">
                                                {getItemTypeLabel().charAt(0).toUpperCase() + getItemTypeLabel().slice(1)}
                                                {renderSortIcon('itemCount')}
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAndSortedTags.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                                No tags found. {searchQuery && "Try a different search term."}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredAndSortedTags.map((tag) => (
                                            <TableRow key={tag.id}>
                                                <TableCell className="font-medium">
                                                    {tag.name}
                                                </TableCell>
                                                <TableCell className="text-sm text-gray-500">
                                                    {tag.slug}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={tag.itemCount > 0 ? "default" : "secondary"}>
                                                        {tag.itemCount} {getItemTypeLabel()}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-center gap-2">
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            className="h-8 px-3 gap-1"
                                                            onClick={() => handleEdit(tag)}
                                                        >
                                                            <Edit className="h-3 w-3" />
                                                            Edit
                                                        </Button>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            className="h-8 px-3 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() => handleDelete(tag.id)}
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}