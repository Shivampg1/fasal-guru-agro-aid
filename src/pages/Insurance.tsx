import React, { useState } from "react";
import { enrolFarmer, submitClaim, getYield } from "../services/api";

export default function InsurancePage() {
  const [response, setResponse] = useState(null);

  // -----------------------------
  //  ENROLMENT FORM STATE
  // -----------------------------
  const [enrolData, setEnrolData] = useState({
    farmer_name: "",
    mobile: "",
    crop: "",
    season: "",
    parcel_geo: "",
    premium: "",
  });

  // -----------------------------
  //  CLAIM FORM STATE
  // -----------------------------
  const [claimData, setClaimData] = useState({
    policy_id: "",
    damage_type: "",
    loss_area: "",
  });

  // -----------------------------
  //  YIELD FORM STATE
  // -----------------------------
  const [geoQuery, setGeoQuery] = useState("");

  // ======================================================
  //  ENROL BUTTON CLICK
  // ======================================================
  const handleEnrol = async () => {
    // ------------ VALIDATION ------------
    if (
      !enrolData.farmer_name ||
      !enrolData.mobile ||
      !enrolData.crop ||
      !enrolData.season ||
      !enrolData.parcel_geo ||
      !enrolData.premium
    ) {
      alert("❌ Please fill all enrolment fields");
      return;
    }

    if (isNaN(Number(enrolData.premium))) {
      alert("❌ Premium must be a valid number");
      return;
    }

    const payload = {
      farmer_name: enrolData.farmer_name,
      mobile: enrolData.mobile,
      crop: enrolData.crop,
      season: enrolData.season,
      parcel_geo: enrolData.parcel_geo,
      premium: Number(enrolData.premium),
    };

    console.log("Enrol Payload:", payload);

    const res = await enrolFarmer(payload);
    setResponse(res);
  };

  // ======================================================
  //  CLAIM BUTTON CLICK
  // ======================================================
  const handleClaim = async () => {
    if (
      !claimData.policy_id ||
      !claimData.damage_type ||
      !claimData.loss_area
    ) {
      alert("❌ Please fill all claim fields");
      return;
    }

    if (isNaN(Number(claimData.policy_id))) {
      alert("❌ Policy ID must be a number");
      return;
    }

    if (isNaN(Number(claimData.loss_area))) {
      alert("❌ Loss area must be a number");
      return;
    }

    const payload = {
      policy_id: Number(claimData.policy_id),
      damage_type: claimData.damage_type,
      loss_area: Number(claimData.loss_area),
    };

    console.log("Claim Payload:", payload);

    const res = await submitClaim(payload);
    setResponse(res);
  };

  // ======================================================
  //  YIELD BUTTON CLICK
  // ======================================================
  const handleYield = async () => {
    if (!geoQuery) {
      alert("❌ Enter parcel_geo for yield prediction");
      return;
    }

    const res = await getYield(geoQuery);
    setResponse(res);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🌾 Fasal Guru - Insurance Portal</h2>

      {/* ----------------------------------------- */}
      {/*               ENROLMENT FORM              */}
      {/* ----------------------------------------- */}
      <h3>1️⃣ Farmer Enrolment</h3>

      <input placeholder="Farmer Name"
        value={enrolData.farmer_name}
        onChange={(e) => setEnrolData({ ...enrolData, farmer_name: e.target.value })}
      /><br />

      <input placeholder="Mobile"
        value={enrolData.mobile}
        onChange={(e) => setEnrolData({ ...enrolData, mobile: e.target.value })}
      /><br />

      <input placeholder="Crop"
        value={enrolData.crop}
        onChange={(e) => setEnrolData({ ...enrolData, crop: e.target.value })}
      /><br />

      <input placeholder="Season"
        value={enrolData.season}
        onChange={(e) => setEnrolData({ ...enrolData, season: e.target.value })}
      /><br />

      <input placeholder="Parcel Geo"
        value={enrolData.parcel_geo}
        onChange={(e) => setEnrolData({ ...enrolData, parcel_geo: e.target.value })}
      /><br />

      <input placeholder="Premium" type="number"
        value={enrolData.premium}
        onChange={(e) => setEnrolData({ ...enrolData, premium: e.target.value })}
      /><br />

      <button onClick={handleEnrol}>Enrol Farmer</button>


      {/* ----------------------------------------- */}
      {/*               CLAIM FORM                  */}
      {/* ----------------------------------------- */}
      <h3>2️⃣ Submit Claim</h3>

      <input placeholder="Policy ID"
        value={claimData.policy_id}
        onChange={(e) => setClaimData({ ...claimData, policy_id: e.target.value })}
      /><br />

      <input placeholder="Damage Type"
        value={claimData.damage_type}
        onChange={(e) => setClaimData({ ...claimData, damage_type: e.target.value })}
      /><br />

      <input placeholder="Loss Area" type="number"
        value={claimData.loss_area}
        onChange={(e) => setClaimData({ ...claimData, loss_area: e.target.value })}
      /><br />

      <button onClick={handleClaim}>Submit Claim</button>


      {/* ----------------------------------------- */}
      {/*               YIELD PREDICTION            */}
      {/* ----------------------------------------- */}
      <h3>3️⃣ Get Yield Prediction</h3>

      <input placeholder="Parcel Geo"
        value={geoQuery}
        onChange={(e) => setGeoQuery(e.target.value)}
      /><br />

      <button onClick={handleYield}>Get Yield</button>


      {/* ----------------------------------------- */}
      {/*               RESPONSE BOX                */}
      {/* ----------------------------------------- */}
      {response && (
        <pre style={{
          marginTop: 20,
          padding: 10,
          background: "#222",
          color: "#0f0",
          borderRadius: 8
        }}>
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
