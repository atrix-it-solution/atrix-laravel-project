import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SearchHeaderProps {
    title: string;
    subtitle?: string;
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onCreate?: () => void;
    createButtonText?: string;
    totalItems: number;
    filteredItems: number;
    searchPlaceholder?: string;
}

export function SearchHeader({
    title,
    subtitle,
    searchQuery,
    onSearchChange,
    onCreate,
    createButtonText = 'Create New',
    totalItems,
    filteredItems,
    searchPlaceholder = 'Search...',
}: SearchHeaderProps) {
    return (
        <>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    {subtitle && (
                        <p className="text-muted-foreground mt-2">{subtitle}</p>
                    )}
                </div>
                {onCreate && (
                    <Button onClick={onCreate} className="sm:self-start">
                        + {createButtonText}
                    </Button>
                )}
            </div>

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        type="search"
                        placeholder={searchPlaceholder}
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                        Showing {filteredItems} of {totalItems}
                    </Badge>
                    {searchQuery && (
                        <span className="text-sm text-blue-600">
                            ({filteredItems} results for "{searchQuery}")
                        </span>
                    )}
                </div>
            </div>
        </>
    );
}