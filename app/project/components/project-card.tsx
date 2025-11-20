"use client"

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, X, Info } from "lucide-react";
import { Card } from "./card";

interface ProjectCardProps {
    card: Card;
}

export default function ProjectCard({ card }: ProjectCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsModalOpen(false);
        };
        if (isModalOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isModalOpen]);

    return (
        <>
            <article className="group relative overflow-hidden rounded-xl border-1 border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-100/20 dark:bg-zinc-900/20 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-white/5">
                {/* Project Image */}
                <div className="relative w-full h-48 overflow-hidden">
                    <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-green-600 mb-1">{card.title}</h3>
                        <Link
                            href={card.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-white/90 hover:text-white transition-colors"
                        >
                            View Project <ExternalLink className="h-3 w-3" />
                        </Link>
                    </div>
                </div>

                {/* Simple Card Content */}
                <div className="p-6">
                    <p className="text-yellow-700 dark:text-yellow-600 mb-4 line-clamp-2">
                        {card.description}
                    </p>

                    {/* Languages & Tools Combined */}
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {card.language.map((lang, index) => {
                                const Icon = lang.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-200/30 dark:bg-zinc-800/30 backdrop-blur-sm"
                                    >
                                        <Icon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                                        <span className="text-xs text-green-700 dark:text-green-300">
                                            {lang.name}
                                        </span>
                                    </div>
                                );
                            })}
                            {card.tools.map((tool, index) => {
                                const Icon = tool.icon;
                                return (
                                    <div
                                        key={`tool-${index}`}
                                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-200/30 dark:bg-zinc-800/30 backdrop-blur-sm"
                                    >
                                        <Icon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                                        <span className="text-xs text-green-700 dark:text-green-300">
                                            {tool.name}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* View Details Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-200/50 dark:bg-zinc-800/50 hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 rounded-lg transition-colors"
                    >
                        <Info className="h-4 w-4" />
                        <span>View Details</span>
                    </button>
                </div>
            </article>

            {/* Popup Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                                {card.title}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Description */}
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                    Description
                                </h3>
                                <p className="text-zinc-700 dark:text-zinc-300">
                                    {card.description}
                                </p>
                            </div>

                            {/* Languages */}
                            <div>
                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                                    Languages & Tools
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {card.language.map((lang, index) => {
                                        const Icon = lang.icon;
                                        return (
                                            <div
                                                key={index}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-200/50 dark:bg-zinc-800/50"
                                            >
                                                <Icon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                                                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                                                    {lang.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                    {card.tools.map((tool, index) => {
                                        const Icon = tool.icon;
                                        return (
                                            <div
                                                key={`tool-${index}`}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-200/50 dark:bg-zinc-800/50"
                                            >
                                                <Icon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                                                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                                                    {tool.name}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Features */}
                            {card.features.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                                        Features
                                    </h3>
                                    <ul className="space-y-2">
                                        {card.features.map((feature, index) => {
                                            const Icon = feature.icon;
                                            return (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300"
                                                >
                                                    <Icon className="h-5 w-5 shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
                                                    <span>{feature.name}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}

                            {/* Challenges */}
                            {card.challenges.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                                        Challenges
                                    </h3>
                                    <ul className="space-y-2">
                                        {card.challenges.map((challenge, index) => {
                                            const Icon = challenge.icon;
                                            return (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300"
                                                >
                                                    <Icon className="h-5 w-5 shrink-0 mt-0.5 text-orange-600 dark:text-orange-400" />
                                                    <span>{challenge.name}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}

                            {/* Results */}
                            {card.results.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                                        Results
                                    </h3>
                                    <ul className="space-y-2">
                                        {card.results.map((result, index) => {
                                            const Icon = result.icon;
                                            return (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300"
                                                >
                                                    <Icon className="h-5 w-5 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
                                                    <span>{result.name}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}

                            {/* External Link */}
                            <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                                <Link
                                    href={card.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 dark:text-zinc-900 rounded-lg transition-colors"
                                >
                                    Visit Project <ExternalLink className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}