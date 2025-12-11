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
    Eye,
    Calendar,
    User,
    Search,
    Filter,
    ArrowUpDown,
    ChevronUp,
    ChevronDown
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Blog',
        href: "/dashboard/allblog",
    },
];

// Mock data for demonstration
const blogPosts = [
    {
        id: 1,
        title: 'Getting Started with Laravel',
        slug: 'getting-started-with-laravel',
        author: 'John Doe',
        category: 'Tutorial',
        status: 'published',
        views: 1245,
        createdAt: '2024-03-15',
        updatedAt: '2024-03-16',
    },
    {
        id: 2,
        title: 'React Best Practices',
        slug: 'react-best-practices',
        author: 'Jane Smith',
        category: 'Development',
        status: 'published',
        views: 892,
        createdAt: '2024-03-10',
        updatedAt: '2024-03-12',
    },
    {
        id: 3,
        title: 'Understanding TypeScript',
        slug: 'understanding-typescript',
        author: 'Alex Johnson',
        category: 'Tutorial',
        status: 'draft',
        views: 0,
        createdAt: '2024-03-18',
        updatedAt: '2024-03-18',
    },
    {
        id: 4,
        title: 'Building APIs with Laravel',
        slug: 'building-apis-with-laravel',
        author: 'Mike Wilson',
        category: 'API',
        status: 'published',
        views: 1567,
        createdAt: '2024-03-05',
        updatedAt: '2024-03-08',
    },
    {
        id: 5,
        title: 'Tailwind CSS Tips',
        slug: 'tailwind-css-tips',
        author: 'Sarah Brown',
        category: 'Design',
        status: 'pending',
        views: 0,
        createdAt: '2024-03-20',
        updatedAt: '2024-03-20',
    },
    {
        id: 6,
        title: 'Advanced Laravel',
        slug: 'advanced-laravel',
        author: 'Mike Wilson',
        category: 'Tutorial',
        status: 'published',
        views: 2100,
        createdAt: '2024-03-25',
        updatedAt: '2024-03-25',
    },
    {
        id: 7,
        title: 'CSS Grid Mastery',
        slug: 'css-grid-mastery',
        author: 'Sarah Brown',
        category: 'Design',
        status: 'published',
        views: 1500,
        createdAt: '2024-03-28',
        updatedAt: '2024-03-28',
    },
    {
        id: 8,
        title: 'TypeScript Generics',
        slug: 'typescript-generics',
        author: 'Alex Johnson',
        category: 'Tutorial',
        status: 'draft',
        views: 0,
        createdAt: '2024-04-01',
        updatedAt: '2024-04-01',
    },
];

type SortField = 'title' | 'author' | 'category' | 'createdAt' | null;
type SortDirection = 'asc' | 'desc';

