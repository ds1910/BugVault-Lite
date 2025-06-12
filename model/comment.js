const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    bug: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'bug',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('comment', commentSchema);
