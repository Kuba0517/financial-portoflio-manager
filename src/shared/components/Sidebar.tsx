"use client";

import { useState } from "react";
import Link from "next/link";
import {cn} from "@/utils/cn";

function HomeIcon() {
    return (
        <svg className="h-6 w-6" viewBox="0 0 24 24">
            <path
                d="M3 9.75L12 3l9 6.75v9A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75v-9z"
                fill="currentColor"
            />
        </svg>
    );
}

function InfoIcon() {
    return (
        <svg className="h-6 w-6" viewBox="0 0 24 24">
            <path
                d="M12 2.25a9.75 9.75 0 110 19.5 9.75 9.75 0 010-19.5zm.75 13.5v-6h-1.5v6h1.5zm0 3v-1.5h-1.5V18h1.5z"
                fill="currentColor"
            />
        </svg>
    );
}

function ContactIcon() {
    return (
        <svg className="h-6 w-6" viewBox="0 0 24 24">
            <path
                d="M2.25 4.5A2.25 2.25 0 014.5 2.25h15a2.25 2.25 0 012.25 2.25v15a2.25 2.25 0 01-2.25 2.25h-15A2.25 2.25 0 012.25 19.5v-15zM12 13.875a3.375 3.375 0 100-6.75 3.375 3.375 0 000 6.75zm5.25 3.375v-.75a3.375 3.375 0 00-3.375-3.375h-3.75A3.375 3.375 0 006.75 16.5v.75h10.5z"
                fill="currentColor"
            />
        </svg>
    );
}

export default function Sidebar() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const [isDesktopOpen, setIsDesktopOpen] = useState(false);

    const handleMobileToggle = () => setIsMobileOpen(!isMobileOpen);
    const handleDesktopToggle = () => setIsDesktopOpen(!isDesktopOpen);

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
                        className={`h-6 w-6 transition-transform ${
                            isDesktopOpen ? "rotate-180" : ""
                        }`}
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
                        <li>
                            <Link href="/" className={cn("flex gap-2", !isDesktopOpen && "justify-center")}>
                                <HomeIcon/>
                                {isDesktopOpen && <span>Home</span>}
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className={cn("flex gap-2", !isDesktopOpen && "justify-center")}>
                                <InfoIcon/>
                                {isDesktopOpen && <span>About</span>}
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className={cn("flex gap-2", !isDesktopOpen && "justify-center")}>
                                <ContactIcon/>
                                {isDesktopOpen && <span>Contact</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
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
                                <li>
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/about">About</Link>
                                </li>
                                <li>
                                    <Link href="/contact">Contact</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
