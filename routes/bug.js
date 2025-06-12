const express = require("express");

const {handelCreateNewBug,
       handelGetAllBugs,
       handelGetBugById,
       handelUpdateBugById,
       handelDeleteBugById,
       handelUpdateBugStatusById,
       handelAssingUserToBug,
       handelGetAllBugsOfUser,}  = require("../controller/bugs");

const router = express.Router();

router.route("/").post(handelCreateNewBug).get(handelGetAllBugs);

router.route("/:id").get(handelGetBugById).patch(handelUpdateBugById).delete(handelDeleteBugById);

router.route("/status/:id").patch(handelUpdateBugStatusById);

router.route("/assign/:id").patch(handelAssingUserToBug);

router.route("/user/:id").get(handelGetAllBugsOfUser);

module.exports = router;