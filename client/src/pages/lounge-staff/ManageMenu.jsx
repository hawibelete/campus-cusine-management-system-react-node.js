import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  fetchMenuItems,
} from "@/redux/slices/lounge-staff/menuSlice";
import { Plus, Search } from "lucide-react";
import LoadingSpinner from "@/components/lounge-staff/LoadingSpinner";
import { toast } from "sonner"; 

const initialMenuItem = {
  menuItemId: "",
  name: "",
  description: "",
  price: 0,
  imageUrl: "https://placehold.co/200x150",
  availability: false,
};
import { useAuthCheck } from "@/hooks/useAuthCheck";

const ManageMenu = () => {
  useAuthCheck();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMenu = async () => {
      const result = await dispatch(fetchMenuItems());
      if (fetchMenuItems.rejected.match(result)) {
        toast.error("Failed to load menu items.");
      }
    };
    fetchMenu();
  }, [dispatch]);

  const [searchQuery, setSearchQuery] = useState("");
  const { items, loading, error } = useSelector((state) => state.menu);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(initialMenuItem);

  const filteredItems = items
    .map((item) => ({
      ...item,
      availability: Boolean(item.availability),
      price: parseFloat(item.price),
    }))
    .filter((item) => {
      const name = item.name?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";
      return (
        name.includes(searchQuery.toLowerCase()) ||
        description.includes(searchQuery.toLowerCase())
      );
    });

  console.log("Menu items:", items);
  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteModal(false);
    setCurrentItem(initialMenuItem);
  };

  const handleShowAddModal = () => {
    setCurrentItem(initialMenuItem);
    setShowAddModal(true);
  };

  const handleShowEditModal = (item) => {
    setCurrentItem(item);
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (item) => {
    setCurrentItem(item);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = e.target.checked;
      setCurrentItem((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "price") {
      setCurrentItem((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setCurrentItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddItem = async () => {
    const newId =
      Math.max(0, ...items.map((item) => parseInt(item.menuItemId))) + 1;
    const result = await dispatch(
      addMenuItem({ ...currentItem, menuItemId: newId.toString() })
    );
    if (addMenuItem.fulfilled.match(result)) {
      toast.success(`${currentItem.name} added successfully!`);
    } else {
      toast.error(`Failed to add ${currentItem.name}.`);
    }
    dispatch(fetchMenuItems());
    handleCloseModal();
  };

  const handleUpdateItem = async () => {
    const result = await dispatch(updateMenuItem(currentItem));
    if (updateMenuItem.fulfilled.match(result)) {
      toast.success(`${currentItem.name} updated successfully!`);
    } else {
      toast.error(`Failed to update ${currentItem.name}.`);
    }
    dispatch(fetchMenuItems());
    handleCloseModal();
  };

  const handleDeleteItem = async () => {
    const result = await dispatch(deleteMenuItem(currentItem.menuItemId));
    if (deleteMenuItem.fulfilled.match(result)) {
      toast.success(`${currentItem.name} deleted successfully!`);
    } else {
      toast.error(`Failed to delete ${currentItem.name}.`);
    }
    dispatch(fetchMenuItems());
    handleCloseModal();
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Menu</h1>
        <div className="d-flex gap-3">
          <Button
            variant="success"
            style={{
              backgroundColor: "#1F3A77",
              color: "#fff",
              border: "none",
            }}
            className="btn d-flex align-items-center"
            onClick={handleShowAddModal}
          >
            Add New Item
          </Button>
        </div>
      </div>

      <div className="mb-4 position-relative">
        <input
          type="text"
          className="form-control ps-5"
          placeholder="Search Menus..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search
          className="position-absolute top-50 translate-middle-y ms-3 text-secondary"
          size={18}
        />
      </div>

      {filteredItems.length === 0 ? (
        <div className="alert alert-info">No menu items found.</div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredItems.map((item) => (
            <Col key={item.menuItemId}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={item.imageUrl || "https://placehold.co/200x150"}
                  alt={item.name}
                />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <Card.Title>{item.name}</Card.Title>
                    <Badge bg={item.availability ? "success" : "danger"}>
                      {item.availability ? "Available" : "Unavailable"}
                    </Badge>
                  </div>
                  <Card.Text>ETB {Number(item.price).toFixed(2)}</Card.Text>
                  <Card.Text>{item.description}</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white border-top-0">
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleShowEditModal(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleShowDeleteModal(item)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showAddModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentItem.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={currentItem.description}
                onChange={handleInputChange}
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (ETB )</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={currentItem.price}
                onChange={handleInputChange}
                required
                min="0"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={currentItem.imageUrl}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="availability"
                label="Available"
                checked={currentItem.availability}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleAddItem}
            disabled={!currentItem.name || !currentItem.price}
          >
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Menu Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentItem.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={currentItem.description}
                onChange={handleInputChange}
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (ETB )</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="price"
                value={currentItem.price}
                onChange={handleInputChange}
                required
                min="0"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={currentItem.imageUrl}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="availability"
                label="Available"
                checked={currentItem.availability}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdateItem}
            disabled={!currentItem.name || !currentItem.price}
          >
            Update Item
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the following item?</p>
          <p className="fw-bold">{currentItem.name}</p>
          <p>This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteItem}>
            Delete Item
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

function Badge({ bg, children }) {
  return <span className={`badge bg-${bg}`}>{children}</span>;
}

export default ManageMenu;
