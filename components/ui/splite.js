'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));
export function SplineScene({ scene, className }) {
    return (_jsx(Suspense, { fallback: _jsx("div", { className: "w-full h-full flex items-center justify-center bg-slate-950", children: _jsx("div", { className: "w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" }) }), children: _jsx(Spline, { scene: scene, className: className }) }));
}
