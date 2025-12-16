import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    
    // Initialize expanded items based on current active page
    useEffect(() => {
        const currentlyExpanded: string[] = [];
        
        const findAndExpandParent = (navItems: NavItem[]) => {
            navItems.forEach(item => {
                if (item.items && item.items.length > 0) {
                    // Check if any child is active
                    const hasActiveChild = item.items.some(child => 
                        page.url === resolveUrl(child.href) || 
                        page.url.startsWith(resolveUrl(child.href))
                    );
                    
                    if (hasActiveChild) {
                        currentlyExpanded.push(item.title);
                    }
                    
                    // Recursively check nested items
                    findAndExpandParent(item.items);
                }
            });
        };
        
        findAndExpandParent(items);
        setExpandedItems(currentlyExpanded);
    }, [page.url, items]);
    
    const toggleItem = (title: string) => {
        setExpandedItems(prev => 
            prev.includes(title) 
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };
    
    // Check if item is exactly active (for Dashboard)
    const isExactlyActive = (href: string): boolean => {
        const resolvedUrl = resolveUrl(href);
        
        // For Dashboard, check exact match
        if (href === '/dashboard') {
            return page.url === resolvedUrl || 
                   page.url === resolvedUrl + '/' ||
                   page.url.replace(/\/$/, '') === resolvedUrl.replace(/\/$/, '');
        }
        
        // For other pages
        return page.url === resolvedUrl || 
               page.url.startsWith(resolvedUrl + '/');
    };
    
    // Check if item or any of its children is active
    const isItemActive = (item: NavItem): boolean => {
        const resolvedUrl = resolveUrl(item.href);
        
        // Check if this is the current page
        const isCurrentPage = () => {
            // For Dashboard, we need exact match
            if (item.title === 'Dashboard') {
                return page.url === resolvedUrl || 
                    page.url === resolvedUrl + '/' ||
                    page.url.replace(/\/$/, '') === resolvedUrl.replace(/\/$/, '');
            }
            
            // For other pages
            return page.url === resolvedUrl || 
                page.url.startsWith(resolvedUrl + '/');
        };
        
        if (isCurrentPage()) {
            return true;
        }
        
        if (item.items) {
            return item.items.some(child => isItemActive(child));
        }
        
        return false;
    };
    
    const renderNavItem = (item: NavItem) => {
        const hasChildren = item.items && item.items.length > 0;
        const isExpanded = expandedItems.includes(item.title);
        const isActive = isItemActive(item);
        
        return (
            <SidebarMenuItem key={item.title}>
                {hasChildren ? (
                    <>
                        <SidebarMenuButton
                            onClick={() => toggleItem(item.title)}
                            className="w-full justify-between"
                            data-active={isActive}
                            data-state={isExpanded ? "open" : "closed"}
                        >
                            <div className="flex items-center gap-2">
                                {item.icon && <item.icon size={16} />}
                                <span>{item.title}</span>
                            </div>
                            <ChevronRight 
                                className={`h-4 w-4 transition-transform duration-200 ${
                                    isExpanded ? 'rotate-90' : ''
                                }`} 
                            />
                        </SidebarMenuButton>
                        
                        {isExpanded && (
                            <SidebarMenuSub>
                                {item.items!.map((child) => {
                                    // Convert child.href to string explicitly
                                    const childHref = String(child.href);
                                    const childIsActive = isExactlyActive(childHref);
                                    
                                    return (
                                        <SidebarMenuSubItem key={child.title}>
                                            <SidebarMenuSubButton
                                                asChild
                                                data-active={childIsActive}
                                                className={`pl-6 ${
                                                    childIsActive 
                                                        ? 'bg-accent text-accent-foreground' 
                                                        : ''
                                                }`}
                                            >
                                                <Link 
                                                    href={childHref} 
                                                    prefetch
                                                    className="flex items-center gap-2 w-full"
                                                >
                                                    {child.icon && <child.icon size={14} />}
                                                    <span className="text-sm">{child.title}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    );
                                })}
                            </SidebarMenuSub>
                        )}
                    </>
                ) : (
                    <SidebarMenuButton
                        asChild
                        data-active={isActive}
                        className={`${
                            isActive 
                                ? 'bg-accent text-accent-foreground' 
                                : ''
                        }`}
                    >
                        <Link 
                            href={String(item.href)} 
                            prefetch 
                            className="flex items-center gap-2"
                        >
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                )}
            </SidebarMenuItem>
        );
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map(renderNavItem)}
            </SidebarMenu>
        </SidebarGroup>
    );
}