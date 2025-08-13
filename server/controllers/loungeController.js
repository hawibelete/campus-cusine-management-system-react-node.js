import {
  getAllLounges,
  getLoungeById,
  createLounge,
  updateLounge,
  deleteLounge,
  getLoungesWithRating,
} from "../models/loungeModel.js";

export const fetchAllLounges = async (req, res) => {
  try {
    const lounges = await getAllLounges();
    res.status(200).json(lounges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchLoungesWithRating = async (req, res) => {
  try {
    const lounges = await getLoungesWithRating();
    if (!lounges || lounges.length === 0) {
      return res.status(404).json({ message: "No lounges found" });
    }
    res.json(lounges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching lounges" });
  }
};

export const fetchLoungeById = async (req, res) => {
  try {
    console.log("Fetching lounge with ID:", req.params.id);
    const lounge = await getLoungeById(req.params.id);
    if (!lounge) return res.status(404).json({ message: "Lounge not found" });
    res.status(200).json(lounge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createNewLounge = async (req, res) => {
  try {
    const {
      name,
      location,
      description,
      chapaPublicKey,
      providesPrepaid,
      imageUrl,
      discountPercentage,
      minimumTopUp,
      additionalInfo,
      providesDelivery,
    } = req.body;

    const addedAt = new Date().toISOString().split("T")[0];

    const newLounge = await createLounge(
      name,
      location,
      description,
      addedAt,
      chapaPublicKey,
      providesPrepaid,
      imageUrl,
      discountPercentage,
      minimumTopUp,
      additionalInfo,
      providesDelivery
    );

    res.status(201).json(newLounge);
  } catch (error) {
    console.error("❌ Lounge creation failed:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateLoungeById = async (req, res) => {
  try {
    const {
      name,
      location,
      description,
      chapaPublicKey,
      providesPrepaid,
      imageUrl,
      discountPercentage,
      minimumTopUp,
      additionalInfo,
      providesDelivery,
    } = req.body;

    if (!name || !location || !description) {
      return res
        .status(400)
        .json({ message: "Name, location, and description are required." });
    }

    if (
      discountPercentage !== undefined &&
      (isNaN(discountPercentage) ||
        discountPercentage < 0 ||
        discountPercentage > 100)
    ) {
      return res.status(400).json({ message: "Invalid discount percentage." });
    }

    if (
      minimumTopUp !== undefined &&
      (isNaN(minimumTopUp) || minimumTopUp < 0)
    ) {
      return res.status(400).json({ message: "Invalid minimum top-up value." });
    }

    const updated = await updateLounge(
      req.params.id, 
      name,
      location,
      description,
      chapaPublicKey,
      providesPrepaid,
      imageUrl,
      discountPercentage,
      minimumTopUp,
      additionalInfo,
      providesDelivery
    );

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Lounge not found or no changes made" });
    }
    const updatedLounge = await getLoungeById(req.params.id);

    return res.status(200).json(updatedLounge);
  } catch (error) {
    console.error("❌ Lounge update failed:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteLoungeById = async (req, res) => {
  try {
    const deleted = await deleteLounge(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Lounge not found" });
    res.status(200).json({ message: "Lounge deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
