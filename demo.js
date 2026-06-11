'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LoginPage from './components/ui/gaming-login';
function App() {
    const handleLogin = (email, password, remember) => {
        console.log('Login attempt:', { email, password, remember });
    };
    return (_jsxs("div", { className: "relative min-h-screen w-full flex items-center justify-center px-4 py-12", children: [_jsx(LoginPage.VideoBackground, { videoUrl: "https://videos.pexels.com/video-files/8128311/8128311-uhd_2560_1440_25fps.mp4" }), _jsx("div", { className: "relative z-20 w-full max-w-md animate-fadeIn", children: _jsx(LoginPage.LoginForm, { onSubmit: handleLogin }) }), _jsx("footer", { className: "absolute bottom-4 left-0 right-0 text-center text-white/60 text-sm z-20", children: "\u00A9 2025 NexusGate. All rights reserved." })] }));
}
export default App;
