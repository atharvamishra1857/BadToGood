import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const pandaMessages = [
  "You are bamboo-tifully amazing 🎋",
  "This panda traveled 9,000 miles just to say: you're doing great 🐼",
  "Scientists confirm: pandas have never once mansplained anything 🔬",
  "Panda fact: they are 100% drama-free, unlike certain people 👀",
  "This little bean is rooting for you 🤍",
];

const funnyTexts = [
  "Men have 23 pairs of chromosomes. One of them is clearly a bug. 🐛",
  "The WiFi is down. Men said they 'know how to fix it.' It's still down. 📡",
  "Plot twist: the trash took itself out. Still more reliable. 🗑️",
  "Scientists are still trying to figure out what men bring to the table. The study continues. 🔭",
  "A panda never forgot your birthday. Just saying. 🎂",
  "Breaking: local man 'almost' did the dishes. Pulitzer incoming. 📰",
  "Pandas spend their days eating snacks and being fluffy. Goals, honestly. 🌿",
];

// Extra jokes revealed when user picks "No" on the surprise section
const noJokes = [
  "Wise choice. The video had men in it anyway. Just kidding. Maybe. 🐼",
  "Studies show women who skip videos live 40% more peacefully. (Source: vibes.) 📊",
  "A panda once said 'no' to a boy panda. She's been thriving ever since. 💅",
  "Your boundaries are valid, your boundaries are respected, your boundaries are iconic. 🌸",
  "Men invented the remote control and still can't find the laundry basket. Make it make sense. 🧺",
  "The audacity of men? Unmatched. The audacity of pandas? Zero. That's why we stan. 🐼",
  "'No' is a complete sentence. So is 'go away.' Both are valid. ✨",
];

// ─── FLOATING PANDA ──────────────────────────────────────────────────────────

const FloatingPanda = ({ style }) => (
  <div
    className="absolute text-4xl select-none pointer-events-none animate-bounce"
    style={{ animationDuration: `${2 + Math.random() * 2}s`, ...style }}
  >
    🐼
  </div>
);

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────

