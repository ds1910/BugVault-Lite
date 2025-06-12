const express = require("express");
const {
  handleCreateNewComment,
  handleGetCommentById,
  handleUpdateCommentById,
  handleDeleteCommentById,
} = require("../controller/comment");

const router = express.Router();

router.route("/").post(handleCreateNewComment);
router
  .route("/:id")
  .get(handleGetCommentById)
  .patch(handleUpdateCommentById)
  .delete(handleDeleteCommentById);

module.exports = router;
