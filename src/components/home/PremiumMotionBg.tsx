"use client";

import { useEffect, useRef, useState } from 'react';

export default function PremiumMotionBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport or low-power state to reduce animation density
  useEffect(() => {
    const checkMobile = () => {
      const isMobileSize = window.innerWidth < 768;
      const isLowPower = navigator.userAgent.toLowerCase().includes('mobile') || navigator.maxTouchPoints > 1;
      setIsMobile(isMobileSize || isLowPower);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Golden safety timeout: if video load events are blocked in sandboxed iframes, force fade-in after 1.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Soft flowing luxurious canvas particles & connections (plexus effect)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Seed dimensions robustly (never start with 0x0)
    const parent = canvas.parentElement || document.body;
    let width = parent.clientWidth || window.innerWidth || 1920;
    let height = parent.clientHeight || window.innerHeight || 1080;

    canvas.width = width;
    canvas.height = height;

    // Particle Object definition
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      color: string;
      pulseSpeed: number;
      pulseTime: number;
    }

    const maxParticles = isMobile ? 18 : 38;
    const connectionDistance = isMobile ? 95 : 145;
    const particles: Particle[] = [];

    // Distinct premium brand colors spanning deep orange, glowing amber, and warm gold accents
    const brandColors = [
      'rgba(249, 115, 22, 0.55)', // orange-500
      'rgba(245, 158, 11, 0.5)',  // amber-500
      'rgba(251, 191, 36, 0.45)', // yellow-400
      'rgba(239, 68, 68, 0.4)',   // red-500
    ];

    // Seed initial nodes across the actual robust dimensions (no 0px clumping!)
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28, // Slow, elegant ambient drift
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 2.0 + 1.2, // Enhanced size for pristine high-end visibility
        alpha: Math.random() * 0.6 + 0.4,
        color: brandColors[Math.floor(Math.random() * brandColors.length)],
        pulseSpeed: Math.random() * 0.012 + 0.005,
        pulseTime: Math.random() * Math.PI * 2,
      });
    }

    // Resize Observer to dynamic recalculate canvas size on window scale / viewport transitions
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = Math.floor(entry.contentRect.width);
        const newHeight = Math.floor(entry.contentRect.height);

        if (newWidth > 0 && newHeight > 0) {
          // If the previous seed happened at a tiny dimension, spread them out nicely
          if (width <= 100) {
            particles.forEach((p) => {
              p.x = Math.random() * newWidth;
              p.y = Math.random() * newHeight;
            });
          }
          width = canvas.width = newWidth;
          height = canvas.height = newHeight;
        }
      }
    });

    resizeObserver.observe(parent);

    // Main animation loop
    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle plexus lines first
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const lineAlpha = (1 - dist / connectionDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(249, 115, 22, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw shiny particle nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.pulseTime += p.pulseSpeed;
        const pulseFactor = Math.sin(p.pulseTime) * 0.3 + 0.85;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        // Smooth luxury drop glow for individual particles
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(249, 115, 22, 0.4)';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset blur context for fast mobile rendering

        // Slow cinematic drift update
        p.x += p.vx;
        p.y += p.vy;

        // Bounce back from boundaries elegantly
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [isMobile]);

  return (
    <div id="premium-bg-root" className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#07090e]">

      {/* 1. Base Static Mesh Fallback Gradient (Robust, high contrast dark theme base) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0d17] via-[#07090e] to-[#120808] opacity-95 z-0" />

      {/* 2. Abstract Technology Video Loop (Using reliable, high-performing preview formats) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onPlaying={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-10 scale-[1.03] pointer-events-none transition-all duration-[1200ms] filter blur-[1.5px] brightness-[0.5] contrast-[1.05] ${
          isVideoLoaded ? 'opacity-[0.35]' : 'opacity-0'
        }`}
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-background-loop-42686-large.mp4"
          type="video/mp4"
        />
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-dots-background-loop-42861-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* 3. HTML5 Interactive Canvas flowing plexus particle wave */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-20 pointer-events-none opacity-90"
      />

      {/* 4. Beautiful ambient spotlight flares that add premium cinema style lighting */}
      <div className="absolute top-[15%] left-[25%] w-[40vw] h-[40vw] rounded-full bg-orange-600/5 mix-blend-screen filter blur-[100px] animate-[pulse_11s_infinite_alternate]" />
      <div className="absolute bottom-[20%] right-[15%] w-[45vw] h-[45vw] rounded-full bg-red-600/5 mix-blend-screen filter blur-[120px] animate-[pulse_14s_infinite_alternate]" />

      {/* 5. Custom Radial Vignette Layer */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(7, 9, 14, 0.15) 0%, rgba(7, 9, 14, 0.75) 60%, rgba(7, 9, 14, 0.98) 95%, #07090e 100%)'
        }}
      />

      {/* 6. Linear Bottom Scrim to softly fade background elements into main content pages */}
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#07090e] via-[#07090e]/85 to-transparent z-40 pointer-events-none" />
    </div>
  );
}
