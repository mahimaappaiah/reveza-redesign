"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
export function ImageCarouselHero({ title, subtitle, description, ctaText, onCtaClick, images, features = [], }) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [rotatingCards, setRotatingCards] = useState([]);
    // Continuous rotation animation
    useEffect(() => {
        const interval = setInterval(() => {
            setRotatingCards((prev) => prev.map((val) => (val + 0.5) % 360));
        }, 50);
        return () => clearInterval(interval);
    }, []);
    // Initialize rotating cards
    useEffect(() => {
        setRotatingCards(images.map((_, i) => i * (360 / images.length)));
    }, [images.length]);
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    };
    return (_jsxs("div", { className: "relative w-full min-h-screen bg-gradient-to-b from-[#070b15] via-[#090e1a] to-[#020617] overflow-hidden text-white font-sans flex flex-col items-center justify-center py-16", children: [_jsxs("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: [_jsx("div", { className: "absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-600/10 to-transparent rounded-full blur-3xl animate-pulse" }), _jsx("div", { className: "absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-600/10 to-transparent rounded-full blur-3xl animate-pulse" })] }), _jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto", children: [_jsx("div", { className: "relative w-full max-w-6xl h-80 sm:h-[420px] mb-8 sm:mb-12", onMouseMove: handleMouseMove, onMouseEnter: () => setIsHovering(true), onMouseLeave: () => setIsHovering(false), children: _jsx("div", { className: "absolute inset-0 flex items-center justify-center", style: { perspective: '1000px' }, children: images.map((image, index) => {
                                const angle = (rotatingCards[index] || 0) * (Math.PI / 180);
                                const radius = window.innerWidth < 640 ? 120 : 220;
                                const x = Math.cos(angle) * radius;
                                const y = Math.sin(angle) * radius * 0.35; // Flatten the circle into an ellipse for a 3D ring layout
                                // 3D perspective effect based on mouse position
                                const perspectiveX = isHovering ? (mousePosition.x - 0.5) * 15 : 0;
                                const perspectiveY = isHovering ? (mousePosition.y - 0.5) * 15 : 0;
                                // Calculate depth order (z-index) based on front/back position
                                const zIndex = Math.round((Math.sin(angle) + 1) * 100);
                                return (_jsx("div", { className: "absolute w-28 h-36 sm:w-36 sm:h-44 transition-all duration-300 ease-out", style: {
                                        transform: `
                      translate(${x}px, ${y}px)
                      rotateX(${perspectiveY}deg)
                      rotateY(${perspectiveX}deg)
                      rotateZ(${image.rotation}deg)
                      scale(${0.8 + (Math.sin(angle) + 1) * 0.15})
                    `,
                                        transformStyle: "preserve-3d",
                                        zIndex: zIndex
                                    }, children: _jsxs("div", { className: cn("relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10", "transition-all duration-300 hover:shadow-3xl hover:scale-105", "cursor-pointer group bg-slate-900"), style: {
                                            transformStyle: "preserve-3d"
                                        }, children: [_jsx("img", { src: image.src || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=60&w=900", alt: image.alt, className: "absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 pointer-events-none" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" })] }) }, image.id));
                            }) }) }), _jsxs("div", { className: "relative z-20 text-center max-w-3xl mx-auto mb-12 sm:mb-16", children: [_jsxs("div", { className: "inline-flex items-center gap-2 mb-4", children: [_jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" }), _jsx("span", { className: "text-xs font-bold text-indigo-400 uppercase tracking-widest", style: { letterSpacing: '0.12em', fontFamily: 'Outfit, sans-serif' }, children: subtitle })] }), _jsx("h1", { className: "font-extrabold text-white leading-tight tracking-tight mb-6", style: {
                                    fontSize: 'clamp(2.3rem, 5vw, 4rem)',
                                    fontFamily: 'Outfit, sans-serif',
                                    letterSpacing: '-0.04em',
                                }, children: title }), _jsx("p", { className: "text-slate-400 max-w-xl mx-auto", style: {
                                    fontSize: '1.05rem',
                                    lineHeight: '1.75',
                                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                                    marginBottom: '2rem'
                                }, children: description }), _jsxs("button", { onClick: onCtaClick, className: cn("inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:shadow-indigo-600/20 group cursor-pointer border-none"), style: { height: '3.25rem' }, children: [_jsx("span", { children: ctaText }), _jsx(ArrowRight, { className: "w-4 h-4 group-hover:translate-x-1 transition-transform" })] })] }), _jsx("div", { className: "relative z-20 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4", children: features.map((feature, index) => (_jsxs("div", { className: cn("text-center p-6 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-800 hover:bg-slate-900/60 hover:border-slate-700 transition-all duration-300 group"), children: [_jsx("h3", { className: "text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors", style: { fontFamily: 'Outfit, sans-serif' }, children: feature.title }), _jsx("p", { className: "text-slate-400 text-sm leading-relaxed", children: feature.description })] }, index))) })] })] }));
}
