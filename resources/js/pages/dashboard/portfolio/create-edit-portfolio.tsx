
    import { useEffect, useState } from 'react';
    import { CreateEditForm } from '@/components/common/create-edit-form';
    import AppLayout from '@/layouts/app-layout';
    import { Head, router, usePage } from '@inertiajs/react';
    import { SharedPageProps } from '@/types/page-props';
    import { BreadcrumbItem } from '@/components/categories/categories-manager';



    type Category = {
        id: number;
        name: string;
    };

    type Tag = {
        id: number;
        name: string;
    };

    interface PageProps extends SharedPageProps {
        portfolio?: {
            id: number;
            title: string;
            slug: string;
            description: string;
            content: string;
            featured_image: string | null;
            featured_image_url: string | null;
            meta_title: string;
            meta_description: string;
            status: 'draft' | 'published' | 'archived';
            is_featured: boolean;
            published_at: string | null;
            categories: number[];
            tags: number[];
            category_details?: Category[];
            tag_details?: Tag[];
        };
        categories: Category[];
        tags: Tag[];
        isEdit?: boolean;
        flash?: {
            success?: string;
            error?: string;
        };
    }

    export default function CreateEditPortfolio() {
        const { portfolio, categories, tags, isEdit, flash } = usePage<PageProps>().props;
        
            const breadcrumbs: BreadcrumbItem[] = [
                { title: 'Dashboard', href: '/dashboard' },
            {
                    title: 'Create Portfolio Item',
                    href: "/dashboard/create-portfolio",
                },
                { title: isEdit ? 'Edit Portfolio' : 'Create Portfolio', href: '#' },
            ];
    
            // portfolio-specific form state
            
        
            // Show flash messages
            useEffect(() => {
                if (flash?.success) alert(flash.success);
                if (flash?.error) alert(flash.error);
            }, [flash]);
        
            // // Log categories and tags for debugging
            // useEffect(() => {
            //     console.log('Available Categories:', props.categories);
            //     console.log('Available Tags:', props.tags);
            //     console.log('portfolio Data:', portfolio);
            // }, [props.categories, props.tags, portfolio]);
        
            ;
        useEffect(() => {
            router.reload({ only: ['categories'] });
        }, []);
        
            const handleSubmit = (formData: any) => {
                // Combine formData with portfolio-specific fields
                const data = {
                    ...formData,
                    featured_image: formData.featured_image, 
                    categories: formData.categories || [], 
                    tags: formData.tags || [],
                };
                //  console.log('Final data to submit:', data);
                // console.log('Submitting data to backend:', data);
        
                if (isEdit && portfolio) {
                    router.put(`/dashboard/edit-portfolio/${portfolio.id}`, data, {
                        preserveScroll: true,
                        onSuccess: () => {
                            router.visit('/dashboard/portfolios');
                        },
                        onError: (errors) => {
                            console.error('Update errors:', errors);
                            alert('Error updating portfolio: ' + JSON.stringify(errors));
                        }
                    });
                } else {
                    router.post('/dashboard/create-portfolio', data, {
                        preserveScroll: true,
                        onSuccess: () => {
                            router.visit('/dashboard/portfolios');
                        },
                        onError: (errors) => {
                            console.error('Create errors:', errors);
                            alert('Error creating portfolio: ' + JSON.stringify(errors));
                        }
                    });
                }
            };
        
            // If editing, prepare initial data with categories and tags
            const initialData = portfolio ? {
                title: portfolio.title,
                slug: portfolio.slug,
                description: portfolio.description,
                content: portfolio.content,
                featured_image: portfolio.featured_image
                ? Number(portfolio.featured_image)
                : null,
                featured_image_url: portfolio.featured_image_url,
                status: portfolio.status,
                categories: portfolio.categories, 
                tags: portfolio.tags, 
            } : {};

        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Portfolio " />
                <CreateEditForm
                    title="Create New Portfolio Item"
                    breadcrumbs={breadcrumbs}
                    type="portfolio"
                    initialCategories={categories}
                    initialTags={tags}
                    initialData={initialData}
                    onSubmit={handleSubmit}
                >
                
            </CreateEditForm>
            </AppLayout>

        );
    }