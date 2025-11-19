import { useState } from "react";
import { enrolFarmer, submitClaim, getYield } from "../lib/api";

export default function Insurance() {
  const [enrolData, setEnrolData] = useState({
    farmer_name: "",
    aadhar_number: "",
    mobile_number: "",
    state: "",
    district: "",
    crop: "",
    farm_size_acres: "",
    season: "",
  });

  const [claimData, setClaimData] = useState({
    policy_id: "",
    farmer_name: "",
    damage_reason: "",
    loss_percentage: "",
    date: "",
  });

  const [yieldData, setYieldData] = useState({
    farm_location: "",
    crop_type: "",
    season: "",
  });

  const [response, setResponse] = useState<any>(null);

  const handleChange = (setter: any, field: string, value: any) => {
    setter((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        PMFBY Insurance Portal
      </h1>

      {/* ----------------- ENROLMENT -------------- */}
      <div className="border p-5 rounded-xl mb-8 shadow">
        <h2 className="text-xl font-semibold mb-3">Farmer Enrolment</h2>

        {Object.keys(enrolData).map((field) => (
          <input
            key={field}
            className="border p-2 w-full mb-2 rounded"
            placeholder={field.replace("_", " ")}
            value={(enrolData as any)[field]}
            onChange={(e) =>
              handleChange(setEnrolData, field, e.target.value)
            }
          />
        ))}

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            const res = await enrolFarmer(enrolData);
            setResponse(res);
          }}
        >
          Enrol Farmer
        </button>
      </div>

      {/* ----------------- CLAIM -------------- */}
      <div className="border p-5 rounded-xl mb-8 shadow">
        <h2 className="text-xl font-semibold mb-3">Submit Insurance Claim</h2>

        {Object.keys(claimData).map((field) => (
          <input
            key={field}
            className="border p-2 w-full mb-2 rounded"
            placeholder={field.replace("_", " ")}
            value={(claimData as any)[field]}
            onChange={(e) =>
              handleChange(setClaimData, field, e.target.value)
            }
          />
        ))}

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            const res = await submitClaim(claimData);
            setResponse(res);
          }}
        >
          Submit Claim
        </button>
      </div>

      {/* ----------------- YIELD ESTIMATION -------------- */}
      <div className="border p-5 rounded-xl mb-8 shadow">
        <h2 className="text-xl font-semibold mb-3">Yield Estimation</h2>

        {Object.keys(yieldData).map((field) => (
          <input
            key={field}
            className="border p-2 w-full mb-2 rounded"
            placeholder={field.replace("_", " ")}
            value={(yieldData as any)[field]}
            onChange={(e) =>
              handleChange(setYieldData, field, e.target.value)
            }
          />
        ))}

        <button
          className="bg-orange-600 text-white px-4 py-2 rounded"
          onClick={async () => {
            const res = await getYield(yieldData);
            setResponse(res);
          }}
        >
          Get Yield Prediction
        </button>
      </div>

      {/* ----------------- RESPONSE -------------- */}
      {response && (
        <div className="border p-4 rounded-xl bg-gray-100 shadow">
          <h2 className="font-semibold">Response:</h2>
          <pre className="text-sm mt-2">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

