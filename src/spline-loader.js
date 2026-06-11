import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SplineSceneBasic } from '../components/ui/spline-scene-basic';
import '../index.css';
const container = document.getElementById('hero-spline-root');
if (container) {
    ReactDOM.createRoot(container).render(_jsx(React.StrictMode, { children: _jsx(SplineSceneBasic, {}) }));
}
