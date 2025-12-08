export const API_BASE = "https://38700ac80b54.ngrok-free.app";

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
  const url = `${API_BASE}/yield/?parcel_geo=${parcel_geo}`;

  console.log("Calling yield API:", url);

  const res = await fetch(url, { method: "GET" });
  return res.json();
}
