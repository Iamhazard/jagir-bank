"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../Components/ui/navigation-menu";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

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

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Find Talent</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-4 gap-4">
                <div>
                  <NavigationMenuLink asChild>
                    <Card>
                      <CardHeader>
                        <CardTitle>Search jobs</CardTitle>
                        <CardDescription>
                          Learn about working with talent or explore your
                          specific hiring needs.
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </NavigationMenuLink>
                </div>
                <div className="mt-2">
                  <NavigationMenuLink asChild>
                    <Card>
                      <CardHeader>
                        <CardTitle>Browse jobs</CardTitle>
                        <CardDescription>
                          Browse and buy projects that have a clear scope and
                          price.
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </NavigationMenuLink>
                </div>
              </li>
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
