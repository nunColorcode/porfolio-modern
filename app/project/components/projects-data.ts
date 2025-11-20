import React from "react";
import { FaCss3, FaHtml5, FaNodeJs, FaReact } from "react-icons/fa";
import { RiJavascriptFill, RiNextjsFill } from "react-icons/ri";
import { SiDjango } from "react-icons/si";
import { CheckCircle, AlertCircle, Trophy, Code, Wrench, Zap } from "lucide-react";
import { Card } from "./card";


export const projects: Card[] = [
    {
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce platform with user authentication, product management, shopping cart, and payment integration.",
        image: "/project1.jpg",
        link: "https://example.com",
        language: [
            { name: "Next.js", icon: RiNextjsFill as React.ElementType },
            { name: "React", icon: FaReact as React.ElementType },
            { name: "TypeScript", icon: Code as React.ElementType },
        ],
        tools: [
            { name: "Node.js", icon: FaNodeJs as React.ElementType },
        ],
        features: [
            { name: "User authentication and authorization", icon: CheckCircle as React.ElementType },
            { name: "Shopping cart functionality", icon: CheckCircle as React.ElementType },
            { name: "Payment gateway integration", icon: CheckCircle as React.ElementType },
            { name: "Admin dashboard", icon: CheckCircle as React.ElementType },
        ],
        challenges: [
            { name: "Handling large product catalogs", icon: AlertCircle as React.ElementType },
            { name: "Optimizing payment processing", icon: AlertCircle as React.ElementType },
        ],
        results: [
            { name: "Increased sales by 40%", icon: Trophy as React.ElementType },
            { name: "Improved page load time by 60%", icon: Zap as React.ElementType },
        ],
    },
    {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, team collaboration, and project tracking.",
        image: "/project2.jpg",
        link: "https://example.com",
        language: [
            { name: "React", icon: FaReact as React.ElementType },
            { name: "JavaScript", icon: RiJavascriptFill as React.ElementType },
            { name: "HTML5", icon: FaHtml5 as React.ElementType },
            { name: "CSS3", icon: FaCss3 as React.ElementType },
        ],
        tools: [
            { name: "Firebase", icon: Wrench as React.ElementType },
            { name: "WebSocket", icon: Zap as React.ElementType },
        ],
        features: [
            { name: "Real-time collaboration", icon: CheckCircle as React.ElementType },
            { name: "Task assignment and tracking", icon: CheckCircle as React.ElementType },
            { name: "Project timeline visualization", icon: CheckCircle as React.ElementType },
        ],
        challenges: [
            { name: "Real-time synchronization", icon: AlertCircle as React.ElementType },
            { name: "Managing concurrent updates", icon: AlertCircle as React.ElementType },
        ],
        results: [
            { name: "Improved team productivity by 50%", icon: Trophy as React.ElementType },
            { name: "Reduced task completion time", icon: Zap as React.ElementType },
        ],
    },
    {
        title: "Blog Platform",
        description: "A modern blog platform with markdown support, SEO optimization, and content management system.",
        image: "/project3.jpg",
        link: "https://example.com",
        language: [
            { name: "Next.js", icon: RiNextjsFill as React.ElementType },
            { name: "Django", icon: SiDjango as React.ElementType },
        ],
        tools: [
         
            { name: "Redis", icon: Zap as React.ElementType },
        ],
        features: [
            { name: "Markdown editor", icon: CheckCircle as React.ElementType },
            { name: "SEO optimization", icon: CheckCircle as React.ElementType },
            { name: "Comment system", icon: CheckCircle as React.ElementType },
        ],
        challenges: [
            { name: "SEO performance optimization", icon: AlertCircle as React.ElementType },
        ],
        results: [
            { name: "Increased organic traffic by 80%", icon: Trophy as React.ElementType },
        ],
    },
];

