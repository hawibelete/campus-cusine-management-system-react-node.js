import { getFeedback, getFeedbackByLounge, createFeedback } from "../models/feedbackModel.js";

export const fetchFeedback = async (req, res) => {
    try {
        let feedback;

        if (req.user.role === "lounge_staff") {
            const loungeId = req.user.loungeId;
            feedback = await getFeedbackByLounge(loungeId);
        } else {
            feedback = await getFeedback();
        }

        if (!feedback || feedback.length === 0) {
            return res.status(200).json({ message: "No feedback available." });
        }

        console.log("Feedback fetched successfully:", feedback);
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const submitFeedback = async (req, res) => {
    try {
        const { loungeId, message, rating } = req.body;

        if (!loungeId || !message || typeof rating !== "number") {
            return res.status(400).json({ message: "Lounge ID, message, and rating are required." });
        }

        const submittedAt = new Date().toISOString().split("T")[0];
        const userId = req.user.id; 

        const newFeedback = await createFeedback(userId, loungeId, message, rating, submittedAt);
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};