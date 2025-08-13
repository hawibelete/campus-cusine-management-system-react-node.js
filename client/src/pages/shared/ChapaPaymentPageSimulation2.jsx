
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChapaPaymentPageSimulation = () => {
  const navigate = useNavigate();

  const tx_ref = 'mock-tx-1234567890';
  const lounge_id = 'mock-lounge-abc';
  const user_id = 'mock-user-123';
  const type = 'cart';
  const amount = '1022.00';

  useEffect(() => {
    console.log('Chapa Payment Simulation Params (Hardcoded):');
    console.log('Transaction Ref:', tx_ref);
    console.log('Lounge ID:', lounge_id);
    console.log('User ID:', user_id);
    console.log('Type:', type);
    console.log('Amount:', amount);
  }, [tx_ref, lounge_id, user_id, type, amount]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFakePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const simulatedResponseData = {
        status: 'success',
        message: 'Payment successfully processed (simulated)',
        data: {
          tx_ref: tx_ref,
          amount: amount,
          currency: 'ETB',
        }
      };

      console.log('Simulated Webhook sent:', simulatedResponseData);

      navigate(`/chapa/success?tx_ref=${tx_ref}&type=${type}`);

    } catch (err) {
      console.error('Fake payment failed (simulated)', err);
      setError('Something went wrong during simulation. Please check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {error}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setError(null)}
                  aria-label="Close"
                ></button>
              </div>
            )}
            
            <div className="card payment-card">
              <div className="payment-header text-center text-white p-4">
                style={{ backgroundColor: "#347aeb" }}
                <h2 className="mb-3">
                  <i className="bi bi-credit-card-2-front me-2"></i>
                  Chapa Payment Simulation
                </h2>
                <p className="mb-0 opacity-75">Secure Payment Processing</p>
              </div>
              
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-12">
                    <h5 className="text-muted mb-3">Payment Details</h5>
                    
                    <div className="payment-detail">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Transaction Reference:</span>
                        <strong className="text-primary">{tx_ref}</strong>
                      </div>
                    </div>
                    
                    <div className="payment-detail">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">User ID:</span>
                        <strong>{user_id}</strong>
                      </div>
                    </div>
                    
                    <div className="payment-detail">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Lounge ID:</span>
                        <strong>{lounge_id}</strong>
                      </div>
                    </div>
                    
                    <div className="payment-detail">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Payment Type:</span>
                        <span className="badge bg-info text-capitalize">{type}</span>
                      </div>
                    </div>
                    
                    <div className="payment-detail border-success bg-light-success">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Amount:</span>
                        <h4 className="text-success mb-0">
                          <strong>{amount} ETB</strong>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                
                <hr className="my-4" />
                
                <div className="text-center">
                  <button
                    className="btn simulate-btn btn-lg w-100 text-white"
                     style={{ backgroundColor: "#347aeb" }}
                    onClick={handleFakePayment}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <div className="spinner-border loading-spinner" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle me-2"></i>
                        Simulate Payment Success
                      </>
                    )}
                  </button>
                  
                  <p className="text-muted mt-3 mb-0">
                    <i className="bi bi-shield-check me-1"></i>
                    This is a simulation for development purposes
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <small className="text-muted">
                Powered by Chapa Payment Gateway | Secure & Reliable
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapaPaymentPageSimulation;
