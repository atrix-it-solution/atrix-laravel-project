import { TagsManager, TagItem } from '@/components/tags/tags-manager';

const breadcrumbs = [
    {
        title: 'Tags',
        href: "/dashboard/tags-blog",
    },
];

// Mock data for blog tags
const initialBlogTags: TagItem[] = [
    {
        id: 1,
        name: 'Technology',
        slug: 'technology',
        description: 'All about technology and innovation',
        itemCount: 15,
        createdAt: '2024-01-15',
    },
    {
        id: 2,
        name: 'Web Development',
        slug: 'web-development',
        description: 'Frontend and backend development',
        itemCount: 8,
        createdAt: '2024-02-10',
    },
    {
        id: 3,
        name: 'React',
        slug: 'react',
        description: 'React.js framework and ecosystem',
        itemCount: 12,
        createdAt: '2024-02-15',
    },
    {
        id: 4,
        name: 'TypeScript',
        slug: 'typescript',
        description: 'Typed JavaScript at any scale',
        itemCount: 7,
        createdAt: '2024-01-25',
    },
    {
        id: 5,
        name: 'Tailwind CSS',
        slug: 'tailwind-css',
        description: 'Utility-first CSS framework',
        itemCount: 9,
        createdAt: '2024-03-01',
    },
];

export default function TagsBlog() {
    const handleTagsChange = (tags: TagItem[]) => {
        // Handle tags change (e.g., save to API)
        console.log('Blog tags updated:', tags);
    };

    return (
        <TagsManager
            title="Blog Tags"
            breadcrumbs={breadcrumbs}
            itemType="blog"
            initialTags={initialBlogTags}
            onTagsChange={handleTagsChange}
        />
    );
}