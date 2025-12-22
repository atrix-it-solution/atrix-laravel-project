import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
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
import { Edit, Trash2, Eye, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SharedPageProps } from '@/types/page-props';

interface BlogData {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    status: 'draft' | 'published' | 'archived';
    is_featured: boolean;
    views: number;
    published_at: string | null;
    created_at: string;
    categories: Array<{ id: number; name: string }>;
    tags: Array<{ id: number; name: string }>;
    featured_image?: {
        url: string;
    } | null;
}

interface PageProps extends SharedPageProps {
    blogs: {
        data: BlogData[];
        links: any[];
        meta: any;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Blog Posts', href: '/dashboard/blogs' },
];

export default function AllBlog() {
    const props = usePage<PageProps>().props;
    const { blogs } = props;

    // Show flash messages
    useEffect(() => {
        if (props.flash?.success) {
            alert(props.flash.success);
        }
        if (props.flash?.error) {
            alert(props.flash.error);
        }
    }, [props.flash]);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            router.delete(`/dashboard/delete-blog/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    router.reload();
                },
                onError: (errors) => {
                    alert('Error deleting blog: ' + JSON.stringify(errors));
                }
            });
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'published':
                return <Badge className="bg-green-500">Published</Badge>;
            case 'draft':
                return <Badge variant="outline">Draft</Badge>;
            case 'archived':
                return <Badge variant="secondary">Archived</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Blog Posts" />
            
            <div className="container-fluid py-6">
                <div className="row">
                    <div className="col-12 mb-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold">Blog Posts</h1>
                                <p className="text-gray-500 mt-1">
                                    Manage all your blog posts
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search blogs..."
                                        className="pl-9 w-[250px]"
                                    />
                                </div>
                                <Button 
                                    onClick={() => router.visit('/dashboard/create-blog')}
                                    className="gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    New Blog Post
                                </Button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-12">
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Categories</TableHead>
                                        <TableHead>Published</TableHead>
                                        <TableHead className="align-middle">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {blogs.data.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                                No blog posts found. Create your first blog post!
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        blogs.data.map((blog) => (
                                            <TableRow key={blog.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        {blog.featured_image?.url && (
                                                            <img 
                                                                src={blog.featured_image.url} 
                                                                alt={blog.title}
                                                                className="w-10 h-10 object-cover rounded"
                                                            />
                                                        )}
                                                        <div>
                                                            <div className="font-medium">{blog.title}</div>
                                                            <div className="text-sm text-gray-500">{blog.slug}</div>
                                                        </div>
                                                        {blog.is_featured && (
                                                            <Badge className="ml-2 bg-yellow-500">Featured</Badge>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {blog.categories.slice(0, 2).map(cat => (
                                                            <Badge key={cat.id} variant="outline">
                                                                {cat.name}
                                                            </Badge>
                                                        ))}
                                                        {blog.categories.length > 2 && (
                                                            <Badge variant="secondary">
                                                                +{blog.categories.length - 2}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{formatDate(blog.created_at)}</TableCell>
                                                <TableCell>
                                                    <div className="flex justify-center gap-2">
                                                        {/* <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            className="h-8 px-3 gap-1"
                                                            onClick={() => router.visit(`/blog/${blog.slug}`)}
                                                        >
                                                            <Eye className="h-3 w-3" />
                                                            View
                                                        </Button> */}
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            className="h-8 px-3 gap-1"
                                                            onClick={() => router.visit(`/dashboard/edit-blog/${blog.id}`)}
                                                        >
                                                            <Edit className="h-3 w-3" />
                                                            Edit
                                                        </Button>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            className="h-8 px-3 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() => handleDelete(blog.id)}
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
                        
                        {/* Pagination */}
                        {blogs.meta && blogs.meta.links && blogs.meta.links.length > 3 && (
                            <div className="mt-4 flex justify-center">
                                <nav className="flex items-center space-x-2">
                                    {blogs.meta.links.map((link: any, index: number) => (
                                        <button
                                            key={index}
                                            onClick={() => link.url && router.visit(link.url)}
                                            disabled={!link.url || link.active}
                                            className={`px-3 py-1 rounded ${
                                                link.active
                                                    ? 'bg-blue-500 text-white'
                                                    : link.url
                                                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}