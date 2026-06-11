'use client'

import { SplineScene } from "./splite";
import { Spotlight } from "./spotlight"
 
export function SplineSceneBasic() {
  return (
    <section 
      className="hero-section"
      id="hero"
      style={{
        backgroundColor: '#070b15',
        color: '#ffffff',
        borderBottom: '1px solid #1e293b',
        boxSizing: 'border-box'
      }}
    >
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div 
        className="hero-grid"
        style={{ boxSizing: 'border-box', width: '100%' }}
      >
        {/* Left content: Reveza Enterprise Hero Description */}
        <div className="hero-content">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
            <span 
              className="text-xs font-bold text-indigo-400 uppercase tracking-widest"
              style={{ letterSpacing: '0.12em', fontFamily: 'Outfit, sans-serif' }}
            >
              Reveza Technologies &nbsp;·&nbsp; Enterprise Partner
            </span>
          </div>

          {/* Heading */}
          <h1 
            style={{
              color: '#ffffff',
              fontFamily: 'Outfit, sans-serif'
            }}
          >
            Enterprise systems. <br />
            <span 
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #a5b4fc, #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Reimagined with intelligence.
            </span>
          </h1>

          {/* Sub-description */}
          <p 
            className="hero-sub"
            style={{
              color: '#94a3b8',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}
          >
            We modernize the <strong>core ERP and operational engines</strong> that run your business—and weave in the <strong>applied AI, real-time data, and customer engagement layers</strong> that make them learn, adapt, and respond in real time.
          </p>

          {/* Call to Actions */}
          <div className="hero-actions">
            <a 
              href="contact.html" 
              className="btn btn-primary"
              style={{ textDecoration: 'none' }}
            >
              Start a project &rarr;
            </a>
            <a 
              href="capabilities.html" 
              className="btn btn-secondary"
              style={{ 
                textDecoration: 'none',
                backgroundColor: 'transparent',
                borderColor: '#475569',
                color: '#ffffff'
              }}
            >
              See Capabilities
            </a>
          </div>
        </div>

        {/* Right content: 3D Spline Canvas */}
        <div 
          className="relative w-full h-[400px] lg:h-[600px] min-h-[350px] overflow-hidden"
          style={{ boxSizing: 'border-box' }}
        >
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
