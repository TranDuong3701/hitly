const express = require("express");
const urlController = require("./../controllers/urlController");

const router = express.Router();

router.route("/").get(urlController.getAllUrls).post(urlController.createUrl);
router.route("/:code").get(urlController.getUrl);

router
    .route("/:id")
    .patch(urlController.updateUrl)
    .delete(urlController.deleteUrl);

module.exports = router;
