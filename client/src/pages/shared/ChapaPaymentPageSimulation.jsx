import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from '@/utility/axios';
import { useAuthCheck } from '@/hooks/useAuthCheck'; 

const ChapaPaymentPageSimulation = () => {
  useAuthCheck();
  const [searchParams] = useSearchParams(); 
  const navigate = useNavigate();

  const tx_ref = searchParams.get('tx_ref');
  const lounge_id = searchParams.get('lounge_id');
  const user_id = searchParams.get('user_id');
  const type = searchParams.get('type') || 'cart'; 
  const amount = searchParams.get('amount');

  useEffect(() => {
    console.log('Chapa Payment Simulation Params (from URL):');
    console.log('Transaction Ref:', tx_ref);
    console.log('Lounge ID:', lounge_id);
    console.log('User ID:', user_id);
    console.log('Type:', type);
    console.log('Amount:', amount);
  }, [tx_ref, lounge_id, user_id, type, amount]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePaymentInitiation = async () => {
    setLoading(true);
    setError(null);

    if (!tx_ref || !amount || !lounge_id || !user_id) {
      setError('Missing essential payment details. Please go back and try again.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/webhook/initiate', {
        status: 'success', 
        tx_ref,
        amount: parseFloat(amount), 
        currency: 'ETB', 
        email: 'testuser@example.com', 
        first_name: 'Test', 
        last_name: 'User', 
        custom_fields: [
          { key: 'lounge_id', value: lounge_id },
          { key: 'user_id', value: user_id },
          { key: 'type', value: type }
        ]
      }, {
        withCredentials: true, 
      });

      console.log('Webhook sent successfully:', response.data);
      navigate(`/chapa/success?tx_ref=${tx_ref}&type=${type}`);

    } catch (err) {
      console.error('Payment initiation failed:', err);
      if (err.response) {
        setError(err.response.data.message || 'Payment processing failed. Please try again.');
        console.error('Server error response:', err.response.data);
      } else if (err.request) {
        setError('No response from server. Check your internet connection.');
        console.error('No response:', err.request);
      } else {
        setError('An unexpected error occurred. Please contact support.');
        console.error('Error message:', err.message);
      }
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
              <div className="payment-header text-center text-white p-4"
                   style={{ backgroundColor: "#347aeb" }}> 
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
                        <strong className="text-primary">{tx_ref || 'N/A'}</strong>
                      </div>
                    </div>

                    <div className="payment-detail">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">User ID:</span>
                        <strong>{user_id || 'N/A'}</strong>
                      </div>
                    </div>

                    <div className="payment-detail">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Lounge ID:</span>
                        <strong>{lounge_id || 'N/A'}</strong>
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
                          <strong>{amount || '0.00'} ETB</strong>
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
                    onClick={handlePaymentInitiation} 
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