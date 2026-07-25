import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

// Plans
export const getPlans = () => api.get("/plan").then(r => r.data);
export const createPlan = (plan) => api.post("/plan", plan).then(r => r.data);
export const updatePlanStatus = (id, status) => api.patch(`/plan/${id}`, { status }).then(r => r.data);
export const deletePlan = (id) => api.delete(`/plan/${id}`).then(r => r.data);

// Messages
export const getMessages = (planId) => api.get(`/message/${planId}`).then(r => r.data);
export const sendMessage = (planId, sender, body) =>
  api.post("/message", { plan_id: planId, sender, body }).then(r => r.data);