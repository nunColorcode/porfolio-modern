import gsap from "gsap";

export const rotateCircle = (element: HTMLElement | null, duration: number = 20, direction: "clockwise" | "counterclockwise" = "clockwise") => {
    if (!element) return null;
    
    const rotation = direction === "clockwise" ? 360 : -360;
    
    gsap.set(element, { transformOrigin: "center center" });
    
    const animation = gsap.to(element, {
        rotation: rotation,
        duration: duration,
        ease: "none",
        repeat: -1,
    });
    
    return {
        pause: () => animation.pause(),
        resume: () => animation.resume(),
        kill: () => animation.kill(),
    };
};

export const rotateCircleOnHover = (element: HTMLElement | null, hoverSpeed: number = 5, defaultSpeed: number = 20) => {
    if (!element) return;
    
    const defaultAnimation = gsap.to(element, {
        rotation: 360,
        duration: defaultSpeed,
        ease: "none",
        repeat: -1,
    });
    
    const handleMouseEnter = () => {
        defaultAnimation.kill();
        gsap.to(element, {
            rotation: `+=360`,
            duration: hoverSpeed,
            ease: "none",
            repeat: -1,
        });
    };
    
    const handleMouseLeave = () => {
        gsap.killTweensOf(element);
        rotateCircle(element, defaultSpeed);
    };
    
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
        gsap.killTweensOf(element);
    };
};

