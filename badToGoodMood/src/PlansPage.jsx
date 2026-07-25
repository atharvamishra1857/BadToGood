import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPlan } from "./api";

const ACTIVITIES = [
  { emoji: "🍕", label: "Dinner" },
  { emoji: "🎬", label: "Movie night" },
  { emoji: "🌿", label: "Walk outside" },
  { emoji: "🎮", label: "Game night" },
  { emoji: "☕", label: "Cafe date" },
  { emoji: "🛍️", label: "Shopping" },
  { emoji: "🎨", label: "Creative day" },
  { emoji: "✨", label: "Surprise me" },
];

const slide = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: -60 },
  transition: { duration: 0.35, ease: "easeInOut" },
};

export default function PlansPage({ onNavigate }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    created_by: "",
    activity: "",
    date: "",
    time: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const next = () => { setError(""); setStep((s) => s + 1); };
  const back = () => { setError(""); setStep((s) => s - 1); };

  const handleSubmit = async () => {
    if (!form.date || !form.time) { setError("Pick a date and time 🌸"); return; }
    try {
      setLoading(true);
      await createPlan(form);
      setDone(true);
    } catch {
      setError("Something went wrong 💔 try again");
    } finally {
      setLoading(false);
    }
  };

  // ── Success screen ──────────────────────────────────────
  if (done) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
          className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-md border border-pink-100 text-center flex flex-col items-center gap-4"
        >
          <span className="text-6xl">🌸</span>
          <h2 className="text-2xl font-bold text-pink-400">Plan sent!</h2>
          <p className="text-pink-300 text-sm">Can't wait for {form.activity} {ACTIVITIES.find(a => a.label === form.activity)?.emoji ?? "✨"}</p>
          <div className="flex gap-3 mt-2 w-full">
            <button
              onClick={() => { setStep(0); setForm({ created_by: "", activity: "", date: "", time: "", message: "" }); setDone(false); }}
              className="flex-1 border border-pink-200 text-pink-400 font-semibold py-3 rounded-2xl hover:bg-pink-50 transition"
            >
              Make another
            </button>
            <button
              onClick={() => onNavigate("planslist")}
              className="flex-1 bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 rounded-2xl transition"
            >
              See all plans →
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === step ? "w-6 h-2 bg-pink-400" : i < step ? "w-2 h-2 bg-pink-300" : "w-2 h-2 bg-pink-100"
              }`}
            />
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-pink-100 overflow-hidden">
          <AnimatePresence mode="wait">

            {/* ── Step 0: Who's planning ── */}
            {step === 0 && (
              <motion.div key="step0" {...slide} className="p-8 flex flex-col gap-6">
                <div className="text-center">
                  <span className="text-4xl">👋</span>
                  <h2 className="text-2xl font-bold text-pink-400 mt-2">Who's making this plan?</h2>
                  <p className="text-pink-300 text-sm mt-1">So the other person knows it's from you</p>
                </div>
                <input
                  value={form.created_by}
                  onChange={(e) => set("created_by", e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-2xl border border-pink-200 px-4 py-3 text-pink-500 placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-50 text-center text-lg"
                />
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button
                  onClick={() => { if (!form.created_by.trim()) { setError("Tell us your name 🌸"); return; } next(); }}
                  className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 rounded-2xl transition"
                >
                  Next →
                </button>
              </motion.div>
            )}

            {/* ── Step 1: Pick activity ── */}
            {step === 1 && (
              <motion.div key="step1" {...slide} className="p-8 flex flex-col gap-6">
                <div className="text-center">
                  <span className="text-4xl">💕</span>
                  <h2 className="text-2xl font-bold text-pink-400 mt-2">What are we doing?</h2>
                  <p className="text-pink-300 text-sm mt-1">Pick one or type your own</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {ACTIVITIES.map((a) => (
                    <button
                      key={a.label}
                      onClick={() => { set("activity", a.label); }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm font-semibold transition-all duration-200 ${
                        form.activity === a.label
                          ? "bg-pink-400 text-white border-pink-400 scale-105 shadow-md"
                          : "bg-pink-50 text-pink-400 border-pink-200 hover:border-pink-300 hover:bg-pink-100"
                      }`}
                    >
                      <span className="text-lg">{a.emoji}</span> {a.label}
                    </button>
                  ))}
                </div>
                <input
                  value={ACTIVITIES.find(a => a.label === form.activity) ? "" : form.activity}
                  onChange={(e) => set("activity", e.target.value)}
                  placeholder="Or type something else..."
                  className="w-full rounded-2xl border border-pink-200 px-4 py-3 text-pink-500 placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-50"
                />
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <div className="flex gap-3">
                  <button onClick={back} className="flex-1 border border-pink-200 text-pink-300 font-semibold py-3 rounded-2xl hover:bg-pink-50 transition">← Back</button>
                  <button
                    onClick={() => { if (!form.activity.trim()) { setError("Pick something to do 💕"); return; } next(); }}
                    className="flex-1 bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 rounded-2xl transition"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Date & time ── */}
            {step === 2 && (
              <motion.div key="step2" {...slide} className="p-8 flex flex-col gap-6">
                <div className="text-center">
                  <span className="text-4xl">📅</span>
                  <h2 className="text-2xl font-bold text-pink-400 mt-2">When?</h2>
                  <p className="text-pink-300 text-sm mt-1">Pick a date and time</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-pink-400 text-sm font-semibold mb-1 block">Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                      className="w-full rounded-2xl border border-pink-200 px-4 py-3 text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-50"
                    />
                  </div>
                  <div>
                    <label className="text-pink-400 text-sm font-semibold mb-1 block">Time</label>
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) => set("time", e.target.value)}
                      className="w-full rounded-2xl border border-pink-200 px-4 py-3 text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-50"
                    />
                  </div>
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <div className="flex gap-3">
                  <button onClick={back} className="flex-1 border border-pink-200 text-pink-300 font-semibold py-3 rounded-2xl hover:bg-pink-50 transition">← Back</button>
                  <button
                    onClick={() => { if (!form.date || !form.time) { setError("Pick a date and time 📅"); return; } next(); }}
                    className="flex-1 bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 rounded-2xl transition"
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Sweet note + confirm ── */}
            {step === 3 && (
              <motion.div key="step3" {...slide} className="p-8 flex flex-col gap-6">
                <div className="text-center">
                  <span className="text-4xl">💌</span>
                  <h2 className="text-2xl font-bold text-pink-400 mt-2">Add a little note</h2>
                  <p className="text-pink-300 text-sm mt-1">Optional — but sweet things are always welcome</p>
                </div>

                {/* Summary */}
                <div className="bg-pink-50 rounded-2xl p-4 flex flex-col gap-1 border border-pink-100">
                  <p className="text-pink-400 font-bold">{form.activity} {ACTIVITIES.find(a => a.label === form.activity)?.emoji ?? "✨"}</p>
                  <p className="text-pink-300 text-sm">{form.date} at {form.time}</p>
                  <p className="text-pink-200 text-xs">from {form.created_by}</p>
                </div>

                <textarea
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="Something sweet... (optional)"
                  rows={3}
                  className="w-full rounded-2xl border border-pink-200 px-4 py-3 text-pink-500 placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-50 resize-none"
                />
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <div className="flex gap-3">
                  <button onClick={back} className="flex-1 border border-pink-200 text-pink-300 font-semibold py-3 rounded-2xl hover:bg-pink-50 transition">← Back</button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 rounded-2xl transition disabled:opacity-50"
                  >
                    {loading ? "Sending 🌸" : "Send plan 💌"}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <button
          onClick={() => onNavigate("planslist")}
          className="w-full text-pink-300 text-sm text-center hover:text-pink-400 transition mt-4"
        >
          See all plans →
        </button>

      </div>
    </div>
  );
}