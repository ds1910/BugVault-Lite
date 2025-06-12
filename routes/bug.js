const express = require("express");
const router = express.Router();

router.route("/").post(handelCreateNewBug).get(handelGetAllBugs);

router.route("/:id").get(handelGetBugById).patch(handelUpdateBugById).delete(handelDeleteBugById);

router.route("/:id/status").patch(handelUpdateBugStatusById);

router.route("/:id/assign/:userId").patch(handelAssingUserToBug);

router.route("/user/:userId").get(handelGetAllBugsOfUser);
