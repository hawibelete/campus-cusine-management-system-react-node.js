import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Table, // While you have a Table component in unstyled, the styled version uses plain <table>. We'll adapt.
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap"; // You might not need all of these if using pure Bootstrap 5 classes
import LoadingSpinner from "@/components/lounge-staff/LoadingSpinner";
import { toast } from "@/components/shared/ui/use-toast";
import {
  fetchPrepaids,
  updateLoungeInfo,
} from "@/redux/slices/lounge-staff/prepaidSlice";
import { useAuthCheck } from "@/hooks/useAuthCheck";

const ManagePrepaidService = () => {
  useAuthCheck();
  const dispatch = useDispatch();
  const {
    users,
    loading,
    error,
    loungeInfo = [], // Ensure loungeInfo is an array, default to empty if undefined
  } = useSelector((state) => state.prepaids);

  const [selectedLounge, setSelectedLounge] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    discountPercentage: "",
    minimumTopUp: "",
    additionalInfo: "",
  });

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchPrepaids());
  }, [dispatch]);

  // Derive lounge from loungeInfo (assuming it's the first element)
  const lounge = loungeInfo[0];

  // Handler for editing lounge settings
  const handleEditClick = () => {
    if (!lounge) return; // Prevent editing if no lounge data
    setSelectedLounge({
      ...lounge,
      loungeId: lounge.loungeId, // Ensure loungeId is correctly picked
    });

    setForm({
      discountPercentage: lounge.discountPercentage || "",
      minimumTopUp: lounge.minimumTopUp || "",
      additionalInfo: lounge.additionalInfo || "",
    });
    setShowModal(true);
  };

  // Handler for input changes in the form
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler for saving lounge info
  const handleSave = async () => {
    if (!selectedLounge?.loungeId) return;

    const loungeId = selectedLounge.loungeId;

    try {
      // Dispatch the async thunk for updating lounge info
      await dispatch(updateLoungeInfo({ loungeId, data: form })).unwrap();
      toast({
        title: "Saved",
        description: `Changes saved for lounge #${loungeId}`,
      });
      setShowModal(false);
      // Re-fetch prepaids to update UI with new lounge info
      await dispatch(fetchPrepaids());
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to update lounge info", // Display error message
        variant: "destructive",
      });
    }
  };

 

  // Loading and Error states
  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger" role="alert">
        <i className="fas fa-exclamation-triangle me-2"></i>
        {error}
      </div>
    </div>
  );

  return (
    <div className="ps-5">
      <style>
        {`
          .custom-primary {
            background-color:rgb(97, 158, 255) !important;
            border-color: #347aeb !important;
          }
          .text-secondary {
            color: #347aeb !important;
          }
          .border-custom-primary {
            border-color: #347aeb !important;
          }
          .btn-custom-primary {
            background-color: #347aeb;
            border-color: #347aeb;
            color: white;
          }
          .btn-custom-primary:hover {
            background-color: #2c6ad5;
            border-color: #2c6ad5;
          }
          .btn-outline-custom-primary {
            color: #347aeb;
            border-color: #347aeb;
            background-color: transparent;
          }
          .btn-outline-custom-primary:hover {
            background-color: #347aeb;
            border-color: #347aeb;
            color: white;
          }
          .card {
            border: none;
            box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
            transition: all 0.3s ease;
          }
          .card:hover {
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          }
          .stats-icon {
            width: 60px;
            height: 60px;
            background-color: rgba(52, 122, 235, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
          }
        `}
      </style>

      <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container-fluid py-4">
          {/* Header Section */}
          <div className="row mb-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body custom-primary text-white py-4">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h1 className="h3 mb-2 fw-bold">
                        <i className="fas fa-credit-card me-3"></i>
                        Prepaid Services Management
                      </h1>
                      <p className="mb-0 opacity-75">Manage customer prepaid accounts and lounge settings</p>
                    </div>
                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      <div className="d-flex justify-content-md-end">
                        <div className="text-center">
                          <div className="h4 mb-1">{users.length}</div>
                          <small>Total Accounts</small> {/* Changed from Active to Total based on logic */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lounge Settings Card */}
          {lounge && (
            <div className="row mb-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-header bg-white border-bottom-0 py-3">
                    <div className="row align-items-center">
                      <div className="col">
                        <h5 className="mb-0 text-secondary fw-semibold">
                          <i className="fas fa-cog me-2"></i>
                          Lounge Settings - {lounge.loungeName || `Lounge #${lounge.loungeId}`}
                        </h5>
                      </div>
                      <div className="col-auto">
                        <button
                          className="btn btn-outline-custom-primary btn-sm"
                          onClick={handleEditClick}
                        >
                          <i className="fas fa-edit me-2"></i>
                          Edit Settings
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row g-4">
                      <div className="col-md-4">
                        <div className="text-center p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                          <i className="fas fa-percentage text-secondary fs-4 mb-2"></i>
                          <div className="fw-bold">Discount Rate</div>
                          <div className="h5 text-secondary mb-0">{lounge.discountPercentage || 0}%</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-center p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                          <i className="fas fa-dollar-sign text-secondary fs-4 mb-2"></i>
                          <div className="fw-bold">Minimum Top-Up</div>
                          <div className="h5 text-secondary mb-0">ETB {lounge.minimumTopUp || 0}</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-center p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                          <i className="fas fa-info-circle text-secondary fs-4 mb-2"></i>
                          <div className="fw-bold">Status</div>
                          <div className="h5 text-secondary mb-0">Active</div> {/* Assuming lounge status is always active */}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <small className="text-muted">
                        <strong>Additional Info:</strong> {lounge.additionalInfo || 'N/A'}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Statistics Cards */}
          <div className="row mb-4 g-4">
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-body text-center py-4">
                  <div className="stats-icon">
                    <i className="fas fa-users text-secondary fs-3"></i>
                  </div>
                  <h3 className="display-6 mb-1 text-secondary fw-bold">{users.length}</h3>
                  <p className="text-muted mb-0">Total Prepaid Accounts</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-body text-center py-4">
                  <div className="stats-icon">
                    <i className="fas fa-wallet text-secondary fs-3"></i>
                  </div>
                  <h3 className="display-6 mb-1 text-secondary fw-bold">
                    ETB {users.reduce((sum, user) => sum + parseFloat(user.prepaidAmount || 0), 0).toFixed(2)}
                  </h3>
                  <p className="text-muted mb-0">Total Prepaid Value</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-body text-center py-4">
                  <div className="stats-icon">
                    <i className="fas fa-coins text-secondary fs-3"></i>
                  </div>
                  <h3 className="display-6 mb-1 text-secondary fw-bold">
                    ETB {users.reduce((sum, user) => sum + parseFloat(user.remainingBalance || 0), 0).toFixed(2)}
                  </h3>
                  <p className="text-muted mb-0">Remaining Balance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer List */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header bg-white border-bottom-0 py-3">
                  <h5 className="mb-0 text-secondary fw-semibold">
                    <i className="fas fa-list me-2"></i>
                    Prepaid Customers
                  </h5>
                </div>
                <div className="card-body p-0">
                  {users.length === 0 ? (
                    <div className="p-4 text-center">
                      <i className="fas fa-users text-muted fs-1 mb-3"></i>
                      <h5 className="text-muted">No prepaid customers found</h5>
                      <p className="text-muted">Customer data will appear here once available.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead style={{ backgroundColor: '#f8f9fa' }}>
                          <tr>
                            <th className="border-0 py-3 text-muted fw-semibold">Customer</th>
                            <th className="border-0 py-3 text-muted fw-semibold">Prepaid Amount</th>
                            <th className="border-0 py-3 text-muted fw-semibold">Remaining Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.prepaidId}>
                              <td className="py-3">
                                <div className="d-flex align-items-center">
                                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                    style={{ width: '40px', height: '40px', backgroundColor: 'rgba(52, 122, 235, 0.1)' }}>
                                    <i className="fas fa-user text-secondary"></i>
                                  </div>
                                  <div>
                                    <div className="fw-semibold">{user.userName || `User #${user.userId}`}</div> {/* Use userName if available, otherwise userId */}
                                    <small className="text-muted">ID: {user.prepaidId} • Lounge: {user.loungeId}</small>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3">
                                <span className="fw-bold text-secondary">ETB {parseFloat(user.prepaidAmount || 0).toFixed(2)}</span>
                              </td>
                              <td className="py-3">
                                <span className={`fw-bold ${parseFloat(user.remainingBalance || 0) > 0 ? 'text-primary' : 'text-danger'}`}>
                                  ETB {parseFloat(user.remainingBalance || 0).toFixed(2)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        {showModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header custom-primary text-white border-0">
                  <h5 className="modal-title fw-semibold">
                    <i className="fas fa-edit me-2"></i>
                    Edit Lounge Settings
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <form>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold text-secondary">
                          <i className="fas fa-percentage me-2"></i>
                          Discount Percentage
                        </label>
                        <input
                          type="number"
                          className="form-control border-custom-primary"
                          name="discountPercentage"
                          value={form.discountPercentage}
                          onChange={handleInputChange}
                          placeholder="Enter discount %"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold text-secondary">
                          <i className="fas fa-dollar-sign me-2"></i>
                          Minimum Top-Up
                        </label>
                        <input
                          type="number"
                          className="form-control border-custom-primary"
                          name="minimumTopUp"
                          value={form.minimumTopUp}
                          onChange={handleInputChange}
                          placeholder="Enter minimum amount"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold text-secondary">
                          <i className="fas fa-info-circle me-2"></i>
                          Additional Information
                        </label>
                        <textarea
                          className="form-control border-custom-primary"
                          rows={4}
                          name="additionalInfo"
                          value={form.additionalInfo}
                          onChange={handleInputChange}
                          placeholder="Enter additional information"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer bg-light border-0">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-custom-primary"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePrepaidService;