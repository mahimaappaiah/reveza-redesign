'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SplineScene } from "./splite";
import { Spotlight } from "./spotlight";
export function SplineSceneBasic() {
    return (_jsxs("section", { className: "hero-section", id: "hero", style: {
            backgroundColor: '#070b15',
            color: '#ffffff',
            borderBottom: '1px solid #1e293b',
            boxSizing: 'border-box'
        }, children: [_jsx(Spotlight, { className: "-top-40 left-0 md:left-60 md:-top-20", fill: "white" }), _jsxs("div", { className: "hero-grid", style: { boxSizing: 'border-box', width: '100%' }, children: [_jsxs("div", { className: "hero-content", children: [_jsxs("div", { className: "inline-flex items-center gap-2 mb-5", children: [_jsx("span", { className: "w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" }), _jsx("span", { className: "text-xs font-bold text-indigo-400 uppercase tracking-widest", style: { letterSpacing: '0.12em', fontFamily: 'Outfit, sans-serif' }, children: "Reveza Technologies \u00A0\u00B7\u00A0 Enterprise Partner" })] }), _jsxs("h1", { style: {
                                    color: '#ffffff',
                                    fontFamily: 'Outfit, sans-serif'
                                }, children: ["Enterprise systems. ", _jsx("br", {}), _jsx("span", { className: "text-transparent bg-clip-text", style: {
                                            backgroundImage: 'linear-gradient(135deg, #a5b4fc, #6366f1)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }, children: "Reimagined with intelligence." })] }), _jsxs("p", { className: "hero-sub", style: {
                                    color: '#94a3b8',
                                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                                }, children: ["We modernize the ", _jsx("strong", { children: "core ERP and operational engines" }), " that run your business\u2014and weave in the ", _jsx("strong", { children: "applied AI, real-time data, and customer engagement layers" }), " that make them learn, adapt, and respond in real time."] }), _jsxs("div", { className: "hero-actions", children: [_jsx("a", { href: "contact.html", className: "btn btn-primary", style: { textDecoration: 'none' }, children: "Start a project \u2192" }), _jsx("a", { href: "capabilities.html", className: "btn btn-secondary", style: {
                                            textDecoration: 'none',
                                            backgroundColor: 'transparent',
                                            borderColor: '#475569',
                                            color: '#ffffff'
                                        }, children: "See Capabilities" })] })] }), _jsx("div", { className: "relative w-full h-[400px] lg:h-[600px] min-h-[350px] overflow-hidden", style: { boxSizing: 'border-box' }, children: _jsx(SplineScene, { scene: "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode", className: "w-full h-full" }) })] })] }));
}
