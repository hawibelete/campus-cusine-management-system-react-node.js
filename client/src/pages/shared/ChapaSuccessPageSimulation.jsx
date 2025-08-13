import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ChapaSuccessPageSimulation = () => {
  const [searchParams] = useSearchParams();
  const tx_ref = searchParams.get("tx_ref");
  const type = searchParams.get("type");
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "wallet") {
      navigate("/customer/prepaid");
    }
  }, [type, navigate]);

  return (
    <div className="container mt-5 text-center">
      <div className="card shadow p-4">
        <h2>🎉 Payment Successful!</h2>
        {tx_ref ? (
          <>
            <p>Thank you for your order. Your transaction reference is:</p>
            <h4>{tx_ref}</h4>
          </>
        ) : (
          <p>No transaction reference found. Please contact support.</p>
        )}

        {type !== "wallet" && (
          <a href="/homepage" className="btn btn-success mt-3">
            Go to Homepage
          </a>
        )}
      </div>
    </div>
  );
};

export default ChapaSuccessPageSimulation;
