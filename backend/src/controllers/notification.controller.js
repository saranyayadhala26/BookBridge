const Notification = require("../models/notification");

// Get all notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user.id,
    })
      .populate("sender", "fullName email")
      .populate("book", "title coverImage")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;

    await notification.save();

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const deleteNotification = async (req, res) => {
  try {

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await notification.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getUnreadCount = async (req, res) => {
  try {

    const count = await Notification.countDocuments({
      recipient: req.user.id,
      isRead: false,
    });

    return res.status(200).json({
      success: true,
      unreadCount: count,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getNotifications,
  markAsRead,
  deleteNotification,
  getUnreadCount,
};