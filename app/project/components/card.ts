import React from "react";

export interface Card {
    title: string;
    description: string;
    image: string;
    link: string;
    language: {
        name: string;
        icon: React.ElementType;
    }[];
    tools: {
        name: string;
        icon: React.ElementType;
    }[];
    features: {
        name: string;
        icon: React.ElementType;
    }[];
    challenges: {
        name: string;
        icon: React.ElementType;
    }[];
    results: {
        name: string;
        icon: React.ElementType;
    }[];
}