"use client";
/* eslint-disable @next/next/no-img-element */
import { Fragment } from "react";
import { Menu, Disclosure, Transition } from "@headlessui/react";
import { FaBars, FaRegBell, FaRegWindowClose } from "react-icons/fa";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";
import { UserButton } from "@/Components/auth/user-button";

interface NavigationItem {
  name: string;
  href?: string;
  current: boolean;
}

interface UserNavigationItem {
  name: string;
  href: string;
  onClick?: () => void;
}

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Team", href: "/", current: false },
  { name: "User", href: "/dashboard/user", current: false },
  { name: "Reports", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DefaultLayout = () => {
  const handleSignOutClick = () => {
    logout();
  };
  const userNavigation: UserNavigationItem[] = [
    { name: "Your Profile", href: "/settings", onClick: () => {} },
    { name: "Settings", href: "/settings", onClick: () => {} },
    { name: "Sign out", href: "", onClick: handleSignOutClick },
  ];
  const user = useCurrentUser();

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-300 text-black">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between ">
                  <div className="flex items-center justify-between gap-28">
                    <div className=" flex-shrink-0  ">
                      <Link href="/">
                        <img
                          src="../../assets/jb.svg"
                          alt="logo"
                          className=" h-16 w-16 m-auto"
                        />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-blue-300 text-black"
                                : "text-black hover:bg-primary-green hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}>
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="relative rounded-full bg-green-800 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <FaRegBell className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <div className="relative ml-3">
                        <UserButton />
                      </div>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-600 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <FaRegWindowClose
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <FaBars className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-white text-black"
                          : "text-gray-800 hover:bg-primary-green hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}>
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user?.image}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-gray-800">
                        {user?.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-600">
                        {user?.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <FaRegBell className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-slate-700 hover:text-black">
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
};

export default DefaultLayout;
