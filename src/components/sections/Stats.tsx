export default function Stats() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-black overflow-hidden">
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-20">
        
        {/* Strictly contained horizontal glow behind text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="w-[100%] max-w-4xl h-[60px] md:h-[90px] bg-[#543b75] opacity-80 blur-[60px] md:blur-[80px] rounded-[50%]"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
          
          {/* Stat 1 */}
          <div className="flex items-baseline gap-3">
            <span 
              className="text-[2rem] md:text-[2.5rem] text-white leading-none tracking-tight"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontWeight: 300 }}
            >
              2012
            </span>
            <span 
              className="text-[0.8rem] md:text-[0.9rem] text-[#aba8b2] tracking-wide"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontWeight: 500 }}
            >
              Founded
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex items-baseline gap-3">
            <span 
              className="text-[2rem] md:text-[2.5rem] text-white leading-none tracking-tight"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontWeight: 300 }}
            >
              120+
            </span>
            <span 
              className="text-[0.8rem] md:text-[0.9rem] text-[#aba8b2] tracking-wide"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontWeight: 500 }}
            >
              IT Professionals
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex items-baseline gap-3">
            <span 
              className="text-[2rem] md:text-[2.5rem] text-white leading-none tracking-tight"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontWeight: 300 }}
            >
              250+
            </span>
            <span 
              className="text-[0.8rem] md:text-[0.9rem] text-[#aba8b2] tracking-wide"
              style={{ fontFamily: "var(--font-plus-jakarta), sans-serif", fontWeight: 500 }}
            >
              Projects delivered
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}
