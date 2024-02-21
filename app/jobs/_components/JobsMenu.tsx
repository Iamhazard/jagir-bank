"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";


import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";


const components: { title: string; href: string; description: string }[] = [
    {
        title: "Ways to Earn Money",
        href: "/",
        description: "Learn Why JagirBank has the right opportunities for you",
    },
    {
        title: "Find work for your Skills",
        href: "/",
        description: "Explore the kind of work available in your field",
    },
];

export function JobsMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Find Work</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="col gap-2  md:w-[150px] lg:w-[200px] lg:grid-cols-[.75fr_1fr]">

                            <ListItem href="/" title="Find work" />

                            <ListItem href="" title=" Yours Network" />


                            <ListItem href="/" title="Saved Jobs" />



                            <ListItem
                                href="/"
                                title="Proposal" />


                            <ListItem
                                href="/"
                                title="Profile" />

                            <ListItem
                                href="/"
                                title=" My Stats" />


                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Find Talent</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="col gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">

                            <ListItem href="/" title="Logo Design">
                                Find Logo designing Posts!
                            </ListItem>
                            <ListItem href="" title="Articles & blog posts">
                                Post Articles & blog posts .
                            </ListItem>
                            <ListItem href="/docs/primitives/typography" title="SEO">
                                Find a job related to SEO.
                            </ListItem>

                            <ListItem
                                href="/"
                                title="Web Development">
                                Freelancer can search new web development jobs and Client can
                                posts a jobs.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Find Work</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}>
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Why JagirBank
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/users" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Messages
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}>
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
