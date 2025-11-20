"use client"

import React, { useEffect, useRef, useState } from "react";
import { RightSide as RightSideData } from "./index";
import { rotateCircle } from "./gsap-rotate";
import CenterIcon from "./cercla";

export interface RightSideProps {
    name: string;
    icon: React.ElementType;
    borderColor: string;
    bgColor: string;
    hoverBgColor: string;
    iconColor: string;
    onHover?: (isHovering: boolean) => void;
    onClick?: () => void;
    isSelected?: boolean;
}

const RightSideItem = ({ name, icon: Icon, borderColor, bgColor, hoverBgColor, iconColor, onHover, onClick, isSelected, iconSize = 56 }: RightSideProps & { iconSize?: number }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    
    return (
        <div 
            className="group relative flex items-center justify-center w-fit"
            onMouseEnter={() => {
                setIsHovered(true);
                onHover?.(true);
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                onHover?.(false);
            }}
            onClick={onClick}
        >
            <div 
                className={`rounded-full transition-all duration-300 group-hover:scale-110 cursor-pointer flex items-center justify-center border-2 sm:border-[3px] md:border-4 lg:border-4 ${borderColor} group-hover:shadow-lg group-hover:shadow-black/20 dark:group-hover:shadow-white/10 ${isSelected ? 'ring-2 ring-offset-2 ring-offset-transparent ring-zinc-400 dark:ring-zinc-600' : ''}`} 
                style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
            >
                <div 
                    className={`rounded-full transition-colors duration-300 flex items-center justify-center ${isHovered ? hoverBgColor : bgColor}`} 
                    style={{ width: '100%', height: '100%' }}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-6 lg:w-6 transition-all duration-300 group-hover:scale-110 ${iconColor}`} />
                    </div>
                </div>
            </div>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10 transform group-hover:translate-y-0 translate-y-1">
                <div className="bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs font-medium px-2 py-1 rounded whitespace-nowrap shadow-lg">
                    {name}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100"></div>
                </div>
            </div>
        </div>
    );
};

export default function RightSide() {
    const totalItems = RightSideData.length;
    const circleRef = useRef<HTMLDivElement>(null);
    const rotationAnimationRef = useRef<{ pause: () => void; resume: () => void; kill: () => void } | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [dimensions, setDimensions] = useState({ radius: 120, iconSize: 56 });
    
    useEffect(() => {
        const updateDimensions = () => {
            const width = window.innerWidth;
            if (width < 640) {
                // Mobile
                setDimensions({ radius: 80, iconSize: 40 });
            } else if (width < 768) {
                // Small tablet
                setDimensions({ radius: 100, iconSize: 48 });
            } else if (width < 1024) {
                // Tablet
                setDimensions({ radius: 110, iconSize: 52 });
            } else {
                // Desktop (lg and above) - keep original desktop values
                setDimensions({ radius: 120, iconSize: 56 });
            }
        };
        
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);
    
    useEffect(() => {
        rotationAnimationRef.current = rotateCircle(circleRef.current, 20, "clockwise");
        
        return () => {
            rotationAnimationRef.current?.kill();
        };
    }, []);
    
    const handleIconHover = (isHovering: boolean) => {
        if (rotationAnimationRef.current) {
            if (isHovering) {
                rotationAnimationRef.current.pause();
            } else {
                rotationAnimationRef.current.resume();
            }
        }
    };
    const handleIconClick = (index: number) => {
        setSelectedIndex(index);
    };
    
    const selectedItem = selectedIndex !== null ? RightSideData[selectedIndex] : null;
    const { radius, iconSize } = dimensions;
    
    return (
        <div className="w-full lg:w-1/3 px-2 sm:px-3 md:px-4 lg:px-3 lg:mx-5 h-full py-4 lg:py-0">
            <div className="h-full w-full flex items-center justify-center relative min-h-[300px] sm:min-h-[400px] lg:min-h-0">
                {/* Center icon display - outside rotating container */}
                {selectedItem && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <CenterIcon
                            name={selectedItem.name}
                            icon={selectedItem.icon}
                            borderColor={selectedItem.borderColor}
                            bgColor={selectedItem.bgColor}
                            iconColor={selectedItem.iconColor}
                        />
                    </div>
                )}
                <div 
                    ref={circleRef}
                    className="relative" 
                    style={{ 
                        width: `${radius * 2 + iconSize}px`, 
                        height: `${radius * 2 + iconSize}px`,
                        transformOrigin: 'center center'
                    }}
                >
                    {RightSideData.map((item: RightSideProps, index: number) => {
                        // Calculate angle for each icon (distributed evenly around the circle)
                        const angle = (index * 360) / totalItems - 90; // Start from top (-90 degrees)
                        const radian = (angle * Math.PI) / 180;
                        const x = Math.cos(radian) * radius;
                        const y = Math.sin(radian) * radius;
                        
                        return (
                            <div
                                key={index}
                                className="absolute"
                                style={{
                                    left: `50%`,
                                    top: `50%`,
                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                }}
                            >
                                <RightSideItem
                                    name={item.name}
                                    icon={item.icon}
                                    borderColor={item.borderColor}
                                    bgColor={item.bgColor}
                                    hoverBgColor={item.hoverBgColor}
                                    iconColor={item.iconColor}
                                    onHover={handleIconHover}
                                    onClick={() => handleIconClick(index)}
                                    isSelected={selectedIndex === index}
                                    iconSize={iconSize}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
