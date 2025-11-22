"use client"

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import RightSide from "./components/rigth-side";
export default function HomePage() {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
    const heroSubtitleRef = useRef<HTMLParagraphElement | null>(null);
    const socialRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const splitIntoWordSpans = (el: HTMLElement | null) => {
            if (!el) return [] as HTMLElement[];
            const text = el.textContent || "";
            const words = text.split(/(\s+)/); // keep spaces
            el.textContent = "";
            const spans: HTMLElement[] = [];
            for (const part of words) {
                const span = document.createElement("span");
                span.textContent = part;
                span.style.display = part.trim() ? "inline-block" : "inline";
                if (part.trim()) span.classList.add("pop-word");
                el.appendChild(span);
                if (part.trim()) spans.push(span);
            }
            return spans;
        };

        const ctx = gsap.context(() => {
            // Image subtle reveal
            gsap.from(".hero-img", {
                opacity: 0,
                scale: 0.85,
                duration: 0.7,
                ease: "power3.out",
            });

            // Build pop-out words for title and subtitle
            const titleWords = splitIntoWordSpans(heroTitleRef.current);
            const subtitleWords = splitIntoWordSpans(heroSubtitleRef.current);
            const timeline = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });
            timeline
                .from(titleWords, {
                    opacity: 0,
                    y: 16,
                    scale: 0.8,
                    stagger: 0.035,
                    duration: 0.6,
                }, "+=0.1")
                .from(subtitleWords, {
                    opacity: 0,
                    y: 12,
                    scale: 0.9,
                    stagger: 0.02,
                    duration: 0.5,
                }, "-=0.2");

            // Social icons drop-in one by one
            if (socialRef.current) {
                const icons = socialRef.current.querySelectorAll(".social-icon");
                gsap.fromTo(
                    icons,
                    { opacity: 0, y: -40, rotate: -5 },
                    { opacity: 1, y: 0, rotate: 0, duration: 0.6, ease: "bounce.out", stagger: 0.15, delay: 0.1 }
                );
            }
        }, heroRef);
        return () => ctx.revert();
    }, []);
    return (
        <div className="flex-row justify-between md:justify-center items-center md:flex min-h-screen mt-42 max-w-6xl mx-auto">
            <div className="w-full ustify-start md:[80%]  max-w-2xl gap-3 px-16 mx-auto">
            <div className="relative border border-amber-400 group-hover:border-amber-500 shadow-2xl shadow-green-700 h-[200px] rounded-full w-[200px] group">
                        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-full ">
                            <div className="absolute inset-0 rounded-full bg-[conic-gradient(var(--tw-gradient-stops))] from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 animate-[spin_2.5s_linear_infinite] [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] mask-exclude p-[2px] transition-opacity"></div>
                        </div>
                        <Image src="/image.png" alt="home" width={200} height={200} className=" rounded-full  cursor-pointer hero-img grayscale group-hover:grayscale-0 group-hover:brightness-110 transition duration-300 relative z-10" />
                    </div>
                <div ref={heroRef} className="flex justify-center rounded-full  items-center gap-3">
                    
                    <div>
                        <h1 ref={heroTitleRef} className="text-xl font-bold hero-title"><span className="text-blue-500">Hi ! </span><span className="text-red-500">TRY CHHANUN</span> IS MY NAME   
                        </h1>
                        <p ref={heroSubtitleRef} className="text-gray-500 hero-subtitle">I'm a web developer  
                              <span> i passionate about web development and i love to code . News learn new things and improve my skills .</span>
                        </p>
                    </div>
                </div>
                <div ref={socialRef} className="flex items-start justify-start gap-3 pt-7">
                    <Link href="#" target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-transform hover:scale-105">
                        <Github className="social-icon h-10 w-10 rounded-full bg-zinc-200 p-2 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" />
                    </Link>
                    <Link href="#" target="_blank" rel="noreferrer" aria-label="Facebook" className="transition-transform hover:scale-105">
                        <Facebook className="social-icon h-10 w-10 rounded-full bg-zinc-200 p-2 text-zinc-900 dark:bg-blue-800 dark:text-zinc-100" />
                    </Link>
                    <Link href="#" target="_blank" rel="noreferrer" aria-label="Instagram" className="transition-transform hover:scale-105">
                        <Instagram className="social-icon h-10 w-10 rounded-full bg-zinc-200 p-2 text-zinc-900 dark:bg-pink-800 dark:text-zinc-100" />
                    </Link>
                    <Link href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-transform hover:scale-105">
                        <Linkedin className="social-icon h-10 w-10 rounded-full bg-zinc-200 p-2 text-zinc-900 dark:bg-blue-500 dark:text-zinc-100" />
                    </Link>
                </div>
            </div>
            <div className="md:hidden text-center mt-10 mb-10 text-gray-500">
                Stack 
                </div>
            <RightSide />
        </div>
    )
}   