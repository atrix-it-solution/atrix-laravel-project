import { TagsManager, TagItem } from '@/components/tags/tags-manager';

const breadcrumbs = [
    {
        title: 'Tags Portfolio',
        href: "/dashboard/tags-portfolio",
    },
];

// Mock data for portfolio tags
const initialPortfolioTags: TagItem[] = [
    {
        id: 1,
        name: 'Web Development',
        slug: 'web-development',
        description: 'Websites and web applications',
        itemCount: 8,
        createdAt: '2024-01-15',
    },
    {
        id: 2,
        name: 'E-commerce',
        slug: 'e-commerce',
        description: 'Online stores and shopping platforms',
        itemCount: 4,
        createdAt: '2024-02-10',
    },
    {
        id: 3,
        name: 'Mobile Apps',
        slug: 'mobile-apps',
        description: 'iOS and Android applications',
        itemCount: 6,
        createdAt: '2024-02-15',
    },
    {
        id: 4,
        name: 'UI/UX Design',
        slug: 'ui-ux-design',
        description: 'User interface and experience design',
        itemCount: 10,
        createdAt: '2024-01-25',
    },
    {
        id: 5,
        name: 'Branding',
        slug: 'branding',
        description: 'Logo and brand identity design',
        itemCount: 5,
        createdAt: '2024-03-01',
    },
    {
        id: 6,
        name: 'React',
        slug: 'react',
        description: 'React.js projects',
        itemCount: 7,
        createdAt: '2024-02-20',
    },
    {
        id: 7,
        name: 'Laravel',
        slug: 'laravel',
        description: 'Laravel backend projects',
        itemCount: 5,
        createdAt: '2024-02-25',
    },
];

export default function TagsPortfolio() {
    const handleTagsChange = (tags: TagItem[]) => {
        // Handle tags change (e.g., save to API)
        console.log('Portfolio tags updated:', tags);
    };

    return (
        <TagsManager
            title="Portfolio Tags"
            breadcrumbs={breadcrumbs}
            itemType="portfolio"
            initialTags={initialPortfolioTags}
            onTagsChange={handleTagsChange}
        />
    );
}