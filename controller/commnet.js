const Comment = require("../model/comment");

// Create a new root-level comment
const handleCreateNewComment = async (req, res) => {
  const { text, bugId, createdBy } = req.body;

  if (!text || !bugId || !createdBy) {
    return res.status(400).json({ error: "Text, bugId, and createdBy are required" });
  }

  try {
    const newComment = await Comment.create({
      text,
      bugId,
      createdBy,
      parentComment: null,
    });

    return res.status(201).json({
      message: "Comment created successfully",
      comment: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to create comment",
      details: error.message,
    });
  }
};

// Get all comments (root-level and replies)
const handleGetAllComment = async (req, res) => {
  try {
    const comments = await Comment.find({});
    if (!comments || comments.length === 0) {
      return res.status(404).json({ error: "Comment collection is empty" });
    }

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
};

// Get a single comment by ID
const handleGetCommentById = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
};

// Update a comment by ID
const handleUpdateCommentById = async (req, res) => {
  const commentId = req.params.id;
  const updatedData = req.body;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    Object.assign(comment, updatedData);
    await comment.save();

    return res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
};

// Delete a comment by ID
const handleDeleteCommentById = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    await comment.deleteOne();

    return res.status(200).json({
      message: "Comment deleted successfully",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
};

// Create a reply to an existing comment
const handleCreateReplyToCommentById = async (req, res) => {
  const parentCommentId = req.params.id;
  const { text, bugId, createdBy } = req.body;

  if (!text || !bugId || !createdBy) {
    return res.status(400).json({ error: "Text, bugId, and createdBy are required" });
  }

  try {
    const parent = await Comment.findById(parentCommentId);
    if (!parent) {
      return res.status(404).json({ error: "Parent comment not found" });
    }

    const reply = await Comment.create({
      text,
      bugId,
      createdBy,
      parentComment: parentCommentId,
    });

    return res.status(201).json({
      message: "Reply added successfully",
      reply,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to add reply",
      details: error.message,
    });
  }
};

// Helper function to get all nested replies recursively (DFS)
const getAllRepliesDFS = async (commentId, replies = []) => {
  const directReplies = await Comment.find({ parentComment: commentId });

  for (const reply of directReplies) {
    replies.push(reply);
    await getAllRepliesDFS(reply._id, replies); // Recursive call for deeper replies
  }

  return replies;
};

// Get all replies (nested) to a specific comment
const handleGetAllRepliesToCommentById = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const replies = await getAllRepliesDFS(commentId);
    return res.status(200).json({ replies });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch replies",
      details: error.message,
    });
  }
};

module.exports = {
  handleCreateNewComment,
  handleGetAllComment,
  handleGetCommentById,
  handleUpdateCommentById,
  handleDeleteCommentById,
  handleCreateReplyToCommentById,
  handleGetAllRepliesToCommentById,
};
