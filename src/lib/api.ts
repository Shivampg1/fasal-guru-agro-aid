export const API_BASE = "https://2676bde8f77c.ngrok-free.app";

// ------------------------
// 1) Farmer Enrolment (POST)
// ------------------------
export async function enrolFarmer(data: any) {
  const res = await fetch(`${API_BASE}/enrolment/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

// ------------------------
// 2) Claims (POST)
// ------------------------
export async function submitClaim(data: any) {
  const res = await fetch(`${API_BASE}/claims/intimate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

// ------------------------
// 3) Yield (GET)
// ------------------------
export async function getYield(parcel_geo: string) {
  const res = await fetch(
    `${API_BASE}/yield/?parcel_geo=${encodeURIComponent(parcel_geo)}`,
    {
      method: "GET",
    }
  );

  return res.json();
}
