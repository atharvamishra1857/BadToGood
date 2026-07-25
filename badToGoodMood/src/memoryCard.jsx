import { useState } from "react";
import { motion } from "framer-motion";

const MemoryCard = ({ memory, index, onPlayVideo }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // If it's a photo, clicking anywhere flips it. 
  // If it's a video, clicking the background does nothing (must use buttons).
  const handleCardClick = () => {
    if (memory.type === "photo") {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <motion.div 
      className={`relative w-full break-inside-avoid perspective-1000 ${memory.align} ${memory.rot}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
    >
      <div 
        className="relative w-full preserve-3d transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] shadow-xl rounded-sm"
        style={{ 
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d"
        }}
      >
        
        {/* ── FRONT OF CARD ── */}
        <div 
          onClick={handleCardClick}
          className={`relative w-full bg-white p-3 md:p-4 rounded-sm backface-hidden border border-pink-100 ${memory.type === "photo" ? "cursor-pointer" : ""}`} 
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative w-full overflow-hidden bg-pink-50/50 aspect-[4/5] rounded-sm">
            
            {memory.type === "photo" ? (
              <>
                <img src={memory.url} alt="Memory" className="w-full h-full object-cover" loading="lazy" />
                {/* Mobile hint for photos */}
                <div className="absolute bottom-2 right-2 bg-white/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] uppercase tracking-widest text-pink-800 pointer-events-none">
                  Tap to flip ⤵
                </div>
              </>
            ) : (
              <div className="w-full h-full relative">
                {/* Background video (muted/looping preview) */}
                <video src={memory.url} className="w-full h-full object-cover opacity-90" muted loop autoPlay playsInline />
                
                {/* Play Button Overlay (Center) */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onPlayVideo(); }}
                    className="w-16 h-16 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center border border-white text-white shadow-xl hover:scale-110 active:scale-95 transition-transform"
                  >
                    <span className="text-xl ml-1">▶</span>
                  </button>
                </div>

                {/* Flip Button (Bottom Right) */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
                  className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded text-[11px] font-bold uppercase tracking-widest text-pink-800 shadow-md hover:bg-white active:scale-95 transition-all"
                >
                  Read Story ⤵
                </button>
              </div>
            )}

          </div>
        </div>

        {/* ── BACK OF CARD: STORY & FLOWER ── */}
        <div 
          className="absolute inset-0 w-full h-full p-6 md:p-8 rounded-sm backface-hidden shadow-inner flex flex-col justify-center items-center text-center overflow-hidden cursor-pointer" 
          onClick={() => setIsFlipped(false)}
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)",
            background: "radial-gradient(circle at center, #fffefb, #fdf4f6)",
            border: "1px solid rgba(255,182,193,0.3)"
          }}
        >
          {/* Subtle paper texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }} />
          
          {/* Pressed Flower */}
          <div className="absolute top-4 left-4 text-4xl opacity-30 rotate-[-15deg] blur-[0.5px]">
            {["🌷", "🌸", "💮"][Math.floor(Math.random() * 3)]}
          </div>

          <p className="relative z-10 text-xl md:text-2xl text-pink-900/90 leading-relaxed font-serif italic drop-shadow-sm px-2">
            "{memory.story}"
          </p>

          {/* Turn back indicator */}
          <div className="absolute bottom-4 text-pink-300 text-xs font-sans uppercase tracking-widest">
            Tap to return ⤴
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default MemoryCard;