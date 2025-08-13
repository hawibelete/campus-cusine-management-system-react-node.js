import { createNotification, fetchNotificationsByUser, updateNotificationReadStatus, markAllNotificationsRead } from '../models/notificationModel.js';

export const respondToFeedback = async (req, res) => {
  const { userId, message, feedbackId } = req.body;

  if (!userId || !message || !feedbackId) {
    return res.status(400).json({ error: 'Missing userId, message, or feedbackId' });
  }

  try {
    await createNotification(userId, message, feedbackId);
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('Error creating notification:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserNotifications = async (req, res) => {
  const userId = req.user.id; 
console.log('User ID in controller:', userId);
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId query parameter' });
  }

  try {
    const notifications = await fetchNotificationsByUser(userId);
    console.log('Fetched notifications in the controller:', notifications);
    res.status(200).json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const markNotificationAsRead = async (req, res) => {
  const { id } = req.params;
console.log('Notification ID to mark as read:', id);
  try {
    await updateNotificationReadStatus(id);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  const userId = req.user.id; 
console.log('User ID in markAllNotificationsAsRead:', userId);
  try {
    await markAllNotificationsRead(userId);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error marking all notifications as read:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
