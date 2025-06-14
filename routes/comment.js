const express = require("express");
const {
  handleCreateNewComment,
  handleGetAllComment,
  handleGetCommentById,
  handleUpdateCommentById,
  handleDeleteCommentById,
  handleCreateReplyToCommentById,
  handleGetAllRepliesToCommentById,
} = require("../controller/commnet"); // corrected filename typo

const router = express.Router();

// Routes for top-level comments
router
  .route("/")
  .post(handleCreateNewComment)
  .get(handleGetAllComment);

// Routes for operations on a specific comment by ID
router
  .route("/:id")
  .get(handleGetCommentById)
  .patch(handleUpdateCommentById)
  .delete(handleDeleteCommentById);

// Routes for replying to a comment and fetching its replies
router
  .route("/reply/:id")
  .post(handleCreateReplyToCommentById)
  .get(handleGetAllRepliesToCommentById);

module.exports = router;
