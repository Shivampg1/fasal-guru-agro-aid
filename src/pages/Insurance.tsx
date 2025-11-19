import { useState } from "react";
import { enrolFarmer, submitClaim, getYield } from "../lib/api";

export default function Insurance() {
  // Enrolment state (UPDATED)
  const [enrolData, setEnrolData] = useState({
    farmer_name: "",
    aadhar_number: "",
    mobile: "",
    parcel_geo: "",
    premium: "",
  });

  // Claim state
  const [claimData, setClaimData] = useState({
    policy_id: "",
    damage_type: "",
    loss_area: "",
  });

  // Yield state
  const [yieldData, setYieldData] = useState({
    farm_location: "",
    crop_type: "",
    season: "",
  });

  const [response, setResponse] = useState<any>(null);

  const handleChange = (setter: any, field: string, value: any) => {
    setter((prev: any) => ({ ...prev, [field]: value }));
  };

  // ✅ Enrolment handler (UPDATED)
  const handleEnrol = async () => {
    const payload = {
      farmer_name: enrolData.farmer_name,
      aadhar_number: enrolData.aadhar_number,
      mobile: enrolData.mobile,
      parcel_geo: enrolData.parcel_geo,
      premium: Number(enrolData.premium),
    };

    const res = await enrolFarmer(payload);
    console.log(res);
    setResponse(res);
  };

  // Claim handler
  const handleClaim = async () => {
    const payload = {
      policy_id: Number(claimData.policy_id),
      damage_type: claimData.damage_type,
      loss_area: Number(claimData.loss_area),
    };

    const res = await submitClaim(payload);
    console.log(res);
    setResponse(res);
  };

  // Yield handler
  const handleYield = async () => {
    const parcel_geo = yieldData.farm_location;
    const res = await getYield(parcel_geo);
    console.log(res);
    setResponse(res);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">PMFBY Insurance Portal</h1>

      {/* Enrolment */}
      <div className="border p-5 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-3">Farmer Enrolment</h2>
        {Object.keys(enrolData).map((field) => (
          <input
            key={field}
            className="border p-2 w-full mb-2 rounded"
            placeholder={field}
            value={(enrolData as any)[field]}
            onChange={(e) =>
              handleChange(setEnrolData, field, e.target.value)
            }
          />
        ))}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleEnrol}
        >
          Enrol Farmer
        </button>
      </div>

      {/* Claim */}
      <div className="border p-5 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-3">Submit Claim</h2>
        {Object.keys(claimData).map((field) => (
          <input
            key={field}
            className="border p-2 w-full mb-2 rounded"
            placeholder={field}
            value={(claimData as any)[field]}
            onChange={(e) =>
              handleChange(setClaimData, field, e.target.value)
            }
          />
        ))}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleClaim}
        >
          Submit Claim
        </button>
      </div>

      {/* Yield */}
      <div className="border p-5 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-3">Yield Estimation</h2>
        {Object.keys(yieldData).map((field) => (
          <input
            key={field}
            className="border p-2 w-full mb-2 rounded"
            placeholder={field}
            value={(yieldData as any)[field]}
            onChange={(e) =>
              handleChange(setYieldData, field, e.target.value)
            }
          />
        ))}
        <button
          className="bg-orange-600 text-white px-4 py-2 rounded"
          onClick={handleYield}
        >
          Get Yield Prediction
        </button>
      </div>

      {/* Response */}
      {response && (
        <div className="border p-4 rounded-xl bg-gray-100">
          <h2 className="font-semibold">Response:</h2>
          <pre className="text-sm mt-2">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
