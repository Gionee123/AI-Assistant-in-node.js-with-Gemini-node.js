const mongoose = require("mongoose");

const AIAssistantSchema = new mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AIAssistant", AIAssistantSchema);
