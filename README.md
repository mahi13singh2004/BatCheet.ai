# Demo Video : https://drive.google.com/file/d/1_JmrEHqeZ94Z_bEjjkOqiBfPr81PG6eZ/view?usp=sharing
# 🧠 BatCheet.ai – Your Smart Document Assistant 📄

“Chat with your files like they’re alive!”

BatCheet.ai is a full-stack AI-powered platform built with ❤️ using the MERN stack. It lets users upload PDFs or images, extracts text instantly, and allows seamless AI-powered conversations with those documents. Whether it’s a dense report or a handwritten note, BatCheet.ai makes your documents searchable, understandable, and chat-friendly. Interact with your documents using text input or hands-free voice input powered by the Web Speech API.

---

## 🛠 Tech Stack

- **Frontend:** React + Vite + Tailwind CSS  
- **State Management:** Zustand  
- **Backend:** Node.js + Express  
- **Database:** MongoDB + Mongoose  
- **Authentication:** JWT + bcrypt  
- **Text Extraction:** pdf-parse, Tesseract.js  
- **AI:** Gemini API (Google AI)  
- **File Uploads:** Multer  
- **Email Notifications:** Nodemailer  
- **Doc Memory:** Stored Q&A in DB  
- **Voice Input:** Web Speech API (built-in speech recognition)  

---

## ✨ Features

- 📤 **Upload and Extract:**  
  Upload PDFs or images → Instantly extract readable text using AI. No more endless scrolling — just clarity.

- 🤖 **Chat With Documents:**  
  Input Options:  
  - Text Input: Type your questions directly.  
  - Voice Input: Use the Web Speech API for hands-free interaction (supports en-US language, non-continuous recognition).  
  Ask questions like:  
  - "Summarize the second chapter."  
  - "What are the key financial figures?"  
  Our Gemini-powered AI reads and responds with context — like a personal analyst.

- 🧠 **Stored Q&A History:**  
  Your chats are saved per document. Revisit or resume previous conversations anytime.

- 📬 **Email Integration:**  
  Send document summaries to your email using Nodemailer, securely configured with SMTP credentials in environment variables.

- 🔐 **Auth & Access:**  
  JWT-authenticated routes ensure your documents and conversations remain private and secure. Each user has access only to their data.

- ⚡ **Smooth Developer Experience:**  
  Built with Vite + Zustand for fast performance and clean code structure.

---

## 🔐 Authentication

- Sign up/login with hashed passwords using bcrypt  
- JWT tokens protect API routes  
- User-specific access to documents and chat history  

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js v16 or higher  
- MongoDB (local or Atlas)  
- Gemini API Key  
- SMTP credentials (for email)  
- Modern browser supporting Web Speech API (e.g., Chrome, Edge)  

### 🛠 Installation

```bash
# Clone the repo
git clone https://github.com/your-username/batcheet-ai.git
cd batcheet-ai
```

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 🔐 Environment Setup

Create environment files for backend and frontend as below.

**backend/.env**

```env
# Backend environment variables
MONGO_URI=your_mongo_db_uri
PORT=5000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key

# Email configuration
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
```

**frontend/.env**

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

### 🚀 Run the App

Open two terminals and run:

**Terminal 1: Start backend server**

```bash
cd backend
npm run dev
```

**Terminal 2: Start frontend dev server**

```bash
cd frontend
npm run dev
```

Then open your browser at [http://localhost:3000](http://localhost:3000) (or the port Vite defaults to) and start uploading your documents!

---

## 📂 Folder Structure

```
batcheet-ai/
├── backend/
│   ├── controllers/    # Route handlers (auth, upload, chat)
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── middlewares/    # JWT/auth middleware
│   ├── utils/          # Gemini integration, mailer, etc.
│   └── config/         # DB connection, Nodemailer setup
├── frontend/
│   ├── components/     # UI components
│   ├── pages/          # Route-level components
│   ├── store/          # Zustand state logic
│   └── assets/         # Images, icons, etc.
```

---

## 🧑‍💻 Author

**Mahi Singh**  
Pre-final year @ Visvesvaraya Technological University

---

## 🤝 Contributions

Pull requests are welcome!  
If you’d like to propose a feature or enhancement, please open an issue to discuss it.

---

Feel free to reach out if you need any help setting up or contributing. Happy coding! 🚀
