const express = require("express");
const Comment = require("../model/comment");

const handleCreateNewComment = async (req, res) => {
  const { text, bugId, createdBy } = req.body;

  if (!text || !bugId || !createdBy) {
    return res.status(400).json({ error: "Text, bugId, and createdBy are required" });
  }

  try {
    await Comment.create({ text, bugId, createdBy });
    return res.status(201).json({ message: "Comment created successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong during comment creation" });
  }
};

const handleGetCommentById = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

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

    return res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const handleDeleteCommentById = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    await comment.deleteOne();

    return res.status(200).json({ message: "Comment deleted successfully", comment });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  handleCreateNewComment,
  handleGetCommentById,
  handleUpdateCommentById,
  handleDeleteCommentById,
};
