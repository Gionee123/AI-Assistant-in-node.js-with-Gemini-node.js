# 🤖 AI Assistant in Node.js with Gemini

A powerful RESTful backend API built with **Node.js** and **Express.js** that integrates **Google Gemini AI** to answer questions and persist conversation history in **MongoDB**.

---

## 📌 Features

- 🧠 **Gemini AI Integration** — Uses `gemini-2.5-flash` model to generate intelligent responses to user questions
- 💾 **MongoDB Storage** — Saves every Q&A pair to a MongoDB database via Mongoose
- 📜 **Conversation History** — Retrieve all past AI conversations sorted by most recent
- 🗑️ **Delete Chats** — Remove individual chat entries by ID
- 🔐 **Environment Variables** — Sensitive credentials managed securely with `.env`
- 🌐 **CORS Enabled** — Ready for cross-origin frontend integrations
- 🔄 **Nodemon Support** — Auto-restarts server on file changes during development

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework & routing |
| **Google Generative AI** (`@google/generative-ai`) | Gemini AI model integration |
| **Mongoose** | MongoDB ODM for schema and queries |
| **MongoDB Atlas** | Cloud database for storing chats |
| **dotenv** | Environment variable management |
| **cors** | Cross-Origin Resource Sharing middleware |
| **body-parser** | Request body parsing |
| **nodemon** | Auto-reload during development |

---

## 📂 Project Structure

```
node js/
├── server.js                          # App entry point — Express server + MongoDB connection
├── package.json                       # Project metadata and dependencies
├── .env                               # Environment variables (not committed to Git)
├── .gitignore                         # Files excluded from version control
└── src/
    ├── controllers/
    │   └── backend/
    │       └── aiAssistantcontroller.js   # Business logic (create, view, delete)
    ├── routes/
    │   └── backend/
    │       └── aiAssistant.routes.js      # API route definitions
    └── models/
        └── aiAssistant.schema.js          # Mongoose schema for chat records
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)
- A [Google AI Studio](https://aistudio.google.com/) account to get your Gemini API key

---

### 1. Clone the Repository

```bash
git clone https://github.com/Gionee123/AI-Assistant-in-node.js-with-Gemini-node.js.git
cd "AI Assistant in node.js with Gemini/node js"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
GEMINI_API_KEY=your_google_gemini_api_key
```

> ⚠️ **Never commit your `.env` file** to version control. It is already listed in `.gitignore`.

### 4. Start the Development Server

```bash
npx nodemon server.js
```

Or if nodemon is globally installed:

```bash
nodemon server.js
```

The server will start on `http://localhost:5000`

---

## 🌐 API Endpoints

Base URL: `http://localhost:5000/api/ask/AIAssistant`

### ➕ Ask a Question (Create)

**POST** `/ask`

Sends a question to the Gemini AI and saves the response to MongoDB.

**Request Body:**
```json
{
  "question": "What is artificial intelligence?"
}
```

**Success Response (201):**
```json
{
  "message": "AI response saved",
  "chat": {
    "_id": "64f3a...",
    "question": "What is artificial intelligence?",
    "answer": "Artificial intelligence (AI) refers to...",
    "createdAt": "2026-03-20T10:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Question is required"
}
```

---

### 📜 Get Chat History

**POST** `/history`

Returns all saved Q&A pairs, sorted by most recent first.

**Success Response (200):**
```json
[
  {
    "_id": "64f3a...",
    "question": "What is AI?",
    "answer": "AI stands for...",
    "createdAt": "2026-03-20T10:00:00.000Z"
  }
]
```

---

### 🗑️ Delete a Chat

**DELETE** `/delete/:id`

Deletes a specific chat entry by its MongoDB `_id`.

**Example:** `DELETE /api/ask/AIAssistant/delete/64f3a...`

**Success Response (200):**
```json
{
  "message": "Chat deleted successfully"
}
```

**Error Response (404):**
```json
{
  "error": "Chat not found"
}
```

---

## 🗃️ Database Schema

**Collection:** `AIAssistant`

| Field | Type | Required | Default |
|---|---|---|---|
| `question` | String | ✅ Yes | — |
| `answer` | String | ✅ Yes | — |
| `createdAt` | Date | ❌ No | `Date.now` |

---

## 🔒 Environment Variables Reference

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Port the server runs on (default: `5000`) |
| `GEMINI_API_KEY` | Your Google Gemini API key from AI Studio |

---

## 📦 Dependencies

```json
{
  "@google/generative-ai": "^0.24.1",
  "body-parser": "^2.2.0",
  "cors": "^2.8.5",
  "dotenv": "^16.6.1",
  "express": "^4.21.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.12.1",
  "multer": "^1.4.5-lts.1",
  "nodemailer": "^6.10.0",
  "razorpay": "^2.9.6"
}
```

---

## 🚀 Usage Example (with Postman or curl)

**Ask the AI a question:**

```bash
curl -X POST http://localhost:5000/api/ask/AIAssistant/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Explain machine learning in simple terms"}'
```

**Fetch conversation history:**

```bash
curl -X POST http://localhost:5000/api/ask/AIAssistant/history
```

**Delete a chat by ID:**

```bash
curl -X DELETE http://localhost:5000/api/ask/AIAssistant/delete/64f3abc123...
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a new feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Yogesh Saini**

- GitHub: [@Gionee123](https://github.com/Gionee123)

---

> 💡 **Tip:** This backend is designed to work alongside a frontend UI (e.g., a React/Next.js app). Use the API endpoints above to connect your frontend seamlessly.
