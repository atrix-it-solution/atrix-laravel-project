import React, { useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Calendar, User } from 'lucide-react';
import { ArrowUpDown, ChevronUp, ChevronDown } from 'lucide-react';

export type SortDirection = 'asc' | 'desc';

export interface Column<T> {
    key: keyof T;
    header: string;
    render?: (value: any, row: T) => React.ReactNode;
    sortable?: boolean;
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    sortField?: keyof T | null;
    sortDirection?: SortDirection;
    onSort?: (field: keyof T) => void;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    noDataMessage?: string;
}

export function DataTable<T extends { id: number | string }>({
    data,
    columns,
    sortField,
    sortDirection = 'asc',
    onSort,
    onEdit,
    onDelete,
    noDataMessage = 'No data found',
}: DataTableProps<T>) {
    
    const renderSortIcon = (field: keyof T) => {
        if (sortField !== field) {
            return <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />;
        }
        return sortDirection === 'asc' ? 
            <ChevronUp className="ml-2 h-4 w-4" /> : 
            <ChevronDown className="ml-2 h-4 w-4" />;
    };

    return (
        <div className="border rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead 
                                key={String(column.key)}
                                className={`${column.className || ''} ${column.sortable ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
                                onClick={() => column.sortable && onSort?.(column.key)}
                            >
                                <div className="flex items-center">
                                    {column.header}
                                    {column.sortable && renderSortIcon(column.key)}
                                </div>
                            </TableHead>
                        ))}
                        {(onEdit || onDelete) && (
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell 
                                colSpan={columns.length + ((onEdit || onDelete) ? 1 : 0)} 
                                className="text-center py-8 text-gray-500"
                            >
                                {noDataMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => (
                                    <TableCell key={String(column.key)}>
                                        {column.render 
                                            ? column.render(item[column.key], item)
                                            : String(item[column.key])
                                        }
                                    </TableCell>
                                ))}
                                {(onEdit || onDelete) && (
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            {onEdit && (
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    className="h-8 px-3 gap-1"
                                                    onClick={() => onEdit(item)}
                                                >
                                                    <Edit className="h-3 w-3" />
                                                    Edit
                                                </Button>
                                            )}
                                            {onDelete && (
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    className="h-8 px-3 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => onDelete(item)}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                    Delete
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}