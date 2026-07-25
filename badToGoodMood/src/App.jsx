import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MoodLiftPage from "./MoodliftPage";
import BirthdayPage from "./birthdayPage";
import PlansPage from "./PlansPage";
import PlansListPage from "./PlanListPage";

const TRANSITION_VIDEOS = [
  "/badtogoodbirthday/transition 2.mp4"
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("moodlift");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionVid, setTransitionVid] = useState(TRANSITION_VIDEOS[0]);
  const [renderedPage, setRenderedPage] = useState("moodlift");

  const videoRef = useRef(null);

  const navigateTo = (page) => {
    if (page === currentPage || isTransitioning) return;

    // plans ↔ planslist switches happen inside the plans section —
    // skip the video transition for those, just swap the rendered page
    const isInternalPlansNav =
      (currentPage === "plans" && page === "planslist") ||
      (currentPage === "planslist" && page === "plans");

    if (isInternalPlansNav) {
      setCurrentPage(page);
      setRenderedPage(page);
      return;
    }

    setTransitionVid(TRANSITION_VIDEOS[Math.floor(Math.random() * TRANSITION_VIDEOS.length)]);
    setIsTransitioning(true);
    setCurrentPage(page);

    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => console.log("Video play interrupted:", err));
      }
    }, 100);

    setTimeout(() => {
      setRenderedPage(page);
    }, 1500);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 3000);
  };

  // For the nav, "plans" and "planslist" both count as the plans section
  const isPlansActive = currentPage === "plans" || currentPage === "planslist";

  return (
    <div className="relative min-h-screen bg-[#fff7fb] text-pink-900 font-sans overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-1.5 rounded-full bg-white/40 backdrop-blur-md border border-pink-200/50 shadow-[0_8px_32px_rgba(244,114,182,0.15)] transition-all duration-500 hover:bg-white/60 hover:shadow-[0_8px_32px_rgba(244,114,182,0.25)]">

        <button
          onClick={() => navigateTo("moodlift")}
          className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${currentPage === "moodlift" ? "text-pink-600 bg-white/80 shadow-sm" : "text-pink-400 hover:text-pink-500"}`}
        >
          🌸 MoodLift
          {currentPage === "moodlift" && <span className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(244,114,182,0.4)] pointer-events-none" />}
        </button>

        <button
          onClick={() => navigateTo("birthday")}
          className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${currentPage === "birthday" ? "text-pink-600 bg-white/80 shadow-sm" : "text-pink-400 hover:text-pink-500"}`}
        >
          🌷 The Birthday
          {currentPage === "birthday" && <span className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(244,114,182,0.4)] pointer-events-none" />}
        </button>

        <button
          onClick={() => navigateTo("planslist")}
          className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${isPlansActive ? "text-pink-600 bg-white/80 shadow-sm" : "text-pink-400 hover:text-pink-500"}`}
        >
          🗓️ Our Plans
          {isPlansActive && <span className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(244,114,182,0.4)] pointer-events-none" />}
        </button>

      </nav>

      {/* ── TRANSITION VIDEO ── */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
          >
            <video
              key={transitionVid} ref={videoRef} src={transitionVid}
              className="w-full h-full object-cover opacity-90" muted playsInline
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PAGES ── */}
      <main className="w-full min-h-screen">
        {renderedPage === "moodlift"  && <MoodLiftPage />}
        {renderedPage === "birthday"  && <BirthdayPage />}
        {renderedPage === "plans"     && <PlansPage onNavigate={navigateTo} />}
        {renderedPage === "planslist" && <PlansListPage onNavigate={navigateTo} />}
      </main>

    </div>
  );
}