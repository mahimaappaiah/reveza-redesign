'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ImageCarouselHero } from "./ai-image-generator-hero";
export function CarouselHeroBasic() {
    const demoImages = [
        {
            id: "1",
            src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=60&w=900", // Cloud server room
            alt: "Enterprise Cloud Systems",
            rotation: -10,
        },
        {
            id: "2",
            src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=60&w=900", // Data graphs
            alt: "Operational Metrics",
            rotation: -5,
        },
        {
            id: "3",
            src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=60&w=900", // AI neural background
            alt: "Applied AI Reasoning",
            rotation: 8,
        },
        {
            id: "4",
            src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=60&w=900", // Retail store tablet checkout
            alt: "Digital Commerce Checkout",
            rotation: 12,
        },
        {
            id: "5",
            src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=60&w=900", // Robotic automated warehouse
            alt: "Logistics Automation",
            rotation: -8,
        },
        {
            id: "6",
            src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=60&w=900", // ERP developer monitor
            alt: "System Integrations",
            rotation: 6,
        },
        {
            id: "7",
            src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=60&w=900", // Cloud security lock visualization
            alt: "Zero-Trust Identity",
            rotation: -4,
        },
        {
            id: "8",
            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=60&w=900", // Corporate dashboard projecting graphs
            alt: "Business Intelligence",
            rotation: 10,
        },
    ];
    const demoFeatures = [
        {
            title: "Core Modernization",
            description: "Seamless migration of operations and financials to SAP S/4HANA Cloud.",
        },
        {
            title: "Applied AI & Agents",
            description: "Integrating multi-agent reasoning models directly into operating loops.",
        },
        {
            title: "Data Fabrics",
            description: "High-throughput event-driven API gateways and Snowflake analytical lakehouses.",
        },
    ];
    const handleCtaClick = () => {
        // Scroll smoothly to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        else {
            window.location.href = 'contact.html';
        }
    };
    return (_jsx(ImageCarouselHero, { title: "Enterprise systems. Reimagined with intelligence.", subtitle: "Reveza Technologies \u00B7 Enterprise Transformation Partner", description: "We modernize the core ERP and operational engines that run your business\u2014weaving in the applied AI, real-time data, and customer engagement layers.", ctaText: "Start a project", onCtaClick: handleCtaClick, images: demoImages, features: demoFeatures }));
}
