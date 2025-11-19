import axios from "axios";

const API_URL = "https://2676bde8f77c.ngrok-free.app";


export async function enrolFarmer(data: any) {
  return axios.post(`${API_URL}/enrolment/`, {
    farmer_name: data.farmer_name,
    mobile: data.mobile,
    crop: data.crop,
    season: data.season,
    parcel_geo: data.parcel_geo,
    premium: Number(data.premium),
  });
}


export async function submitClaim(data: any) {
  return axios.post(`${API_URL}/claims/intimate`, {
    farmer_id: data.farmer_id,
    loss_type: data.loss_type,
    description: data.description,
    amount: Number(data.amount),
  });
}


export async function getYield(parcel_geo: string) {
  return axios.get(
    `${API_URL}/yield/?parcel_geo=${encodeURIComponent(parcel_geo)}`
  );
}
