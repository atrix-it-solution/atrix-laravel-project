// components/common/search-input.tsx
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = "Search...",
    value,
    onChange,
    className = ""
}) => {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`pl-9 ${className}`}
            />
        </div>
    );
};

export default SearchInput;