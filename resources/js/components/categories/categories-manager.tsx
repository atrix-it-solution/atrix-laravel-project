import React, { useState, useMemo } from 'react';
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
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface CategoryItem {
    id: number;
    name: string;
    slug: string;
    description: string;
    parentId: number | null;
    itemCount: number;
    createdAt: string;
    parentName?: string;
}

interface CategoriesManagerProps {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    itemType: 'blog' | 'portfolio' | 'generic';
    initialCategories?: CategoryItem[];
    onCategoriesChange?: (categories: CategoryItem[]) => void;
}

export type BreadcrumbItem = {
    title: string;
    href: string;
};

type SortField = 'name' | 'slug' | 'itemCount' | 'createdAt' | null;
type SortDirection = 'asc' | 'desc';

export function CategoriesManager({ 
    title, 
    breadcrumbs, 
    itemType = 'generic',
    initialCategories = [],
    onCategoriesChange 
}: CategoriesManagerProps) {
    // Form state
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [parentId, setParentId] = useState<string>('none');
    const [editingId, setEditingId] = useState<number | null>(null);
    
    // Table state
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Categories data
    const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);

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
            // Update existing category
            const updatedCategories = categories.map(cat => 
                cat.id === editingId 
                    ? {
                        ...cat,
                        name,
                        slug,
                        description,
                        parentId: parentId !== 'none' ? parseInt(parentId) : null,
                        parentName: parentId !== 'none' ? categories.find(c => c.id === parseInt(parentId))?.name : undefined
                    }
                    : cat
            );
            setCategories(updatedCategories);
            onCategoriesChange?.(updatedCategories);
            setEditingId(null);
        } else {
            // Add new category
            const newCategory: CategoryItem = {
                id: categories.length + 1,
                name,
                slug,
                description,
                parentId: parentId !== 'none' ? parseInt(parentId) : null,
                itemCount: 0,
                createdAt: new Date().toISOString().split('T')[0],
                parentName: parentId !== 'none' ? categories.find(c => c.id === parseInt(parentId))?.name : undefined
            };
            const updatedCategories = [...categories, newCategory];
            setCategories(updatedCategories);
            onCategoriesChange?.(updatedCategories);
        }

        // Reset form
        resetForm();
    };

    // Reset form
    const resetForm = () => {
        setName('');
        setSlug('');
        setDescription('');
        setParentId('none');
        setEditingId(null);
    };

    // Edit category
    const handleEdit = (category: CategoryItem) => {
        setName(category.name);
        setSlug(category.slug);
        setDescription(category.description);
        setParentId(category.parentId?.toString() || 'none');
        setEditingId(category.id);
    };

    // Delete category
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            const updatedCategories = categories.filter(cat => cat.id !== id);
            setCategories(updatedCategories);
            onCategoriesChange?.(updatedCategories);
            
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

    // Filter and sort categories
    const filteredAndSortedCategories = useMemo(() => {
        let result = categories;

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(category => 
                category.name.toLowerCase().includes(query) ||
                category.slug.toLowerCase().includes(query) ||
                category.description.toLowerCase().includes(query)
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
    }, [categories, sortField, sortDirection, searchQuery]);

    // Get parent categories (categories without parent)
    const parentCategories = categories.filter(cat => cat.parentId === null);

    // Get item type label
    const getItemTypeLabel = () => {
        switch (itemType) {
            case 'blog': return 'posts';
            case 'portfolio': return 'items';
            default: return 'items';
        }
    };

    // Get item type singular label
    const getItemTypeSingularLabel = () => {
        switch (itemType) {
            case 'blog': return 'post';
            case 'portfolio': return 'item';
            default: return 'item';
        }
    };

    return (
        <div className="container-fluid py-6">
            <div className="row">
                <div className="col-12 mb-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">{title}</h1>
                            <p className="text-gray-500 mt-1">
                                Manage categories for your {itemType} {getItemTypeLabel()}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search categories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 w-[250px]"
                                />
                            </div>
                            <Badge variant="secondary">
                                {filteredAndSortedCategories.length} categories
                            </Badge>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {editingId ? 'Edit Category' : 'Add New Category'}
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
                                            placeholder={`Enter ${itemType} category name`}
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <Label htmlFor="slug">Slug</Label>
                                        <Input
                                            id="slug"
                                            value={slug}
                                            onChange={(e) => setSlug(e.target.value)}
                                            placeholder={`${itemType}-category-url-slug`}
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            URL-friendly version of the name
                                        </p>
                                    </div>

                                    <div>
                                        <Label htmlFor='parent-category'>Parent Category</Label>
                                        <Select value={parentId} onValueChange={setParentId}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select parent category (optional)" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">None (Top Level)</SelectItem>
                                                {parentCategories.map(category => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                            
                                    <div>
                                        <Label htmlFor="description">Description *</Label>
                                        <Textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder={`Brief description of the ${itemType} category`}
                                            rows={4}
                                            required
                                        />
                                    </div>

                                    <div className="flex gap-2 pt-4">
                                        <Button type="submit" className="gap-2">
                                            <Save className="h-4 w-4" />
                                            {editingId ? 'Update Category' : 'Add Category'}
                                        </Button>
                                        {editingId && (
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                onClick={resetForm} 
                                                className="gap-2"
                                            >
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
                                    <TableHead>Parent</TableHead>
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
                                {filteredAndSortedCategories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                            No categories found. {searchQuery && "Try a different search term."}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredAndSortedCategories.map((category) => (
                                        <TableRow key={category.id}>
                                            <TableCell className="font-medium">
                                                {category.name}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-500">
                                                {category.slug}
                                            </TableCell>
                                            <TableCell>
                                                {category.parentName ? (
                                                    <Badge variant="outline">
                                                        {category.parentName}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-gray-400">—</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={category.itemCount > 0 ? "default" : "secondary"}>
                                                    {category.itemCount} {getItemTypeLabel()}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-center gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        className="h-8 px-3 gap-1"
                                                        onClick={() => handleEdit(category)}
                                                    >
                                                        <Edit className="h-3 w-3" />
                                                        Edit
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        className="h-8 px-3 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        onClick={() => handleDelete(category.id)}
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
    );
}