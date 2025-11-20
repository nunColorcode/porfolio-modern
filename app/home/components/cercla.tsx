"use client"

import React from "react";

export interface CenterIconProps {
    name: string;
    icon: React.ElementType;
    borderColor: string;
    bgColor: string;
    iconColor: string;
}

export default function CenterIcon({ name, icon: Icon, borderColor, bgColor, iconColor }: CenterIconProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div 
                className={`rounded-full transition-all duration-500 flex items-center justify-center border-4 ${borderColor} ${bgColor} shadow-xl`}
                style={{ width: '80px', height: '80px' }}
            >
                <div className="rounded-full flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
                    <Icon className={`h-10 w-10 ${iconColor} transition-all duration-500`} />
                </div>
            </div>
            <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-all duration-500">
                {name}
            </div>
        </div>
    );
}

