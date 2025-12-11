import React, { useEffect, useRef } from 'react';
import { Grid } from 'gridjs';
import 'gridjs/dist/theme/mermaid.css';

interface GridTableProps {
    columns: any[];
    data: any[];
    search?: boolean;
    pagination?: boolean | { limit: number };
    sort?: boolean;
    className?: string;
}

export function GridTable({
    columns,
    data,
    search = true,
    pagination = true,
    sort = true,
    className = ''
}: GridTableProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<Grid | null>(null);

    useEffect(() => {
        if (!wrapperRef.current) return;

        // Clean up previous instance
        if (gridRef.current) {
            gridRef.current.destroy();
        }

        // Create new Grid instance
        gridRef.current = new Grid({
            columns: columns,
            data: data,
            search: search,
            pagination: pagination,
            sort: sort,
            style: {
                table: {
                    width: '100%'
                }
            }
        });

        // Render the grid
        gridRef.current.render(wrapperRef.current);

        // Clean up on unmount
        return () => {
            if (gridRef.current) {
                gridRef.current.destroy();
            }
        };
    }, [columns, data, search, pagination, sort]);

    return <div ref={wrapperRef} className={className} />;
}