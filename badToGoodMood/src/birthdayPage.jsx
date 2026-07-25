import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MemoryCard from "./memoryCard";

// ─── EXACT LOCAL FILE PATHS ──────────────────────────────────────────
const memories = [
  { id: 1, type: "photo", url: "/badtogoodbirthday/blured_memory.jpeg", story: "Chauq mat tera hi per hai!!", rot: "-rotate-2", align: "mt-0" },
  { id: 2, type: "photo", url: "/badtogoodbirthday/childhood.jpeg", story: "Less goo,, hamari saniya shanu aur eraaya se koi kamm hai ke?", rot: "rotate-3", align: "mt-12" },
  { id: 3, type: "video", url: "/badtogoodbirthday/attempt_to_record.mp4", story: "If you remember, I was trying to record you here.", rot: "-rotate-1", align: "mt-6" },
  { id: 4, type: "photo", url: "/Saniya3.jpeg", story: "Just the top I picked", rot: "rotate-2", align: "mt-20" }, 
  { id: 5, type: "photo", url: "/badtogoodbirthday/one_previous_birthday.jpeg", story: "One of your birthdays, where I survived a BHARATBENZ", rot: "-rotate-4", align: "mt-4" },
  { id: 6, type: "video", url: "/badtogoodbirthday/birthdaywish.mp4", story: "This was the second video", rot: "rotate-1", align: "mt-16" },
  { id: 7, type: "photo", url: "/badtogoodbirthday/fitcheck1.jpeg", story: "There was a time mujhe pics mila karte the", rot: "-rotate-3", align: "mt-8" },
  { id: 8, type: "photo", url: "/badtogoodbirthday/fitcheck2.jpeg", story: "Umm, Old days", rot: "rotate-4", align: "mt-0" },
  { id: 9, type: "video", url: "/badtogoodbirthday/playful_moment.mp4", story: "Bhosale and I were siting right at the corner watching all of this while Morde has recorded this.", rot: "-rotate-2", align: "mt-10" },
  { id: 10, type: "photo", url: "/badtogoodbirthday/fitcheckbirthday.jpeg", story: "The best birthdayFit.", rot: "rotate-1", align: "mt-24" },
  { id: 11, type: "photo", url: "/badtogoodbirthday/bodybuilder.jpg", story: "If you ever need a bicep to cry on!", rot: "-rotate-1", align: "mt-4" },
  { id: 12, type: "video", url: "/badtogoodbirthday/atristic.mp4", story: "For you, your fav actor ka gana.", rot: "rotate-3", align: "mt-12" },
];