export default function AllBlog() {
    // State for sorting and search
    const [sortField, setSortField] = useState<SortField>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [searchQuery, setSearchQuery] = useState('');

    // Handle column header click for sorting
    const handleSort = (field: SortField) => {
        if (sortField === field) {
            // If clicking the same field, toggle direction
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // If clicking a new field, set it as sort field with ascending order
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // Filter and sort posts
    const filteredAndSortedPosts = useMemo(() => {
        let result = blogPosts;

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(post => 
                post.title.toLowerCase().includes(query) ||
                post.author.toLowerCase().includes(query) ||
                post.category.toLowerCase().includes(query) ||
                post.slug.toLowerCase().includes(query)
            );
        }

        // Apply sorting
        if (sortField) {
            result = [...result].sort((a, b) => {
                let aValue = a[sortField];
                let bValue = b[sortField];

                // Handle date comparison
                if (sortField === 'createdAt') {
                    aValue = new Date(aValue).getTime();
                    bValue = new Date(bValue).getTime();
                }

                // String comparison
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                // Compare values
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
    }, [sortField, sortDirection, searchQuery]);

    // Render sort icon for column headers
    const renderSortIcon = (field: SortField) => {
        if (sortField !== field) {
            return <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />;
        }
        return sortDirection === 'asc' ? 
            <ChevronUp className="ml-2 h-4 w-4" /> : 
            <ChevronDown className="ml-2 h-4 w-4" />;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Blog Posts" />
            
            <div className='pt-10'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className="col">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">All Blog Posts</h1>
                                    <p className="text-muted-foreground mt-2">
                                        Manage and view all your blog posts in one place
                                    </p>
                                    {sortField && (
                                        <div className="text-sm text-blue-600 mt-1">
                                            Sorted by: {sortField} ({sortDirection})
                                        </div>
                                    )}
                                </div>
                                <Button className="sm:self-start">
                                    + Create New Post
                                </Button>
                            </div>

                            {/* Search and Filter */}
                            <div className="mb-6 flex gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="search"
                                        placeholder="Search by title, author, or category..."
                                        className="pl-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Button variant="outline">
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filter
                                </Button>
                            </div>

                            {/* Table */}
                            <div className="bg-card border rounded-lg overflow-hidden">
                                <div className="p-6">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead 
                                                    className="w-[300px] cursor-pointer hover:bg-gray-50 transition-colors"
                                                    onClick={() => handleSort('title')}
                                                >
                                                    <div className="flex items-center">
                                                        Title
                                                        {renderSortIcon('title')}
                                                    </div>
                                                </TableHead>
                                                <TableHead 
                                                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                                                    onClick={() => handleSort('author')}
                                                >
                                                    <div className="flex items-center">
                                                        Author
                                                        {renderSortIcon('author')}
                                                    </div>
                                                </TableHead>
                                                <TableHead 
                                                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                                                    onClick={() => handleSort('category')}
                                                >
                                                    <div className="flex items-center">
                                                        Category
                                                        {renderSortIcon('category')}
                                                    </div>
                                                </TableHead>
                                                <TableHead 
                                                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                                                    onClick={() => handleSort('createdAt')}
                                                >
                                                    <div className="flex items-center">
                                                        Created
                                                        {renderSortIcon('createdAt')}
                                                    </div>
                                                </TableHead>
                                                <TableHead className="text-right">
                                                    Actions
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredAndSortedPosts.map((post) => (
                                                <TableRow key={post.id}>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">{post.title}</p>
                                                            <p className="text-sm text-muted-foreground">/{post.slug}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <User className="h-4 w-4 text-muted-foreground" />
                                                            <span>{post.author}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">
                                                            {post.category}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm">{post.createdAt}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex justify-end gap-2">
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm"
                                                                className="h-8 px-3 gap-1"
                                                            >
                                                                <Eye className="h-3 w-3" />
                                                                View
                                                            </Button>
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm"
                                                                className="h-8 px-3 gap-1"
                                                            >
                                                                <Edit className="h-3 w-3" />
                                                                Edit
                                                            </Button>
                                                            <Button 
                                                                variant="outline" 
                                                                size="sm"
                                                                className="h-8 px-3 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="h-3 w-3" />
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                    {/* No results message */}
                                    {filteredAndSortedPosts.length === 0 && (
                                        <div className="text-center py-8 text-gray-500">
                                            No blog posts found. {searchQuery && "Try a different search term."}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between mt-6">
                                <div className="text-sm text-muted-foreground">
                                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAndSortedPosts.length}</span> of{' '}
                                    <span className="font-medium">{blogPosts.length}</span> posts
                                    {searchQuery && (
                                        <span className="ml-2 text-blue-600">
                                            ({filteredAndSortedPosts.length} results for "{searchQuery}")
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="outline" size="sm" disabled>
                                        Previous
                                    </Button>
                                    <Button variant="outline" size="sm" className="bg-blue-50 text-blue-600">
                                        1
                                    </Button>
                                    <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                                        2
                                    </Button>
                                    <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                                        3
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        Next
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}