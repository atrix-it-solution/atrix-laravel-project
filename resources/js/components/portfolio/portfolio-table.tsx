import React from 'react';
import { DataTable, Column } from '@/components/common/data-table';
import { Calendar, Image } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface PortfolioItem {
    id: number;
    title: string;
    slug: string;
    client: string;
    category: string;
    status: 'published' | 'draft' | 'archived';
    featured: boolean;
    createdAt: string;
    updatedAt: string;
}

interface PortfolioTableProps {
    items: PortfolioItem[];
    sortField?: keyof PortfolioItem | null;
    sortDirection?: 'asc' | 'desc';
    onSort?: (field: keyof PortfolioItem) => void;
    onEdit?: (item: PortfolioItem) => void;
    onDelete?: (item: PortfolioItem) => void;
}

const portfolioColumns: Column<PortfolioItem>[] = [
    {
        key: 'title',
        header: 'Title',
        sortable: true,
        className: 'w-[250px]',
        render: (value, row) => (
            <div>
                <p className="font-medium">{value}</p>
                {row.featured && (
                    <Badge variant="default" className="mt-1">
                        Featured
                    </Badge>
                )}
            </div>
        ),
    },
    {
        key: 'client',
        header: 'Client',
        sortable: true,
        render: (value) => (
            <div className="flex items-center gap-2">
                <Image className="h-4 w-4 text-muted-foreground" />
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
];

export function PortfolioTable({
    items,
    sortField,
    sortDirection,
    onSort,
    onEdit,
    onDelete,
}: PortfolioTableProps) {
    return (
        <DataTable
            data={items}
            columns={portfolioColumns}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={onSort}
            onEdit={onEdit}
            onDelete={onDelete}
            noDataMessage="No portfolio items found"
        />
    );
}