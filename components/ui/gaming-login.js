'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Chrome, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
// FormInput Component
const FormInput = ({ icon, type, placeholder, value, onChange, required }) => {
    return (_jsxs("div", { className: "relative w-full", style: { marginBottom: '1.25rem' }, children: [_jsx("div", { className: "absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none", style: { zIndex: 10, color: 'rgba(255,255,255,0.5)' }, children: icon }), _jsx("input", { type: type, placeholder: placeholder, value: value, onChange: onChange, required: required, className: "w-full rounded-xl focus:outline-none transition-all", style: {
                    height: '3.25rem',
                    paddingLeft: '2.75rem',
                    paddingRight: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                    display: 'block',
                    boxSizing: 'border-box',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    caretColor: '#fff'
                } })] }));
};
// Main LoginForm Component
const LoginForm = ({ onSubmit, onGoogleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // OAuth states
    const [isOAuthSubmitting, setIsOAuthSubmitting] = useState(false);
    const [oAuthService, setOAuthService] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        try {
            // Attempt to log in via Supabase Auth
            const { error } = await supabase.auth.signInWithPassword({
                email: email.toLowerCase(),
                password: password,
            });
            if (error) {
                // If it fails (or URL is placeholder), check local admin credentials fallback
                if (email.toLowerCase() === 'admin@reveza.com' && password === 'password') {
                    setIsSuccess(true);
                    await new Promise(resolve => setTimeout(resolve, 400));
                    onSubmit(email, password, remember);
                    return;
                }
                setErrorMessage(error.message || 'Invalid email or password.');
                setIsSubmitting(false);
            }
            else {
                setIsSuccess(true);
                await new Promise(resolve => setTimeout(resolve, 400));
                onSubmit(email, password, remember);
            }
        }
        catch (err) {
            // If connection fails entirely, fall back to mock admin
            if (email.toLowerCase() === 'admin@reveza.com' && password === 'password') {
                setIsSuccess(true);
                await new Promise(resolve => setTimeout(resolve, 400));
                onSubmit(email, password, remember);
                return;
            }
            setErrorMessage('Connection error. Try admin@reveza.com / password');
            setIsSubmitting(false);
        }
    };
    const handleGoogleClick = async () => {
        setIsOAuthSubmitting(true);
        setOAuthService('Google');
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + window.location.pathname,
                },
            });
            if (error)
                throw error;
            // If no error, Supabase will redirect to Google — user leaves the page
        }
        catch (err) {
            // Fall back to simulation on local/dev error
            await new Promise(resolve => setTimeout(resolve, 1000));
            onGoogleLogin?.();
        }
        finally {
            setIsOAuthSubmitting(false);
        }
    };
    const handleSSOClick = async () => {
        setIsOAuthSubmitting(true);
        setOAuthService('Enterprise SSO');
        try {
            // Simulated SSO redirect logic
            await new Promise(resolve => setTimeout(resolve, 1500));
            onGoogleLogin?.();
        }
        finally {
            setIsOAuthSubmitting(false);
        }
    };
    return (_jsxs("div", { className: "w-full font-sans relative overflow-hidden", style: {
            padding: '2.5rem',
            boxSizing: 'border-box',
            maxWidth: '420px',
            margin: '0 auto',
            background: 'rgba(2, 6, 23, 0.55)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.10)',
            borderRadius: '1.25rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
        }, children: [isOAuthSubmitting && (_jsxs("div", { className: "absolute inset-0 z-50 flex flex-col items-center justify-center", style: {
                    padding: '2rem',
                    textAlign: 'center',
                    background: 'rgba(2, 6, 23, 0.85)',
                    backdropFilter: 'blur(8px)'
                }, children: [_jsx("div", { className: "w-10 h-10 border-4 border-indigo-400 rounded-full animate-spin mb-4", style: { borderTopColor: 'transparent' } }), _jsxs("p", { className: "text-sm font-semibold", style: { color: '#fff' }, children: ["Connecting to ", oAuthService, "..."] }), _jsx("p", { className: "text-xs mt-1", style: { color: 'rgba(255,255,255,0.5)' }, children: "Please wait while we verify your account." })] })), _jsxs("div", { className: "text-center", style: { marginBottom: '2rem' }, children: [_jsxs("div", { className: "inline-flex items-center gap-2", style: { marginBottom: '0.75rem' }, children: [_jsx("img", { src: "logo.jpg", alt: "Reveza Logo", style: { width: '2rem', height: '2rem', borderRadius: '6px', objectFit: 'contain' } }), _jsx("span", { className: "font-extrabold text-lg tracking-tight", style: { color: '#fff' }, children: "Reveza" })] }), _jsx("h2", { className: "text-2xl font-bold", style: { color: '#fff', marginBottom: '0.375rem' }, children: "Welcome Back" }), _jsx("p", { className: "text-sm leading-relaxed", style: { color: 'rgba(255,255,255,0.6)', maxWidth: '280px', margin: '0 auto' }, children: "Enterprise systems. Reimagined with intelligence." })] }), errorMessage && (_jsx("div", { className: "rounded-xl text-xs font-semibold text-center", style: {
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    boxSizing: 'border-box',
                    background: 'rgba(225, 29, 72, 0.15)',
                    border: '1px solid rgba(225, 29, 72, 0.3)',
                    color: '#fda4af'
                }, children: errorMessage })), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(FormInput, { icon: _jsx(Mail, { size: 18 }), type: "email", placeholder: "Work email address", value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsxs("div", { className: "relative w-full", children: [_jsx(FormInput, { icon: _jsx(Lock, { size: 18 }), type: showPassword ? "text" : "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsx("button", { type: "button", className: "absolute right-4 focus:outline-none transition-colors", style: {
                                    top: '1.625rem',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    zIndex: 15,
                                    color: 'rgba(255,255,255,0.4)'
                                }, onClick: () => setShowPassword(!showPassword), "aria-label": showPassword ? "Hide password" : "Show password", children: showPassword ? _jsx(EyeOff, { size: 18 }) : _jsx(Eye, { size: 18 }) })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", style: { marginTop: '0.25rem', marginBottom: '1.5rem' }, children: [_jsxs("label", { className: "flex items-center gap-2 cursor-pointer select-none", style: { color: 'rgba(255,255,255,0.6)' }, children: [_jsx("input", { type: "checkbox", checked: remember, onChange: () => setRemember(!remember), className: "w-4 h-4 rounded cursor-pointer", style: { cursor: 'pointer', accentColor: '#6366f1' } }), _jsx("span", { children: "Remember device" })] }), _jsx("a", { href: "#", className: "font-semibold transition-colors", style: { color: '#818cf8' }, children: "Forgot password?" })] }), _jsx("button", { type: "submit", disabled: isSubmitting, className: `w-full rounded-xl text-white font-semibold shadow-md transition-all ${isSuccess
                            ? 'bg-emerald-600 shadow-emerald-600/10'
                            : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-indigo-600/10 hover:shadow-indigo-600/20'} disabled:opacity-75 disabled:cursor-not-allowed`, style: {
                            height: '3.25rem',
                            fontSize: '0.95rem',
                            lineHeight: '1.25rem',
                            cursor: 'pointer',
                            boxSizing: 'border-box',
                            border: 'none'
                        }, children: isSubmitting ? 'Verifying credentials...' : 'Sign In' })] }), _jsxs("div", { className: "flex items-center justify-center", style: { marginTop: '1.5rem', marginBottom: '1.5rem' }, children: [_jsx("div", { className: "w-full", style: { borderTop: '1px solid rgba(255,255,255,0.12)' } }), _jsx("span", { className: "text-xs font-semibold uppercase tracking-wider whitespace-nowrap", style: { paddingLeft: '0.75rem', paddingRight: '0.75rem', color: 'rgba(255,255,255,0.4)', background: 'transparent' }, children: "or connect via SSO" }), _jsx("div", { className: "w-full", style: { borderTop: '1px solid rgba(255,255,255,0.12)' } })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("button", { type: "button", onClick: handleGoogleClick, className: "flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all", style: { cursor: 'pointer', height: '2.75rem', boxSizing: 'border-box', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }, children: [_jsx(Chrome, { size: 16 }), _jsx("span", { children: "Google" })] }), _jsxs("button", { type: "button", onClick: handleSSOClick, className: "flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all", style: { cursor: 'pointer', height: '2.75rem', boxSizing: 'border-box', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }, children: [_jsx(Shield, { size: 16 }), _jsx("span", { children: "Enterprise SSO" })] })] }), _jsxs("p", { className: "text-center leading-normal", style: { marginTop: '2rem', fontSize: '0.6875rem', color: 'rgba(255,255,255,0.4)' }, children: ["Authorized access only. By signing in, you agree to our", ' ', _jsx("a", { href: "#", className: "underline transition-colors", style: { color: 'rgba(255,255,255,0.55)' }, children: "Terms of Service" }), "."] })] }));
};
// VideoBackground Component
const VideoBackground = ({ videoUrl }) => {
    return (_jsxs("div", { style: {
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: '#020617'
        }, children: [_jsx("div", { style: {
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(2, 6, 23, 0.45)',
                    backdropFilter: 'blur(2px)',
                    zIndex: 10
                } }), _jsx("video", { autoPlay: true, loop: true, muted: true, playsInline: true, style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1
                }, children: _jsx("source", { src: videoUrl, type: "video/mp4" }) })] }));
};
const LoginPage = {
    LoginForm,
    VideoBackground
};
export default LoginPage;
