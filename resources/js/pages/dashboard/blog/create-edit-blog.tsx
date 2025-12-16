import { useState } from 'react';
import { CreateEditForm } from '@/components/common/create-edit-form';

const breadcrumbs = [
    {
        title: 'Create Blog Post',
        href: "/dashboard/create-blog",
    },
];

// Mock data for blog categories and tags
const blogCategories = [
    { id: 1, name: 'Tutorial' },
    { id: 2, name: 'Development' },
    { id: 3, name: 'Design' },
    { id: 4, name: 'API' },
    { id: 5, name: 'Security' },
    { id: 6, name: 'Performance' },
    { id: 7, name: 'Best Practices' },
    { id: 8, name: 'Case Studies' },
];

const blogTags = [
    { id: 1, name: 'Laravel' },
    { id: 2, name: 'React' },
    { id: 3, name: 'TypeScript' },
    { id: 4, name: 'Tailwind CSS' },
    { id: 5, name: 'JavaScript' },
    { id: 6, name: 'Node.js' },
    { id: 7, name: 'Vue.js' },
    { id: 8, name: 'CSS' },
    { id: 9, name: 'HTML' },
    { id: 10, name: 'API Design' },
    { id: 11, name: 'Database' },
    { id: 12, name: 'Authentication' },
];

export default function CreateEditBlog() {
    const handleSubmit = (formData: FormData) => {
        // Handle form submission for blog
        console.log('Blog form data:', Object.fromEntries(formData.entries()));
        
        // Show success message
        const status = formData.get('status');
        alert(`Blog post ${status === 'draft' ? 'saved as draft' : 'published successfully'}!`);
        
        // In a real app, you would send this to your API
        // Example: axios.post('/api/blogs', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    };

    return (
        <CreateEditForm
            title="Create New Blog Post"
            breadcrumbs={breadcrumbs}
            type="blog"
            initialCategories={blogCategories}
            initialTags={blogTags}
            onSubmit={handleSubmit}
        />
    );
}

