import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoungeCard from "@/components/admin/LoungeCard";
import { Plus, Search } from "lucide-react";
import {
  fetchAllLounges,
  addLounge,
  updateLounge,
  deleteLounge,
} from "@/redux/slices/admin/loungeSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import { toast } from "sonner";

const LoungeManagement = () => {
  useAuthCheck();
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    chapaPublicKey: "",
    providesPrepaid: false,
    discountPercentage: "",
    minimumTopUp: "",
    additionalInfo: "",
    providesDelivery: false,
    imageUrl:
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingLoungeId, setEditingLoungeId] = useState(null);

  const dispatch = useDispatch();
  const { lounges, loading, error } = useSelector((state) => state.lounges);

  useEffect(() => {
    const fetchLounges = async () => {
      const result = await dispatch(fetchAllLounges());
      if (fetchAllLounges.rejected.match(result)) {
        toast.error("Failed to load lounges.");
      }
    };
    fetchLounges();
  }, [dispatch]);

  console.log("Lounges data:", lounges);
  if (loading) return <p>Loading lounges...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredLounges = lounges.filter(
    (lounge) =>
      lounge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lounge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lounge.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddLounge = async () => {
    const payload = {
      name: formData.name,
      location: formData.location,
      description: formData.description,
      chapaPublicKey: formData.chapaPublicKey,
      imageUrl: formData.imageUrl,
      providesPrepaid: formData.providesPrepaid,
      discountPercentage: formData.providesPrepaid
        ? formData.discountPercentage
        : null,
      minimumTopUp: formData.providesPrepaid ? formData.minimumTopUp : null,
      additionalInfo: formData.providesPrepaid ? formData.additionalInfo : null,
      providesDelivery: formData.providesDelivery,
    };

    const result = await dispatch(addLounge(payload));
    if (addLounge.fulfilled.match(result)) {
      toast.success(`${formData.name} added successfully!`);
      setShowModal(false);
      setFormData({
        name: "",
        location: "",
        description: "",
        chapaPublicKey: "",
        imageUrl:
          "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80",
        providesDelivery: false,
        providesPrepaid: false,
        discountPercentage: "",
        minimumTopUp: "",
        additionalInfo: "",
      });
      dispatch(fetchAllLounges());
    } else {
      toast.error(`Failed to add ${formData.name}.`);
    }
  };

  const handleEdit = (loungeId) => {
    const loungeToEdit = lounges.find((lounge) => lounge.loungeId === loungeId);
    if (loungeToEdit) {
      setFormData({ ...loungeToEdit });
      setEditingLoungeId(loungeId);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleUpdateLounge = async () => {
    const sanitizedData = {
      ...formData,
      providesPrepaid: !!formData.providesPrepaid,
      providesDelivery: !!formData.providesDelivery,
      discountPercentage: formData.providesPrepaid
        ? parseFloat(formData.discountPercentage)
        : null,
      minimumTopUp: formData.providesPrepaid
        ? parseFloat(formData.minimumTopUp)
        : null,
    };

    const result = await dispatch(
      updateLounge({ loungeId: editingLoungeId, updatedData: sanitizedData })
    );
    if (updateLounge.fulfilled.match(result)) {
      toast.success(`${formData.name} updated successfully!`);
      setShowModal(false);
      setFormData({
        name: "",
        location: "",
        description: "",
        chapaPublicKey: "",
        providesPrepaid: false,
        discountPercentage: "",
        minimumTopUp: "",
        additionalInfo: "",
        providesDelivery: false,
        imageUrl:
          "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80",
      });
      setEditingLoungeId(null);
      setIsEditing(false);
      dispatch(fetchAllLounges());
    } else {
      toast.error(`Failed to update ${formData.name}.`);
    }
  };

  const handleDelete = async (loungeId) => {
    if (window.confirm("Are you sure you want to delete this lounge?")) {
      const result = await dispatch(deleteLounge(loungeId));
      if (deleteLounge.fulfilled.match(result)) {
        toast.success("Lounge deleted successfully!");
        dispatch(fetchAllLounges());
      } else {
        toast.error("Failed to delete lounge.");
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 fw-bold">Lounges</h1>
          <p className="text-muted">Manage your lounges and their details</p>
        </div>
        <button
          style={{ backgroundColor: "#1F3A77", color: "#fff", border: "none" }}
          className="btn d-flex align-items-center"
          onClick={() => {
            setIsEditing(false);
            setEditingLoungeId(null);
            setFormData({
              name: "",
              location: "",
              description: "",
              chapaPublicKey: "",
              providesPrepaid: false,
              discountPercentage: "",
              minimumTopUp: "",
              additionalInfo: "",
              providesDelivery: false,
              imageUrl:
                "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=1200&q=80",
            });
            setShowModal(true);
          }}
        >
          <Plus size={19} className="me-2" /> Add Lounge
        </button>
      </div>

      <div className="mb-4 position-relative">
        <input
          type="text"
          className="form-control ps-5"
          placeholder="Search lounges..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search
          className="position-absolute top-50 translate-middle-y ms-3 text-secondary"
          size={18}
        />
      </div>

      <div className="row">
        {filteredLounges.length > 0 ? (
          filteredLounges.map((lounge) => (
            <div className="col-md-6 col-lg-4 mb-4" key={lounge.loungeId}>
              <div
                className="card h-100"
                onClick={() => handleEdit(lounge.loungeId)}
              >
                <img
                  src={lounge.imageUrl}
                  className="card-img-top"
                  alt={lounge.name}
                />
                <div className="card-body text-dark">
                  <h5 className="card-title text-primary fw-bold">
                    {lounge.name}
                  </h5>
                  <p className="card-text lead">{lounge.description}</p>
                  <p className="text-primary-emphasis mb-1">
                    Location: {lounge.location}
                  </p>
                  {lounge.providesPrepaid && (
                    <div className="mb-2">
                      <p className="text-success  mb-1">
                        Prepaid Available
                      </p>
                      {parseFloat(lounge.discountPercentage) > 0 ? (
                        <p className="text-success  mb-1">
                          Discount: {lounge.discountPercentage}%
                        </p>
                      ) : (
                        <p className="text-danger  mb-1">
                          No discount available
                        </p>
                      )}

                      {parseFloat(lounge.minimumTopUp) > 0 ? (
                        <p className="text-primary-emphasis  mb-1">
                          Min Top-up: {lounge.minimumTopUp}
                        </p>
                      ) : (
                        <p className="text-primary-emphasis  mb-1">
                          No minimum top-up required
                        </p>
                      )}

                      <p className="text-primary-emphasis  mb-1">
                        {lounge.additionalInfo}
                      </p>
                    </div>
                  )}

                  <div className="d-flex justify-content-between mt-auto pt-2">
                    {" "}
                    {/* Added mt-auto and pt-2 for spacing */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(lounge.loungeId);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(lounge.loungeId);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-5 col-12">
            <div className="mb-3">
              <Search size={32} className="text-secondary" />
            </div>
            <h5>No lounges found</h5>
            <p className="text-muted">
              Try adjusting your search or add a new lounge.
            </p>
            <button
              className="btn"
              style={{ backgroundColor: "#1F3A77", color: "#fff" }}
              onClick={() => setShowModal(true)}
            >
              <Plus size={16} className="me-2" /> Add Lounge
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? "Edit Lounge" : "Add New Lounge"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Lounge name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lounge location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lounge description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Chapa Public Key</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.chapaPublicKey}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        chapaPublicKey: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <input
                    type="checkbox"
                    checked={formData.providesDelivery}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        providesDelivery: e.target.checked,
                      })
                    }
                  />
                  <label>Provides Delivery</label>
                </div>

                <div className="mb-3">
                  <input
                    type="checkbox"
                    checked={formData.providesPrepaid}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        providesPrepaid: e.target.checked,
                      })
                    }
                  />
                  <label className="form-label">Provides Prepaid Service</label>
                </div>

                {formData.providesPrepaid && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Discount Percentage</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        value={formData.discountPercentage}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            discountPercentage: e.target.value,
                          })
                        }
                        placeholder="Discount %"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Minimum Top Up</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        value={formData.minimumTopUp}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            minimumTopUp: e.target.value,
                          })
                        }
                        placeholder="Minimum Top Up"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Additional Info</label>
                      <textarea
                        className="form-control"
                        value={formData.additionalInfo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            additionalInfo: e.target.value,
                          })
                        }
                        placeholder="Additional Info"
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setIsEditing(false);
                    setEditingLoungeId(null);
                  }}
                >
                  Cancel
                </button>

                <button
                  className="btn"
                  style={{ backgroundColor: "#FF6B1C", color: "#fff" }}
                  onClick={isEditing ? handleUpdateLounge : handleAddLounge}
                >
                  {isEditing ? "Update Lounge" : "Add Lounge"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoungeManagement;
