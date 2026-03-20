const AIAssistantModel = require("../../models/aiAssistant.schema");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.create = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question || typeof question !== "string" || question.trim().length === 0) {
            return res.status(400).json({ error: "Question is required" });
        }

        // call Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(question);

        // note: SDK shape may vary — common pattern: result.response.text() or result.output_text
        // try both safe fallback:
        let answer = "";
        try {
            answer = (result?.response?.text && result.response.text()) || result?.output_text || result?.text || "";
        } catch (e) {
            // if result.response.text() throws, fallback
            answer = result?.output_text || result?.text || "";
        }

        if (!answer) answer = "No response from AI.";

        // save to MongoDB
        const chat = new AIAssistantModel({ question: question.trim(), answer });
        await chat.save();

        return res.status(201).json({ message: "AI response saved", chat });
    } catch (error) {
        console.error("Error in create:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.view = async (req, res) => {
    try {
        const chats = await AIAssistantModel.find().sort({ createdAt: -1 });
        return res.json(chats);
    } catch (error) {
        console.error("Error in view:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.delete = async (req, res) => {
    console.log(req.params);
    try {

        const { id } = req.params;
        const chat = await AIAssistantModel.findByIdAndDelete(id);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }
        return res.json({ message: "Chat deleted successfully" });
    } catch (error) {
        console.error("Error in delete:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
