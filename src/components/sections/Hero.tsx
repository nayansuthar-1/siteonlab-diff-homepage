"use client";

import WaveScene from "@/three/WaveScene";

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-black overflow-hidden">
      {/* Shader background — full width */}
      <div className="absolute inset-0">
        <WaveScene />
      </div>

      {/* Content LEFT */}
      <div className="relative z-10 h-full flex items-center px-8 md:px-20">
        <div className="max-w-2xl">
          <h1 className="text-white text-5xl md:text-7xl font-semibold leading-tight">
            We build websites that{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              convert
            </span>
          </h1>

          <p className="text-white/70 mt-6 text-lg">
            High-performance, visually stunning websites for modern businesses.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-white text-black px-6 py-3 rounded-full font-medium">
              Get Started
            </button>

            <button className="border border-white/30 text-white px-6 py-3 rounded-full">
              View Work
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
