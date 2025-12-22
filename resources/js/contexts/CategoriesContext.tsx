// contexts/CategoriesContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CategoryOption } from '@/types/category'; // Import from shared types

interface CategoriesContextType {
  categories: CategoryOption[];
  setCategories: (categories: CategoryOption[]) => void;
  refreshCategories: () => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
}

interface CategoriesProviderProps {
  children: ReactNode;
  initialCategories?: CategoryOption[];
}

export function CategoriesProvider({ children, initialCategories = [] }: CategoriesProviderProps) {
  const [categories, setCategories] = useState<CategoryOption[]>(initialCategories);

  const refreshCategories = async () => {
    try {
      const response = await fetch('/api/blog-categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('Failed to refresh categories:', error);
    }
  };

  return (
    <CategoriesContext.Provider value={{ categories, setCategories, refreshCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
}