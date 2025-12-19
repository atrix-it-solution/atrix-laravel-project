
import { useState } from 'react';
import { CreateEditForm } from '@/components/common/create-edit-form';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const breadcrumbs = [
    {
        title: 'Create Portfolio Item',
        href: "/dashboard/create-portfolio",
    },
];

// Mock data for portfolio categories and tags
const portfolioCategories = [
    { id: 1, name: 'Web Development' },
    { id: 2, name: 'Mobile Apps' },
    { id: 3, name: 'UI/UX Design' },
    { id: 4, name: 'E-commerce' },
    { id: 5, name: 'Branding' },
    { id: 6, name: 'Logo Design' },
    { id: 7, name: 'Graphic Design' },
    { id: 8, name: 'Digital Marketing' },
];

const portfolioTags = [
    { id: 1, name: 'React' },
    { id: 2, name: 'Laravel' },
    { id: 3, name: 'Vue.js' },
    { id: 4, name: 'Next.js' },
    { id: 5, name: 'Tailwind CSS' },
    { id: 6, name: 'Figma' },
    { id: 7, name: 'Adobe XD' },
    { id: 8, name: 'Photoshop' },
    { id: 9, name: 'Illustrator' },
    { id: 10, name: 'Responsive Design' },
    { id: 11, name: 'SEO' },
    { id: 12, name: 'Performance' },
];

export default function CreateEditPortfolio() {
    const [projectUrl, setProjectUrl] = useState('');
    const [clientName, setClientName] = useState('');
    const [projectDate, setProjectDate] = useState('');

    const handleSubmit = (formData: FormData) => {
        // Add portfolio-specific fields
        formData.append('project_url', projectUrl);
        formData.append('client_name', clientName);
        formData.append('project_date', projectDate);
        
        console.log('Portfolio form data:', Object.fromEntries(formData.entries()));
        
        const status = formData.get('status');
        alert(`Portfolio item ${status === 'draft' ? 'saved as draft' : 'published successfully'}!`);
    };

    return (
        <CreateEditForm
            title="Create New Portfolio Item"
            breadcrumbs={breadcrumbs}
            type="portfolio"
            initialCategories={portfolioCategories}
            initialTags={portfolioTags}
            onSubmit={handleSubmit}
        >
            
        </CreateEditForm>
    );
}