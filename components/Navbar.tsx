/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mod-toggle";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "/home", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/projects", label: "Projects" },
        { href: "/blog", label: "Blog" },
    ];

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname?.startsWith(href);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur supports-backdrop-filter:bg-black/60 shadow">
            <nav className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2">
                      
                        <span className="text-xl font-bold">Portfolio</span>
                    </Link>

                    {/* Desktop nav */}
                    <ul className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`transition-colors hover:text-blue-600 ${isActive(link.href) ? "text-blue-600 font-medium" : "text-gray-700"}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Contact CTA - desktop */}
                    <div className="hidden md:flex gap-2">
                    <ModeToggle />
                        <Link
                            href="/contact"
                            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Mobile menu toggle */}
                    <button
                        type="button"
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((v) => !v)}
                        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden mt-3 border-t border-gray-200 pt-3">
                        <ul className="flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block w-full rounded-md px-2 py-2 transition-colors hover:bg-gray-100 ${isActive(link.href) ? "text-blue-600 font-medium" : "text-gray-700"}`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <ModeToggle />
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    onClick={() => setIsOpen(false)}
                                    className="block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-white hover:bg-blue-700 transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}