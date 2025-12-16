import React from 'react';
import { DataTable, Column } from '@/components/common/data-table';
import { User, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    author: string;
    category: string;
    status: 'published' | 'draft' | 'pending';
    views: number;
    createdAt: string;
    updatedAt: string;
}

interface BlogTableProps {
    posts: BlogPost[];
    sortField?: keyof BlogPost | null;
    sortDirection?: 'asc' | 'desc';
    onSort?: (field: keyof BlogPost) => void;
    onEdit?: (post: BlogPost) => void;
    onDelete?: (post: BlogPost) => void;
}

const blogColumns: Column<BlogPost>[] = [
    {
        key: 'title',
        header: 'Title',
        sortable: true,
        className: 'w-[300px]',
        render: (value, row) => (
            <div>
                <p className="font-medium">{value}</p>
                <p className="text-sm text-muted-foreground">/{row.slug}</p>
            </div>
        ),
    },
    {
        key: 'author',
        header: 'Author',
        sortable: true,
        render: (value) => (
            <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{value}</span>
            </div>
        ),
    },
    {
        key: 'category',
        header: 'Category',
        sortable: true,
        render: (value) => (
            <Badge variant="outline">
                {value}
            </Badge>
        ),
    },
    {
        key: 'createdAt',
        header: 'Created',
        sortable: true,
        render: (value) => (
            <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{value}</span>
            </div>
        ),
    },
    {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (value) => (
            <Badge 
                variant={
                    value === 'published' ? 'default' :
                    value === 'draft' ? 'secondary' : 'outline'
                }
            >
                {value.charAt(0).toUpperCase() + value.slice(1)}
            </Badge>
        ),
    },
];

export function BlogTable({
    posts,
    sortField,
    sortDirection,
    onSort,
    onEdit,
    onDelete,
}: BlogTableProps) {
    return (
        <DataTable
            data={posts}
            columns={blogColumns}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
            onEdit={onEdit}
            onDelete={onDelete}
            noDataMessage="No blog posts found"
        />
    );
}