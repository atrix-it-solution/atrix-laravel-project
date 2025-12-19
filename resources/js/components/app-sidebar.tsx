import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid,FileText,Plus } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Blog',
        href: "#",
        icon: FileText,
        items: [
            {
                title: 'All Blog',
                href: "/dashboard/allblog",
                // icon: FileText,
            },
            {
                title: 'Create Blog',
                href: "/dashboard/create-blog",
                // icon: Plus,
            },
            {
                title: 'Categories',
                href: "/dashboard/blog-categories",
                // icon: Plus,
            },
            {
                title: 'Tags',
                href: "/dashboard/blog-tags",
                // icon: Plus,
            },
        ]
    },
    {
        title: 'Portfolio',
        href: "#",
        icon: FileText,
        items: [
            {
                title: 'All Portfolio',
                href: "/dashboard/allportfolio",
                // icon: FileText,
            },
            {
                title: 'Create Portfolio',
                href: "/dashboard/create-portfolio",
                // icon: Plus,
            },
            {
                title: 'Categories',
                href: "/dashboard/portfolio-categories",
                // icon: Plus,
            },
            {
                title: 'Tags',
                href: "/dashboard/portfolio-tags",
                // icon: Plus,
            },
        ]
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
