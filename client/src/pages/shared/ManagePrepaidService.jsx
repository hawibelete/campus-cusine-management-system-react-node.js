import React, { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { toast } from '../hooks/use-toast';

const ManagePrepaidService = () => {
  const [mockUsers, setMockUsers] = useState([
    {
      prepaidId: 'P001',
      userId: 'U101',
      userName: 'John Smith',
      loungeId: 'L001',
      prepaidAmount: 500.00,
      remainingBalance: 350.50,
      status: 'active'
    },
    {
      prepaidId: 'P002',
      userId: 'U102',
      userName: 'Sarah Johnson',
      loungeId: 'L001',
      prepaidAmount: 1000.00,
      remainingBalance: 980.00,
      status: 'active'
    },
    {
      prepaidId: 'P003',
      userId: 'U103',
      userName: 'Mike Davis',
      loungeId: 'L002',
      prepaidAmount: 200.00,
      remainingBalance: 0.00,
      status: 'expired'
    },
    {
      prepaidId: 'P004',
      userId: 'U104',
      userName: 'Emma Wilson',
      loungeId: 'L001',
      prepaidAmount: 750.00,
      remainingBalance: 425.75,
      status: 'active'
    },
  ]);

  const [mockLoungeInfo, setMockLoungeInfo] = useState([
    {
      loungeId: 'L001',
      loungeName: 'VIP Executive Lounge',
      discountPercentage: 10,
      minimumTopUp: 50,
      additionalInfo: 'Loyalty program members get an extra 5% off.',
    },
  ]);

  const [mockLoading, setMockLoading] = useState(false);
  const [mockError, setMockError] = useState(null);

  const users = mockUsers;
  const loading = mockLoading;
  const error = mockError;
  const loungeInfo = mockLoungeInfo;

  const [selectedLounge, setSelectedLounge] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    discountPercentage: '',
    minimumTopUp: '',
    additionalInfo: '',
  });

  useEffect(() => {
    setMockLoading(true);
    setTimeout(() => {
      setMockLoading(false);
    }, 1000);
  }, []);

  const lounge = loungeInfo[0];

  const handleEditClick = () => {
    if (!lounge) return;
    setSelectedLounge({
      ...lounge,
      loungeId: lounge.loungeId,
    });

    setForm({
      discountPercentage: lounge.discountPercentage || '',
      minimumTopUp: lounge.minimumTopUp || '',
      additionalInfo: lounge.additionalInfo || '',
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!selectedLounge?.loungeId) return;

    const loungeId = selectedLounge.loungeId;

    setMockLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      setMockLoungeInfo(prevInfo =>
        prevInfo.map(l =>
          l.loungeId === loungeId
            ? { ...l, ...form }
            : l
        )
      );

      toast({
        title: 'Success!',
        description: `Changes saved for ${lounge.loungeName}`,
      });
      setShowModal(false);
    } catch (err) {
      console.error('Simulated save failed', err);
      toast({
        title: 'Error',
        description: 'Failed to update lounge info',
        variant: 'destructive',
      });
      setMockError('Simulated error during save.');
    } finally {
      setMockLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badgeClass = status === 'active' ? 'bg-success' : 'bg-danger';
    return <span className={`badge ${badgeClass}`}>{status.toUpperCase()}</span>;
  };

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
    <>
      {/* Bootstrap CSS and Icons */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        rel="stylesheet" 
      />
      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
      ></script>

      <style>
        {`
          .custom-primary {
            background-color: #347aeb !important;
            border-color: #347aeb !important;
          }
          .text-custom-primary {
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
                          <small>Active Accounts</small>
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
                        <h5 className="mb-0 text-custom-primary fw-semibold">
                          <i className="fas fa-cog me-2"></i>
                          Lounge Settings - {lounge.loungeName}
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
                          <i className="fas fa-percentage text-custom-primary fs-4 mb-2"></i>
                          <div className="fw-bold">Discount Rate</div>
                          <div className="h5 text-custom-primary mb-0">{lounge.discountPercentage}%</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-center p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                          <i className="fas fa-dollar-sign text-custom-primary fs-4 mb-2"></i>
                          <div className="fw-bold">Minimum Top-Up</div>
                          <div className="h5 text-custom-primary mb-0">${lounge.minimumTopUp}</div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="text-center p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                          <i className="fas fa-info-circle text-custom-primary fs-4 mb-2"></i>
                          <div className="fw-bold">Status</div>
                          <div className="h5 text-success mb-0">Active</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <small className="text-muted">
                        <strong>Additional Info:</strong> {lounge.additionalInfo}
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
                    <i className="fas fa-users text-custom-primary fs-3"></i>
                  </div>
                  <h3 className="display-6 mb-1 text-custom-primary fw-bold">{users.length}</h3>
                  <p className="text-muted mb-0">Total Prepaid Accounts</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-body text-center py-4">
                  <div className="stats-icon">
                    <i className="fas fa-wallet text-custom-primary fs-3"></i>
                  </div>
                  <h3 className="display-6 mb-1 text-custom-primary fw-bold">
                    ${users.reduce((sum, user) => sum + parseFloat(user.prepaidAmount || 0), 0).toFixed(2)}
                  </h3>
                  <p className="text-muted mb-0">Total Prepaid Value</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-body text-center py-4">
                  <div className="stats-icon">
                    <i className="fas fa-coins text-custom-primary fs-3"></i>
                  </div>
                  <h3 className="display-6 mb-1 text-custom-primary fw-bold">
                    ${users.reduce((sum, user) => sum + parseFloat(user.remainingBalance || 0), 0).toFixed(2)}
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
                  <h5 className="mb-0 text-custom-primary fw-semibold">
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
                            <th className="border-0 py-3 text-muted fw-semibold">Status</th>
                            <th className="border-0 py-3 text-muted fw-semibold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.prepaidId}>
                              <td className="py-3">
                                <div className="d-flex align-items-center">
                                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3" 
                                       style={{ width: '40px', height: '40px', backgroundColor: 'rgba(52, 122, 235, 0.1)' }}>
                                    <i className="fas fa-user text-custom-primary"></i>
                                  </div>
                                  <div>
                                    <div className="fw-semibold">{user.userName}</div>
                                    <small className="text-muted">ID: {user.prepaidId} • Lounge: {user.loungeId}</small>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3">
                                <span className="fw-bold text-success">${user.prepaidAmount.toFixed(2)}</span>
                              </td>
                              <td className="py-3">
                                <span className={`fw-bold ${user.remainingBalance > 0 ? 'text-custom-primary' : 'text-danger'}`}>
                                  ${user.remainingBalance.toFixed(2)}
                                </span>
                              </td>
                              <td className="py-3">
                                {getStatusBadge(user.status)}
                              </td>
                              <td className="py-3">
                                <button
                                  className="btn btn-outline-custom-primary btn-sm"
                                  onClick={() =>
                                    toast({
                                      title: 'Customer Details',
                                      description: `Viewing details for ${user.userName}`,
                                    })
                                  }
                                >
                                  <i className="fas fa-eye me-1"></i>
                                  View
                                </button>
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
                        <label className="form-label fw-semibold text-custom-primary">
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
                        <label className="form-label fw-semibold text-custom-primary">
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
                        <label className="form-label fw-semibold text-custom-primary">
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
                    disabled={mockLoading}
                  >
                    {mockLoading ? (
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
    </>
  );
};

export default ManagePrepaidService;