const letterText = `My name is Atharva Mishra, and I am the bestest friend of yours! (I know, and you don’t need to agree to this.)

I am a hardass, I know, moody, I know, grumpy sometimes, I know.
You know, right, I was never supposed to be born. Dr. raised his hands, parents all stressed, but there comes, underweight, ready to die material.
I have spent almost my entire life, you know, deleting people. Let me explain: I never had just 3 friends; these sorry 2, these 2 are the ones I couldn’t delete. I didn’t want to. They are my dearest; we have our differences, we won’t talk to each other for months; in fact, it happened that we didn't talk for a year, but deep inside we know that we are there for each other.
Morde, Gaikwad, now Tiwari, these are people who I guess might turn into people I would not want to delete.

But you know there is one more person jisse mai nahi karna chahta delete, I might have sounded bohot alag, bohot rude, bohot blunt and boohot galat many times, regarding this topic.
I don't know if I can call you Panda, iss paragraph ke liye dede permission. 🥺
Panda, things have been different, we have had our differences, but there is one thing that we both can agree on: we have that one special spot in our hearts for each other, AT LEAST I DO 🥺. 
What was I in 4th std, nothing, a child who was a little confident, at least confident enough to approach new people, bas. It was you who made it special. You didn’t even know ki tu kuch kar rahi hai; it was just your existence. 
Tujhse jhagad leta hu yaar, bakiyon ki baton ko reply dena, ya consideration mai lena ka mann bhi nahi karta. 
You are special. 

That dream which I talked about gaadi par aaj, I think I know why I felt sad, and maybe I would agar kal wapiss kuch vesa sapna aaye. My insecurities, I never wanted to share you, like kitna objective lag raha hai ye statement, but you are getting it right? I am still sometimes lost in the thought ki you proposed mahamunni, yaar kisiko bhi karti, mai shayad tab bhi bura hi manta, but mahamunni was ugly, stupid, idiot still got the proposal 😤, haramkhor saala.
Okay, we are not here to bitch about him.
You are special, you are special to me.

My actions might point to a different wall, but the fact would never change: YOU ARE SPECIAL, YOU ALWAYS WILL REMAIN SPECIAL TO ME. 🥺💗

I told you about the story I have written, meri autobiography. Below are a few lines from it.

“
4th std:

Our School used to do these shuffles, like the students used to get randomly shuffled in divisions, so the friends that were made during 1st, 2nd, and 3rd were all shuffled in different classes, and I was alone in a new class. The class teacher that we got as class that year was also someone who had just joined. New teacher, new fellow mates, everything is new. I always cried on siting with this one boy as he was the only friend I had in that whole class, I tried making new friends but it just didn’t happen and I was alone at the end of the day, I made a few acquaintances as even they had no one so we were each others class buddies just for the whole sake of not getting bored in the class.
The Class teacher we got was like hell; that was the year I got to know what strict actually means. She used to take literal charge of the class, little off topic but, I remember she was selecting students who would stand in front of their respective rows and recite tables just a normal thing that everyone does in 4th std, I was too scared to do it as I unwantedly got selected for it, I went to talk to her as I thought I was not ready for this representation but she gave me talk like Sharukh gave to those in his team in “Chak de India”, I was hyped for real! I started reciting tables every day. Days went by. One day in our English class, wait, I need to explain the positions.
(Atharva, that’s me, was siting one the very left of the fourth bench of the third row(the row that was at the end, from the door))

Ma’am was just speaking stuff, and I just turned towards the right side with a slight lean forward and saw the best view of my life. I couldn’t blink; I couldn’t move; it just felt radiant. Didn’t talk to her, was too scared to do it, of course I didn’t know what was happening to me (ofc I was in 4th std), but who knew that mai aaj ye likh raha hounga.
One fine day, I heard a voice while I was having a brilliant conversation about how much money one should carry while going to America with my bench partner, “Atharva.”

I looked up, and it was her. She looked absolutely magnificent and breathtaking. It was time for table recitation, but the point here was that she knew my name; I was on top of the world.
This incident marked the beginning of the friendship.


”
You can use this if I ever loose all my memory.

Sorry for birthday par aane wali cheez.
You told me that you were going to celebrate it with your freinds, so I thought tu ek dost se dusre dost ke paas jayegi and mai tujhse magarpatta mai hi milunga 🤷‍♂️. 
I didn't say no, I just couldn't process it, if it makes sense.
`;

