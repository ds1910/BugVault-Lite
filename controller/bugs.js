const express = require("express");
const Bug = require("../model/bug");

const handelCreateNewBug = async (req, res) => {
  const { title, description, tags, status, priority } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "Title and Description are required" });
  }

  try {
    await Bug.create({ title, description, tags, status, priority });
    return res.status(201).json({ message: "Bug creation successful" });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong during bug creation" });
  }
};

const handelGetAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find({});
    return res.status(200).json({ bugs });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch bugs" });
  }
};

const handelGetBugById = async (req, res) => {
  const bugId = req.params.id;

  try {
    const bug = await Bug.findById(bugId);

    if (!bug) {
      return res.status(404).json({ error: "Bug not found" });
    }

    return res.status(200).json(bug);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const handelUpdateBugById = async (req, res) => {
  const bugId = req.params.id;
  const updatedData = req.body;

  try {
    const bug = await Bug.findById(bugId);

    if (!bug) {
      return res.status(404).json({ error: "Bug not found" });
    }

    Object.assign(bug, updatedData);
    await bug.save();

    return res.status(200).json({ message: "Bug updated successfully", bug });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const handelDeleteBugById = async (req, res) => {
  const bugId = req.params.id;

  try {
    const bug = await Bug.findById(bugId);

    if (!bug) {
      return res.status(404).json({ error: "Bug not found" });
    }

    await bug.deleteOne();

    return res.status(200).json({ message: "Bug deleted successfully", bug });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const handelUpdateBugStatusById = async (req, res) => {
  const bugId = req.params.id;
  const { updatedStatus } = req.body;

  try {
    const bug = await Bug.findById(bugId);

    if (!bug) {
      return res.status(404).json({ error: "Bug not found" });
    }

    bug.status = updatedStatus;
    await bug.save();

    return res.status(200).json({ message: "Bug status updated successfully", bug });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const handelAssingUserToBug = async (req, res) => {
  const { userId } = req.body;
  const bugId = req.params.id;

  try {
    const bug = await Bug.findById(bugId);

    if (!bug) {
      return res.status(404).json({ error: "Bug not found" });
    }

    bug.assignedTo = userId;
    await bug.save();

    return res.status(200).json({ message: "User assigned to bug successfully", bug });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

const handelGetAllBugsOfUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const bugs = await Bug.find({ assignedTo: userId });

    if (!bugs || bugs.length === 0) {
      return res.status(404).json({ error: "No bugs found for this user" });
    }

    return res.status(200).json({ bugs });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch bugs" });
  }
};

module.exports = {
  handelCreateNewBug,
  handelGetAllBugs,
  handelGetBugById,
  handelUpdateBugById,
  handelDeleteBugById,
  handelUpdateBugStatusById,
  handelAssingUserToBug,
  handelGetAllBugsOfUser,
};
