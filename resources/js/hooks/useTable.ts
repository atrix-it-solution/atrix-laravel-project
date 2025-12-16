import { useState, useMemo } from 'react';

type SortDirection = 'asc' | 'desc';

interface UseTableProps<T> {
    initialData: T[];
    searchFields: (keyof T)[];
    defaultSortField?: keyof T;
    defaultSortDirection?: SortDirection;
}
interface Identifiable {
    id: number | string;
}

export function useTable<T extends Identifiable>({
    initialData,
    searchFields,
    defaultSortField,
    defaultSortDirection = 'asc',
}: UseTableProps<T>) {
    const [data, setData] = useState<T[]>(initialData);
    const [sortField, setSortField] = useState<keyof T | undefined>(defaultSortField);
    const [sortDirection, setSortDirection] = useState<SortDirection>(defaultSortDirection);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSort = (field: keyof T) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const filteredAndSortedData = useMemo(() => {
        let result = [...data];

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item => 
                searchFields.some(field => {
                    const value = item[field];
                    if (typeof value === 'string') {
                        return value.toLowerCase().includes(query);
                    }
                    return String(value).toLowerCase().includes(query);
                })
            );
        }

        // Apply sorting
        if (sortField) {
            result.sort((a, b) => {
                let aValue = a[sortField];
                let bValue = b[sortField];

                // Handle date comparison
                if (sortField.toString().includes('date') || sortField.toString().includes('Date') || 
                    sortField.toString().includes('created') || sortField.toString().includes('updated')) {
                    try {
                        const aDate = new Date(aValue as any).getTime();
                        const bDate = new Date(bValue as any).getTime();
                        aValue = aDate as any;
                        bValue = bDate as any;
                    } catch (e) {
                        // If date parsing fails, fall back to string comparison
                    }
                }

                // Handle string comparison
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    aValue = aValue.toLowerCase() as any;
                    bValue = bValue.toLowerCase() as any;
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
    }, [data, searchQuery, sortField, sortDirection, searchFields]);

    const addItem = (item: T) => {
        setData(prev => [...prev, item]);
    };

    const updateItem = (id: any, updates: Partial<T>) => {
        setData(prev => prev.map(item => 
            item.id === id ? { ...item, ...updates } : item
        ));
    };

    const deleteItem = (id: any) => {
        setData(prev => prev.filter(item => item.id !== id));
    };

    return {
        data,
        filteredData: filteredAndSortedData,
        sortField,
        sortDirection,
        searchQuery,
        setSearchQuery,
        handleSort,
        addItem,
        updateItem,
        deleteItem,
        setData,
    };
}