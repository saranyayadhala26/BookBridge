const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");

const {
  getNotifications,
  markAsRead,
  deleteNotification,
  getUnreadCount,
} = require("../controllers/notification.controller");

router.get("/", protect, getNotifications);

router.get("/unread-count", protect, getUnreadCount);

router.put("/:id", protect, markAsRead);

router.delete("/:id", protect, deleteNotification);
module.exports = router;