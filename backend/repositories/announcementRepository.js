const Announcement = require("../models/notableAchievementModel");
const crudRepo = require("./crud");

class announcementRepository extends crudRepo {
  constructor() {
    super(Announcement);
  }


}