import { useState } from 'react';
import { CreateEditForm } from '@/components/common/create-edit-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
 
    const [authorName, setAuthorName] = useState('');
    const [authorDescription, setAuthorDescription] = useState('');

    const handleSubmit = (formData: FormData) => {
      
        formData.append('author-name', authorName);
        formData.append('author-description', authorDescription);
        
         console.log('Blog form data:', Object.fromEntries(formData.entries()));
        
         const status = formData.get('status');
        alert(`Blog post ${status === 'draft' ? 'saved as draft' : 'published successfully'}!`);
    };

    return (
        <CreateEditForm
            title="Create New Blog Post"
            breadcrumbs={breadcrumbs}
            type="blog"
            initialCategories={blogCategories}
            initialTags={blogTags}
            onSubmit={handleSubmit}
        >
            {/* Portfolio-specific fields */}
            <div className="space-y-4">
                <div>
                    <Label htmlFor="author-name">Author Name</Label>
                    <Input
                        id="author-name"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="Enter Author Name"
                    />
                </div>

                
                <div>
                    <Label htmlFor="author-description">Author Description</Label>
                    <Textarea
                        id="author-description"
                        value={authorDescription}
                        onChange={(e) => setAuthorDescription(e.target.value)}
                        placeholder="Enter Author Description"
                        rows={6}
                    />
                </div>
            </div>
        </CreateEditForm>  
    );
}

