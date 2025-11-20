"use client"

import ProjectCard from "./project-card";
import { projects } from "./projects-data";

export default function ProjectMain() {
    return (
        <div className="max-w-6xl mx-auto">
            <div>
                <h1 className="text-2xl max-w-6xl font-bold text-green-500">Projects</h1>
                <p className="text-yellow-500">this is a list of my projects</p>
            </div>
           <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {projects.map((project, index) => (
                <ProjectCard key={index} card={project} />
            ))}
           </article>
        </div>
    );
}