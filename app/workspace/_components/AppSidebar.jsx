'use client'

import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { BookIcon, BrainIcon, CompassIcon, LayoutDashboard, PencilRulerIcon, UserCircle2Icon, WalletCardsIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SideBarOptions = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        path: '/workspace',
    },
    {
        title: 'My Learning',
        icon: BookIcon,
        path: '/workspace/my-courses',
    },
    {
        title: 'Explore Courses',
        icon: CompassIcon,
        path: '/workspace/explore',
    },
    {
        title: 'AI Tools',
        icon: PencilRulerIcon,
        path: '/workspace/ai-tools',
    },
    {
        title: 'Billing',
        icon: WalletCardsIcon,
        path: '/workspace/billing',
    },
    {
        title: 'Profile',
        icon: UserCircle2Icon,
        path: '/workspace/profile',
    },


]

function AppSidebar() {

const path = usePathname()

    return (
        <Sidebar>
            <SidebarHeader className={'p-4'}>
                <div><h2 className="flex items-center text-3xl font-bold"><BrainIcon />LearnAI</h2></div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup >
                    <Button>Create New Course</Button>

                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SideBarOptions.map((item, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton asChild className={'p-5'}>
                                        <Link className={`text-[17px] ${path.includes(item.path)&&'font-bold'}`} href={item.path}>
                                            <item.icon className="h-7 w-7"/>
                                            <span>
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
export default AppSidebar