// ─── AMBIENT PETALS (For the Background) ──────────────────────────────
const DriftingPetals = () => {
  const [petals, setPetals] = useState([]);
  useEffect(() => {
    setPetals(Array.from({ length: 15 }).map((_, i) => ({
      id: i, left: `${Math.random() * 100}vw`, delay: Math.random() * 10, duration: 15 + Math.random() * 10, scale: 0.5 + Math.random() * 0.5,
      type: ["🌸", "💮", "🌺", "🌷"][Math.floor(Math.random() * 4)]
    })));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
      {petals.map((p) => (
        <motion.div key={p.id} initial={{ y: "-10vh", rotate: 0, x: p.left, scale: p.scale }} animate={{ y: "110vh", rotate: 360, x: `calc(${p.left} + ${Math.random() > 0.5 ? '50px' : '-50px'})` }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }} className="absolute text-2xl drop-shadow-sm">{p.type}</motion.div>
      ))}
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export default function BirthdayPage() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [view, setView] = useState("note"); // "note" | "transitioning" | "library"
  const [showSurprise, setShowSurprise] = useState(false);
  const [replayKey, setReplayKey] = useState(0); // Used to re-trigger the surprise animation

  const handleEnterGarden = () => {
    setView("transitioning");
    setTimeout(() => setView("library"), 1800);
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden flex flex-col" style={{ background: "linear-gradient(to bottom, #fffafb, #fff0f5, #fce4ec)", fontFamily: "'Georgia', serif" }}>
      <DriftingPetals />

      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {/* ── 1. THE OPENING NOTE ── */}
          {view === "note" && (
            <motion.div key="note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8 }} className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-6 py-20">
              <div className="max-w-2xl text-center">
                <div className="text-4xl text-pink-300 mb-6 font-serif italic">Tulips & Lilies</div>
                <p className="text-lg md:text-xl text-pink-900/80 leading-relaxed tracking-wide whitespace-pre-wrap text-left" style={{ textShadow: "0 2px 10px rgba(255,182,193,0.3)" }}>
                  {letterText}
                </p>
                <motion.button 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}
                  onClick={handleEnterGarden}
                  className="mt-16 px-8 py-4 bg-white/60 backdrop-blur-md text-pink-500 rounded-full shadow-[0_8px_32px_rgba(244,114,182,0.2)] border border-pink-200 uppercase tracking-widest text-sm font-sans hover:bg-white transition-all hover:scale-105 active:scale-95"
                >
                  Open the Garden 🌸
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ── 2. FLORAL SPLASH TRANSITION ── */}
          {view === "transitioning" && (
            <motion.div key="splash" className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none">
              <motion.div initial={{ scale: 0, opacity: 1 }} animate={{ scale: 20, opacity: 0 }} transition={{ duration: 2, ease: "easeInOut" }} className="w-64 h-64 bg-pink-100 rounded-full absolute" />
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div key={i} initial={{ scale: 0, x: 0, y: 0, rotate: 0 }} animate={{ scale: [0, 1.5, 1], x: (Math.random() - 0.5) * 800, y: (Math.random() - 0.5) * 800, rotate: Math.random() * 360, opacity: [0, 1, 0] }} transition={{ duration: 1.8, ease: "easeOut" }} className="absolute text-6xl">
                  {["🌸", "💮", "🌺", "🌷"][Math.floor(Math.random() * 4)]}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ── 3. THE MEMORY LIBRARY ── */}
          {view === "library" && (
            <motion.div key="library" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="relative z-10 pt-32 pb-10 max-w-7xl mx-auto px-4 md:px-10 flex flex-col items-center">
              
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-10 w-full">
                {memories.map((memory, idx) => (
                  <MemoryCard key={memory.id} memory={memory} index={idx} onPlayVideo={() => setActiveVideo(memory)} />
                ))}
              </div>

              {/* ── SURPRISE BOX SECTION ── */}
              <motion.div 
                className="mt-28 mb-10 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <p className="text-pink-400 font-sans tracking-widest text-xs uppercase mb-4">One last thing...</p>
                <button 
                  onClick={() => setShowSurprise(true)}
                  className="group relative flex items-center justify-center w-24 h-24 mx-auto bg-white/70 backdrop-blur-md border border-pink-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 active:scale-95"
                >
                  <span className="text-5xl group-hover:animate-bounce">🎁</span>
                  <div className="absolute inset-0 rounded-2xl bg-pink-100/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <p className="text-pink-600/70 italic mt-4 text-sm font-serif">Tap to open</p>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── CUSTOM FOOTER ── */}
      {view === "library" && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="relative z-10 w-full text-center pb-8 pt-4"
        >
          <p className="text-pink-900/60 text-xs md:text-sm font-sans flex items-center justify-center gap-1.5">
            Made with 
            <img 
              src="/badtogoodbirthday/manufacturer.jpg" 
              alt="manufacturer icon" 
              className="w-5 h-5 rounded-[4px] object-cover shadow-sm border border-pink-200" 
            /> 
            and zero male input.
          </p>
        </motion.div>
      )}

      {/* ── CINEMATIC VIDEO MODAL ── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(16px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/80">
            <button onClick={() => setActiveVideo(null)} className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors text-lg tracking-widest font-sans z-10">
              Close ✕
            </button>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-[0_0_50px_rgba(255,182,193,0.3)] bg-black">
              <video src={activeVideo.url} className="w-full h-auto max-h-[85vh] object-contain" controls autoPlay playsInline />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SURPRISE MODAL (HAPPY BIRTHDAY) ── */}
      <AnimatePresence>
        {showSurprise && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(244,114,182,0.4)] border border-pink-200 overflow-hidden p-10 text-center"
            >
              {/* Decorative Background Elements inside the modal */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-60" />

              {/* Animated Content bound to replayKey */}
              <div key={replayKey} className="relative z-10 flex flex-col items-center">
                
                {/* Popping Flowers */}
                <div className="flex gap-4 mb-6">
                  {["🌷", "🌸", "💮"].map((flower, i) => (
                    <motion.div 
                      key={i}
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: i * 0.2, type: "spring", stiffness: 200 }}
                      className="text-4xl"
                    >
                      {flower}
                    </motion.div>
                  ))}
                </div>

                {/* Main Text */}
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="text-4xl md:text-5xl font-serif font-bold italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-400 mb-4 pb-2"
                >
                  Happy Birthday, Panda!
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="text-pink-800/80 text-lg font-serif mb-8"
                >
                  Khush rehna pure saal!!
                </motion.p>
              </div>

              {/* Buttons */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button 
                  onClick={() => setReplayKey(prev => prev + 1)}
                  className="px-6 py-2.5 rounded-full bg-pink-50 text-pink-600 border border-pink-200 text-sm font-sans font-medium hover:bg-pink-100 transition-colors"
                >
                  Repeat ✨
                </button>
                <button 
                  onClick={() => setShowSurprise(false)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white text-sm font-sans font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all"
                >
                  Go Back 🌸
                </button>
              </motion.div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}