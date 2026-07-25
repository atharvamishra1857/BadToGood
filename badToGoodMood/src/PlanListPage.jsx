import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPlans } from "./api";
import PlanCard from "./PlanCard";

export default function PlansListPage({ onNavigate }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlans(); }, []);

  const upcoming = plans.filter((p) => p.status !== "done");
  const past     = plans.filter((p) => p.status === "done");

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-5xl">🌸</span>
          <h1 className="text-3xl font-bold text-pink-400 mt-2">Our Plans</h1>
          <p className="text-pink-300 text-sm mt-1">Everything we're looking forward to 💕</p>
        </div>

        {/* Make a plan button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate("plans")}
          className="w-full mb-8 bg-pink-400 hover:bg-pink-500 text-white font-bold py-4 rounded-2xl transition shadow-md shadow-pink-200 flex items-center justify-center gap-2 text-base"
        >
          <span className="text-xl">+</span> Make a new plan
        </motion.button>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-2 mt-16">
            <span className="text-4xl animate-pulse">🌷</span>
            <p className="text-pink-300 text-sm">Loading your plans...</p>
          </div>
        )}

        {/* Empty */}
        {!loading && plans.length === 0 && (
          <div className="flex flex-col items-center gap-3 mt-16 text-center">
            <span className="text-5xl">💌</span>
            <p className="text-pink-400 font-semibold">No plans yet</p>
            <p className="text-pink-300 text-sm">Be the first to suggest something!</p>
          </div>
        )}

        {/* Upcoming plans */}
        {!loading && upcoming.length > 0 && (
          <div className="mb-6">
            <p className="text-pink-300 text-xs font-semibold uppercase tracking-widest mb-3 pl-1">
              Coming up
            </p>
            <div className="flex flex-col gap-4">
              <AnimatePresence>
                {upcoming.map((plan) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <PlanCard plan={plan} onRefresh={fetchPlans} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Done plans */}
        {!loading && past.length > 0 && (
          <div>
            <p className="text-pink-200 text-xs font-semibold uppercase tracking-widest mb-3 pl-1">
              Done & dusted 🌸
            </p>
            <div className="flex flex-col gap-4 opacity-60">
              {past.map((plan) => (
                <PlanCard key={plan.id} plan={plan} onRefresh={fetchPlans} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}