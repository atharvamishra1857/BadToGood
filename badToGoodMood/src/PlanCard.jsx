import { useState } from "react";
import { updatePlanStatus, deletePlan, getMessages, sendMessage } from "./api";

const statusColors = {
  pending:   "bg-yellow-100 text-yellow-500",
  confirmed: "bg-green-100 text-green-500",
  done:      "bg-pink-100 text-pink-400",
};

export default function PlanCard({ plan, onRefresh }) {
  const [messages, setMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [newMsg, setNewMsg] = useState("");
  const [sender, setSender] = useState("");

  const loadMessages = async () => {
    if (showMessages) { setShowMessages(false); return; }
    try {
      const data = await getMessages(plan.id);
      setMessages(data);
      setShowMessages(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {
    if (!newMsg.trim() || !sender.trim()) return;
    try {
      await sendMessage(plan.id, sender, newMsg);
      const updated = await getMessages(plan.id);
      setMessages(updated);
      setNewMsg("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatus = async (status) => {
    await updatePlanStatus(plan.id, status);
    onRefresh();
  };

  const handleDelete = async () => {
    await deletePlan(plan.id);
    onRefresh();
  };

  return (
    <div className="bg-white border border-pink-100 rounded-3xl shadow-sm p-6 flex flex-col gap-3">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-pink-400 font-bold text-lg">{plan.activity}</p>
          <p className="text-pink-300 text-sm">{plan.date} at {plan.time}</p>
          <p className="text-pink-200 text-xs mt-0.5">by {plan.created_by}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[plan.status]}`}>
          {plan.status}
        </span>
      </div>

      {/* Status buttons */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => handleStatus("confirmed")}
          className="text-xs bg-green-50 text-green-400 border border-green-200 px-3 py-1 rounded-full hover:bg-green-100 transition">
          ✓ Confirm
        </button>
        <button onClick={() => handleStatus("done")}
          className="text-xs bg-pink-50 text-pink-400 border border-pink-200 px-3 py-1 rounded-full hover:bg-pink-100 transition">
          🌸 Mark done
        </button>
        <button onClick={handleDelete}
          className="text-xs bg-red-50 text-red-300 border border-red-100 px-3 py-1 rounded-full hover:bg-red-100 transition ml-auto">
          Remove
        </button>
      </div>

      {/* Messages toggle */}
      <button onClick={loadMessages}
        className="text-pink-300 text-sm hover:text-pink-400 text-left transition">
        {showMessages ? "Hide messages ▲" : "💌 Messages ▼"}
      </button>

      {showMessages && (
        <div className="flex flex-col gap-2">
          {messages.length === 0 && (
            <p className="text-pink-200 text-xs">No messages yet...</p>
          )}
          {messages.map((m) => (
            <div key={m.id} className="bg-pink-50 rounded-2xl px-4 py-2">
              <p className="text-pink-400 text-xs font-semibold">{m.sender}</p>
              <p className="text-pink-500 text-sm">{m.body}</p>
            </div>
          ))}

          {/* Send a message */}
          <div className="flex flex-col gap-2 mt-1">
            <input
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Your name"
              className="rounded-2xl border border-pink-200 px-3 py-2 text-sm text-pink-500 placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-50"
            />
            <div className="flex gap-2">
              <input
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Write a message..."
                className="flex-1 rounded-2xl border border-pink-200 px-3 py-2 text-sm text-pink-500 placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-pink-50"
              />
              <button onClick={handleSend}
                className="bg-pink-400 hover:bg-pink-500 text-white px-4 rounded-2xl text-sm font-semibold transition">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}