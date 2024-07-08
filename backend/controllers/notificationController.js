const NotificationRepository = require("../repositories/notificationRepository");

class NotificationController {
  constructor() {
    this.notification = new NotificationRepository();
  }

  getNotifications = async (req, res) => {
    try {
      const userId = req.params.userId;
      const notifications = await this.notification.getNotificationsbyUserId(userId);
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  addNotification = async (req, res) => {
    try {
      const {data} = req.body;
      const newNotification = await this.notification.addNotification(data);
      res.status(201).json(newNotification);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new NotificationController();
