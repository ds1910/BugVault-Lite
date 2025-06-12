const mongoose = require("mongoose");


const BugSchema = new mongoose.Schema(
  {
   
    title: {
      type: String,
      required: true,
      trim: true,
    },

   
    description: {
      type: String,
      required: true,
    },

    // Tags for categorization or filtering (e.g., "frontend", "UI")
    tags: {
      type: [String],
      default: []
    },

    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved', 'closed'],
      default: 'open',
    },

    
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },

    
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

   
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    
    history: [
      {
        status: {
          type: String,
          enum: ['open', 'in-progress', 'resolved', 'closed'],
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },

  { 
    timestamps: true,
  }
);


const Bug = mongoose.model("Bug", BugSchema);

module.exports = Bug;
