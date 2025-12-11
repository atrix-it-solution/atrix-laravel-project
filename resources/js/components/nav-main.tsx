import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    
    const toggleItem = (title: string) => {
        setExpandedItems(prev => 
            prev.includes(title) 
                ? prev.filter(t => t !== title)
                : [...prev, title]
        );
    };
    
    const renderNavItem = (item: NavItem) => {
        const hasChildren = item.items && item.items.length > 0;
        const isExpanded = expandedItems.includes(item.title);
        
        return (
            <SidebarMenuItem key={item.title}>
                {hasChildren ? (
                    <div>
                        <SidebarMenuButton
                            onClick={() => toggleItem(item.title)}
                            className="w-full justify-between"
                        >
                            <div className="flex items-center gap-2">
                                {item.icon && <item.icon size={16} />}
                                <span>{item.title}</span>
                            </div>
                            <ChevronRight 
                                className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
                            />
                        </SidebarMenuButton>
                        
                        {isExpanded && (
                            <div className="ml-4 mt-1 border-l border-border pl-2">
                                <SidebarMenu>
                                    {item.items!.map((child) => (
                                        <SidebarMenuItem key={child.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={page.url.startsWith(
                                                    resolveUrl(child.href),
                                                )}
                                                tooltip={{ children: child.title }}
                                                className="pl-2"
                                            >
                                                <Link href={child.href} prefetch>
                                                    {child.icon && <child.icon size={14} />}
                                                    <span className="text-sm">{child.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </div>
                        )}
                    </div>
                ) : (
                    // For regular items without children
                    <SidebarMenuButton
                        asChild
                        isActive={page.url.startsWith(
                            resolveUrl(item.href),
                        )}
                        tooltip={{ children: item.title }}
                    >
                        <Link href={item.href} prefetch>
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