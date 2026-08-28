const mongoose = require("mongoose");
const educatorSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
    },

    phone: {
      type: String,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
      unique: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase : true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["educator"],
      default: "educator",
    },
  },

  {
    timestamps: true,
  },
);

const educator = mongoose.model("educator", educatorSchema);
module.exports = educator;
