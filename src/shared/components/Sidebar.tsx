"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Button from "@/shared/components/Button";
import { IoMdHome } from "react-icons/io";
import { FaMoneyBillWave } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useSession, signOut } from "next-auth/react";

export default function Sidebar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDesktopOpen, setIsDesktopOpen] = useState(false);

    const { data: session, status } = useSession();

    const handleMobileToggle = () => setIsMobileOpen(!isMobileOpen);
    const handleDesktopToggle = () => setIsDesktopOpen(!isDesktopOpen);

    const handleSignOut = () => {
        signOut({ callbackUrl: "/" });
    };

    const navLinks = [
        {
            href: "/",
            label: "Home",
            icon: <IoMdHome className="text-mainGreen-200 text-2xl" />,
            requiresAuth: false,
        },
        {
            href: "/portfolios",
            label: "All Portfolios",
            icon: <FaMoneyBillWave className="text-mainGreen-200 text-2xl" />,
            requiresAuth: false,
        },
        {
            href: "/profile",
            label: "My Profile",
            icon: <CgProfile className="text-mainGreen-200 text-2xl"/>,
            requiresAuth: true,
        }
    ];

    if (status === "loading") {
        return null;
    }

    return (
        <>
            <div className="md:hidden bg-mainGreen-500 text-white flex items-center p-4">
                <button onClick={handleMobileToggle} aria-label="Open menu" className="mr-2">
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path d="M4 5h16M4 12h16M4 19h16" />
                    </svg>
                </button>
                <h1 className="text-xl font-bold">My Brand</h1>
            </div>

            <div
                className={`
          hidden md:flex md:flex-col 
          bg-mainGreen-600 text-white
          transition-all duration-300
          ${isDesktopOpen ? "md:w-64 p-4" : "md:w-16 p-2"}
        `}
            >
                <button
                    onClick={handleDesktopToggle}
                    aria-label="Toggle sidebar"
                    className="mb-4 flex items-center justify-center"
                >
                    <svg
                        className={`h-6 w-6 transition-transform ${isDesktopOpen ? "rotate-180" : ""}`}
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                        />
                    </svg>
                </button>

                {isDesktopOpen && <h2 className="text-2xl font-bold mb-6">My Brand</h2>}
                <nav className="flex-1">
                    <ul className="space-y-4">
                        {navLinks
                            .filter(({ requiresAuth }) => !requiresAuth || status === "authenticated")
                            .map(({ href, label, icon }) => (
                                <li key={href}>
                                    <Link href={href} className={cn("flex gap-2", !isDesktopOpen && "justify-center")}>
                                        {icon}
                                        {isDesktopOpen && <span>{label}</span>}
                                    </Link>
                                </li>
                            ))}
                        {isDesktopOpen && status === "unauthenticated" && (
                            <Link href="/auth/signin">
                                <Button label="Login" />
                            </Link>
                        )}
                        {isDesktopOpen && status === "authenticated" && (
                            <>
                                <h1>Hello {session?.user?.name}</h1>
                                <Button label="Sign Out" onClick={handleSignOut} />
                            </>
                        )}
                    </ul>
                </nav>
            </div>

            {/* Menu mobilne */}
            {isMobileOpen && (
                <div
                    className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
                    onClick={handleMobileToggle}
                    aria-hidden="true"
                >
                    <div
                        className="absolute top-0 left-0 w-64 h-full bg-mainGreen-600 text-white p-4"
                        onClick={(e) => e.stopPropagation()}
                        aria-hidden="true"
                    >
                        <button onClick={handleMobileToggle} aria-label="Close menu" className="mb-4 flex items-center">
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="ml-2">Close</span>
                        </button>
                        <nav>
                            <ul className="space-y-4">
                                {navLinks
                                    .filter(({ requiresAuth }) => !requiresAuth || status === "authenticated")
                                    .map(({ href, label }) => (
                                        <li key={href}>
                                            <Link href={href}>{label}</Link>
                                        </li>
                                    ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
