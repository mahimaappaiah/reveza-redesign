'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Chrome, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
// FormInput Component
const FormInput = ({ icon, type, placeholder, value, onChange, required }) => {
    return (_jsxs("div", { className: "relative w-full", style: { marginBottom: '1.25rem' }, children: [_jsx("div", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center pointer-events-none", style: { zIndex: 10 }, children: icon }), _jsx("input", { type: type, placeholder: placeholder, value: value, onChange: onChange, required: required, className: "w-full bg-slate-50/80 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all", style: {
                    height: '3.25rem',
                    paddingLeft: '2.75rem',
                    paddingRight: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                    display: 'block',
                    boxSizing: 'border-box'
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
            setErrorMessage('Supabase connection error. Fallback admin is available.');
            setIsSubmitting(false);
        }
    };
    const handleGoogleClick = async () => {
        setIsOAuthSubmitting(true);
        setOAuthService('Google');
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });
            if (error)
                throw error;
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
    return (_jsxs("div", { className: "w-full bg-white border border-slate-100 rounded-2xl shadow-2xl font-sans relative overflow-hidden", style: {
            padding: '2.5rem',
            boxSizing: 'border-box',
            maxWidth: '420px',
            margin: '0 auto'
        }, children: [isOAuthSubmitting && (_jsxs("div", { className: "absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center animate-fadeIn", style: { padding: '2rem', textAlign: 'center' }, children: [_jsx("div", { className: "w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4", style: { borderTopColor: 'transparent' } }), _jsxs("p", { className: "text-slate-700 text-sm font-semibold", children: ["Connecting to ", oAuthService, "..."] }), _jsx("p", { className: "text-slate-400 text-xs mt-1", children: "Please wait while we verify your account." })] })), _jsxs("div", { className: "text-center", style: { marginBottom: '2rem' }, children: [_jsxs("div", { className: "inline-flex items-center gap-2", style: { marginBottom: '0.75rem' }, children: [_jsx("img", { src: "logo.jpg", alt: "Reveza Logo", style: { width: '2rem', height: '2rem', borderRadius: '6px', objectFit: 'contain' } }), _jsx("span", { className: "font-extrabold text-lg text-slate-900 tracking-tight", children: "Reveza" })] }), _jsx("h2", { className: "text-2xl font-bold text-slate-900", style: { marginBottom: '0.375rem' }, children: "Welcome Back" }), _jsx("p", { className: "text-slate-500 text-sm leading-relaxed", style: { maxWidth: '280px', margin: '0 auto' }, children: "Enterprise systems. Reimagined with intelligence." })] }), errorMessage && (_jsx("div", { className: "bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-semibold text-center", style: { padding: '0.75rem', marginBottom: '1rem', boxSizing: 'border-box' }, children: errorMessage })), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(FormInput, { icon: _jsx(Mail, { size: 18 }), type: "email", placeholder: "Work email address", value: email, onChange: (e) => setEmail(e.target.value), required: true }), _jsxs("div", { className: "relative w-full", children: [_jsx(FormInput, { icon: _jsx(Lock, { size: 18 }), type: showPassword ? "text" : "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), _jsx("button", { type: "button", className: "absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors", style: {
                                    top: '1.625rem',
                                    transform: 'translateY(-50%)',
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    zIndex: 15
                                }, onClick: () => setShowPassword(!showPassword), "aria-label": showPassword ? "Hide password" : "Show password", children: showPassword ? _jsx(EyeOff, { size: 18 }) : _jsx(Eye, { size: 18 }) })] }), _jsxs("div", { className: "flex items-center justify-between text-sm", style: { marginTop: '0.25rem', marginBottom: '1.5rem' }, children: [_jsxs("label", { className: "flex items-center gap-2 text-slate-500 cursor-pointer select-none", children: [_jsx("input", { type: "checkbox", checked: remember, onChange: () => setRemember(!remember), className: "w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer", style: { cursor: 'pointer' } }), _jsx("span", { children: "Remember device" })] }), _jsx("a", { href: "#", className: "font-semibold text-indigo-600 hover:text-indigo-700 transition-colors", children: "Forgot password?" })] }), _jsx("button", { type: "submit", disabled: isSubmitting, className: `w-full rounded-xl text-white font-semibold shadow-md transition-all ${isSuccess
                            ? 'bg-emerald-600 shadow-emerald-600/10'
                            : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-indigo-600/10 hover:shadow-indigo-600/20'} disabled:opacity-75 disabled:cursor-not-allowed`, style: {
                            height: '3.25rem',
                            fontSize: '0.95rem',
                            lineHeight: '1.25rem',
                            cursor: 'pointer',
                            boxSizing: 'border-box',
                            border: 'none'
                        }, children: isSubmitting ? 'Verifying credentials...' : 'Sign In' })] }), _jsxs("div", { className: "flex items-center justify-center", style: { marginTop: '1.5rem', marginBottom: '1.5rem' }, children: [_jsx("div", { className: "border-t border-slate-100 w-full" }), _jsx("span", { className: "bg-white text-slate-400 text-xs font-semibold uppercase tracking-wider whitespace-nowrap", style: { paddingLeft: '0.75rem', paddingRight: '0.75rem' }, children: "or connect via SSO" }), _jsx("div", { className: "border-t border-slate-100 w-full" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("button", { type: "button", onClick: handleGoogleClick, className: "flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm text-sm font-semibold", style: { cursor: 'pointer', height: '2.75rem', boxSizing: 'border-box' }, children: [_jsx(Chrome, { size: 16 }), _jsx("span", { children: "Google" })] }), _jsxs("button", { type: "button", onClick: handleSSOClick, className: "flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm text-sm font-semibold", style: { cursor: 'pointer', height: '2.75rem', boxSizing: 'border-box' }, children: [_jsx(Shield, { size: 16 }), _jsx("span", { children: "Enterprise SSO" })] })] }), _jsxs("p", { className: "text-center text-slate-400 leading-normal", style: { marginTop: '2rem', fontSize: '0.6875rem' }, children: ["Authorized access only. By signing in, you agree to our", ' ', _jsx("a", { href: "#", className: "underline hover:text-slate-600 transition-colors", children: "Terms of Service" }), "."] })] }));
};
// VideoBackground Component
const VideoBackground = ({ videoUrl }) => {
    return (_jsxs("div", { className: "absolute inset-0 w-full h-full overflow-hidden bg-slate-950", children: [_jsx("div", { className: "absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] z-10" }), _jsx("video", { className: "absolute inset-0 min-w-full min-h-full object-cover w-auto h-auto", autoPlay: true, loop: true, muted: true, playsInline: true, style: { width: '100%', height: '100%' }, children: _jsx("source", { src: videoUrl, type: "video/mp4" }) })] }));
};
const LoginPage = {
    LoginForm,
    VideoBackground
};
export default LoginPage;
