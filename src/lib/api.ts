export const API_BASE = import.meta.env.VITE_API_URL;
// Example: https://1d2503aaf8a4.ngrok-free.app

export async function enrolFarmer(data: any) {
  const res = await fetch(`${API_BASE}/enrolment/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function submitClaim(data: any) {
  const res = await fetch(`${API_BASE}/claim/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getYield(data: any) {
  const res = await fetch(`${API_BASE}/yield/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