export default function MoodLiftPage() {
  const [currentJoke, setCurrentJoke] = useState(0);
  const [sparkles, setSparkles] = useState([]);
  // "idle" | "yes" | "no"
  const [surpriseState, setSurpriseState] = useState("idle");

  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const handleAudioEnded = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Auto-rotate joke card
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentJoke((prev) => (prev + 1) % funnyTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Generate sparkles once
  useEffect(() => {
    const sp = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${0.5 + Math.random() * 1.2}rem`,
      delay: `${Math.random() * 4}s`,
      emoji: ["✨", "💕", "🌸", "🎀", "💫", "🌷"][Math.floor(Math.random() * 6)],
    }));
    setSparkles(sp);
  }, []);

  // Play / stop audio based on surpriseState
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (surpriseState === "yes") {
      audio.currentTime = 0;
      audio.play().catch(() => {}); // browsers may block autoplay; user gesture (button click) usually allows it
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [surpriseState]);

  // Keep the video silent and aligned with the inserted audio.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (surpriseState === "yes") {
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [surpriseState]);

  const handleYes = () => setSurpriseState("yes");
  const handleNo  = () => setSurpriseState("no");
  const handleBack = () => setSurpriseState("idle");

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(255,255,255,0.9), transparent 28%), radial-gradient(circle at 85% 12%, rgba(255,182,193,0.42), transparent 22%), radial-gradient(circle at 10% 88%, rgba(255,215,228,0.5), transparent 24%), linear-gradient(135deg, #fff7fb 0%, #ffd9e8 42%, #ffc2d8 74%, #fff0f6 100%)",
      }}
    >
      {/* Hidden audio element — put your song in /public/song.mp3 */}
      {/*
        ── HOW TO SET YOUR SONG ─────────────────────────────────────────────
        Place your audio file in the /public folder, e.g. /public/song.mp3
        Then update the src below to match your filename.
        ────────────────────────────────────────────────────────────────────
      */}
      <audio ref={audioRef} src="/Bole Chudiyan Cut.mp3" onEnded={handleAudioEnded} />

      {/* Ambient layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(circle at center, black 42%, transparent 100%)",
          opacity: 0.32,
        }}
      />
      <div
        className="absolute top-[-80px] left-[-80px] w-64 h-64 rounded-full opacity-30 pointer-events-none blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(255,133,161,0.95), transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-60px] right-[-60px] w-80 h-80 rounded-full opacity-20 pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,175,197,0.95), transparent 70%)" }}
      />

      {/* Floating sparkles */}
      {sparkles.map((s) => (
        <div key={s.id} className="absolute pointer-events-none select-none animate-pulse"
          style={{ left: s.left, top: s.top, fontSize: s.size, animationDelay: s.delay, opacity: 0.55 }}>
          {s.emoji}
        </div>
      ))}

      {/* Floating corner pandas */}
      <FloatingPanda style={{ top: "8%",    left: "3%",  animationDelay: "0s"   }} />
      <FloatingPanda style={{ top: "15%",   right: "4%", animationDelay: "0.7s" }} />
      <FloatingPanda style={{ bottom: "18%",left: "2%",  animationDelay: "1.2s" }} />
      <FloatingPanda style={{ bottom: "10%",right: "3%", animationDelay: "0.4s" }} />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-14 md:py-20 flex flex-col items-center gap-10">

        {/* Hero heading */}
        <div className="w-full flex justify-center">
          <div
            className="w-full max-w-4xl rounded-[2rem] p-8 md:p-10 shadow-[0_30px_80px_rgba(190,37,102,0.16)] relative overflow-hidden text-center"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.88), rgba(255,241,246,0.78))", backdropFilter: "blur(18px)", border: "1px solid rgba(255,182,193,0.55)" }}
          >
            <p className="text-pink-400 font-bold tracking-[0.4em] text-[11px] uppercase mb-4" style={{ fontFamily: "var(--font-body)" }}>
              ✨ a little something for you ✨
            </p>
            <h1
              className="text-5xl md:text-7xl font-black leading-[0.92]"
              style={{ fontFamily: "var(--font-display)", color: "#fffdfd", textShadow: "0 8px 26px rgba(192,24,91,0.24)" }}
            >
              Hey You,<br />
              <span style={{ color: "#c2185b" }}>You're Incredible.</span>
            </h1>
          </div>
        </div>

        {/* Rotating joke card */}
        <div
          className="w-full rounded-3xl p-8 text-center shadow-xl relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(255,182,193,0.6)" }}
        >
          <div className="absolute top-3 right-4 text-2xl animate-spin" style={{ animationDuration: "6s" }}>🎀</div>
          <p className="text-3xl mb-3">😂</p>
          <p
            key={currentJoke}
            className="text-pink-800 text-xl font-semibold leading-relaxed"
            style={{ fontFamily: "'Georgia', serif", animation: "fadeIn 0.6s ease" }}
          >
            {funnyTexts[currentJoke]}
          </p>
          <p className="text-pink-400 text-xs mt-4 tracking-wide">auto-refreshing... unlike certain people's effort 💅</p>
        </div>

        {/* Panda fan club */}
        <div className="w-full">
          <h2 className="text-center text-3xl font-bold text-pink-700 mb-6" style={{ fontFamily: "var(--font-display)" }}>
            🐼 Your Panda Fan Club 🐼
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pandaMessages.map((msg, i) => (
              <div key={i} className="rounded-2xl p-5 flex items-start gap-4 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,182,193,0.5)" }}>
                <span className="text-3xl shrink-0">🐼</span>
                <p className="text-pink-800 font-medium leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>{msg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo gallery */}
        <div className="w-full">
          <h2 className="text-center text-3xl font-bold text-pink-700 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            📸 Your Happy Gallery
          </h2>
          <p className="text-center text-pink-500 text-sm mb-6" style={{ fontFamily: "var(--font-body)" }}>( swap the placeholders below with your own photos! )</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <PhotoSlot label="Photo 1" imgSrc="Saniya5.jpeg" />
            <PhotoSlot label="Photo 2" imgSrc="Saniya2.jpeg" />
            <PhotoSlot label="Photo 3" imgSrc="Saniya3.jpeg" />
            <PhotoSlot label="Photo 4" imgSrc="Saniya4.jpeg" />
            <PhotoSlot label="Photo 5" imgSrc="Saniya1.jpeg" />
            <PhotoSlot label="Photo 6" imgSrc="brother2.jpeg" />
          </div>
        </div>

        {/* ── SURPRISE SECTION ── */}
        <SurpriseSection
          state={surpriseState}
          onYes={handleYes}
          onNo={handleNo}
          onBack={handleBack}
          videoRef={videoRef}
        />

        {/* Footer affirmation */}
        <div
          className="w-full rounded-3xl p-10 text-center shadow-xl"
          style={{ background: "linear-gradient(135deg, rgba(255,182,193,0.7), rgba(255,228,235,0.8))", border: "2px solid rgba(255,105,150,0.3)" }}
        >
          <p className="text-5xl mb-4">🌸</p>
          <h3 className="text-3xl md:text-4xl font-black text-pink-700 mb-3" style={{ fontFamily: "'Georgia', serif" }}>
            You are the main character.
          </h3>
          <p className="text-pink-600 text-lg" style={{ fontFamily: "'Georgia', serif" }}>
            The pandas wrote it down. It's official. 🐼📜
          </p>
        </div>

        <p className="text-black text-xs text-center pb-4">Made with 💕 and zero male input.</p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0%   { opacity: 0; transform: scale(0.85) translateY(16px); }
          100% { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        .pop-in { animation: popIn 0.45s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>
    </div>
  );
}

// ─── SURPRISE SECTION ────────────────────────────────────────────────────────

function SurpriseSection({ state, onYes, onNo, onBack, videoRef }) {
  return (
    <div className="w-full">
      {/* ── IDLE: question card ── */}
      {state === "idle" && (
        <div
          className="pop-in w-full rounded-3xl p-10 text-center shadow-xl relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", border: "2px solid rgba(255,105,150,0.4)" }}
        >
          <div className="absolute -top-3 -left-3 text-5xl rotate-12 select-none pointer-events-none">🎁</div>
          <div className="absolute -bottom-3 -right-3 text-5xl -rotate-12 select-none pointer-events-none">✨</div>

          <p className="text-pink-400 tracking-widest text-xs uppercase mb-3" style={{ fontFamily: "var(--font-body)" }}>
            psst… hey you
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-pink-700 mb-2" style={{ fontFamily: "var(--font-display)" }}>
            Wanna see something? 🐼
          </h2>
          <p className="text-pink-500 mb-8 text-base" style={{ fontFamily: "var(--font-body)" }}>
            (It involves a surprise. No men were involved in the making of this surprise.)
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onYes}
              className="group relative px-10 py-4 rounded-2xl font-black text-white text-lg shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 overflow-hidden"
              style={{ background: "linear-gradient(135deg, #f472b6, #ec4899)", fontFamily: "var(--font-display)", boxShadow: "0 6px 24px rgba(236,72,153,0.35)" }}
            >
              <span className="relative z-10">Yes! Show me 🎀</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "linear-gradient(135deg, #ec4899, #db2777)" }} />
            </button>

            <button
              onClick={onNo}
              className="px-10 py-4 rounded-2xl font-semibold text-pink-600 text-lg border-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-pink-50"
              style={{ borderColor: "rgba(244,114,182,0.5)", fontFamily: "var(--font-body)" }}
            >
              No thanks 🙅‍♀️
            </button>
          </div>
        </div>
      )}

      {/* ── YES: video + music ── */}
      {state === "yes" && (
        <div
          className="pop-in w-full rounded-3xl p-8 shadow-xl relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(14px)", border: "2px solid rgba(255,105,150,0.45)" }}
        >
          {/* Music note pulse indicator */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-pink-400 text-sm font-medium animate-pulse" style={{ fontFamily: "var(--font-body)" }}>
              🎵 music is playing…
            </span>
          </div>

          <h2 className="text-center text-2xl font-black text-pink-700 mb-5" style={{ fontFamily: "var(--font-display)" }}>
            This one's for you 🌸
          </h2>

          {/*
            ── HOW TO SET YOUR VIDEO ────────────────────────────────────────
            Place your video file in the /public folder, e.g. /public/video.mp4
            Then update the src on the <source> tag below to match your filename.
            ────────────────────────────────────────────────────────────────
          */}
          <div
            className="w-full rounded-2xl overflow-hidden shadow-lg"
            style={{ background: "#000", border: "2px solid rgba(255,182,193,0.5)" }}
          >
            <video
              ref={videoRef}
              className="w-full"
              controls
              autoPlay
              muted
              loop
              style={{ maxHeight: "480px", display: "block" }}
            >
              <source src="/brother3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Back button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-pink-600 border-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-pink-50"
              style={{ borderColor: "rgba(244,114,182,0.5)", fontFamily: "var(--font-body)" }}
            >
              ← Go back
            </button>
          </div>
        </div>
      )}

      {/* ── NO: extra man jokes ── */}
      {state === "no" && (
        <div
          className="pop-in w-full rounded-3xl p-8 shadow-xl relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(14px)", border: "2px solid rgba(255,105,150,0.4)" }}
        >
          <div className="absolute top-3 right-4 text-2xl animate-spin" style={{ animationDuration: "8s" }}>💅</div>

          <h2 className="text-center text-2xl font-black text-pink-700 mb-1" style={{ fontFamily: "var(--font-display)" }}>
            Totally valid. 💁‍♀️
          </h2>
          <p className="text-center text-pink-500 text-sm mb-6" style={{ fontFamily: "var(--font-body)" }}>
            Since you're here, let the pandas drop some truth bombs instead.
          </p>

          <div className="flex flex-col gap-4">
            {noJokes.map((joke, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-2xl px-5 py-4"
                style={{
                  background: "rgba(255,182,193,0.18)",
                  border: "1px solid rgba(255,105,150,0.25)",
                  animation: `fadeIn 0.4s ease ${i * 0.08}s both`,
                }}
              >
                <span className="text-2xl shrink-0 mt-0.5">🐼</span>
                <p className="text-pink-800 font-medium leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                  {joke}
                </p>
              </div>
            ))}
          </div>

          {/* Back button */}
          <div className="mt-7 flex justify-center">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold text-pink-600 border-2 transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-pink-50"
              style={{ borderColor: "rgba(244,114,182,0.5)", fontFamily: "var(--font-body)" }}
            >
              ← Actually wait, show me the surprise
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PHOTO SLOT ──────────────────────────────────────────────────────────────

function PhotoSlot({ label, imgSrc }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-md group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{ aspectRatio: "1/1", background: "rgba(255,255,255,0.5)", border: "2px dashed rgba(255,105,150,0.45)" }}
    >
      {imgSrc ? (
        <img src={imgSrc} alt={label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-pink-300">
          <span className="text-4xl">🐼</span>
          <span className="text-xs font-medium tracking-wide">{label}</span>
          <span className="text-xs opacity-60">add your photo here</span>
        </div>
      )}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
        style={{ background: "linear-gradient(135deg, rgba(255,182,193,0.2), rgba(255,255,255,0.1))" }} />
    </div>
  );
}