import "dotenv/config";
import express from "express";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { createServer as createViteServer } from "vite";

const JWT_SECRET = process.env.JWT_SECRET || "eduflow-dev-secret-change-in-prod";
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

// In-memory user store
interface User {
  id: string; name: string; email: string; password: string; role: string; learningStyle?: string;
}
let users: User[] = [
  { id: "123", name: "Alex Johnson", email: "alex.j@student.edu", password: "", role: "student", learningStyle: "visual" },
  { id: "456", name: "Mr. Anderson", email: "mr.anderson@eduflow.edu", password: "", role: "teacher" },
];

let nextId = 457;

function authMiddleware(req: any, res: any, next: any) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return res.status(401).json({ error: "No token" });
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as any;
    req.userId = payload.sub;
    next();
  } catch { return res.status(401).json({ error: "Invalid token" }); }
}

const TUTOR_INSTRUCTION = `You are an AI Tutor for the EduFlow adaptive learning platform...`;

async function chatWithOpenRouter(message: string, context: string, attempt = 0): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY environment variable is required");
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [
        { role: "system", content: TUTOR_INSTRUCTION },
        { role: "user", content: `Course context: ${context}\n\nStudent: ${message}` },
      ],
    }),
  });
  if (res.status === 429 && attempt < 3) {
    const delay = [5, 15, 30][attempt] || 30;
    await new Promise(r => setTimeout(r, delay * 1000));
    return chatWithOpenRouter(message, context, attempt + 1);
  }
  if (!res.ok) throw new Error(`OpenRouter error ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ─── AUTH ───────────────────────────────────────────────────────────────────

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password) return res.status(400).json({ error: "name, email, password required" });
      if (users.find(u => u.email === email)) return res.status(409).json({ error: "Email already registered" });
      const hashed = await bcrypt.hash(password, 10);
      const id = String(nextId++);
      const user: User = { id, name, email, password: hashed, role: role || "student" };
      users.push(user);
      const token = jwt.sign({ sub: id, email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
      res.json({ userId: id, token, userProfile: { id, name, email, role: user.role } });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ error: "email and password required" });
      const user = users.find(u => u.email === email);
      if (!user || !user.password) return res.status(401).json({ error: "Invalid credentials" });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: "Invalid credentials" });
      const token = jwt.sign({ sub: user.id, email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
      res.json({ userId: user.id, token, userProfile: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  });

  app.post("/api/auth/google", async (req, res) => {
    try {
      const { credential } = req.body;
      if (!credential) return res.status(400).json({ error: "credential required" });
      let payload: any;
      if (googleClient) {
        const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: GOOGLE_CLIENT_ID });
        payload = ticket.getPayload();
      } else {
        // Dev mode: decode without verification
        payload = JSON.parse(Buffer.from(credential.split(".")[1], "base64url").toString());
      }
      const email = payload.email;
      let user = users.find(u => u.email === email);
      if (!user) {
        const id = String(nextId++);
        user = { id, name: payload.name || email, email, password: "", role: "student" };
        users.push(user);
      }
      const token = jwt.sign({ sub: user.id, email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
      res.json({ userId: user.id, token, userProfile: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err: any) { res.status(500).json({ error: err.message }); }
  });

  app.get("/api/auth/profile", authMiddleware, (req: any, res) => {
    const user = users.find(u => u.id === req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role, learningStyle: user.learningStyle });
  });

  app.put("/api/auth/profile", authMiddleware, (req: any, res) => {
    const user = users.find(u => u.id === req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;
    if (req.body.learningStyle) user.learningStyle = req.body.learningStyle;
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role, learningStyle: user.learningStyle });
  });

  // ─── TEACHER ALERTS ────────────────────────────────────────────────────────

  app.get("/api/teacher/:teacherId/alerts", (req, res) => {
    res.json([
      { name: "Alex Chen", acc: "55%", type: "academic", message: "Falling below 60% accuracy in recent modules." },
      { name: "Jordan Davis", acc: "52%", type: "academic", message: "Missing 3 consecutive assignments." },
      { name: "Casey Wilson", acc: "58%", type: "engagement", message: "Low login frequency this week." },
    ]);
  });

  // ─── EXISTING MOCK ENDPOINTS ───────────────────────────────────────────────

  app.post("/api/chat", async (req, res) => {
    try {
      const { message, context } = req.body;
      const reply = await chatWithOpenRouter(message, context || 'None');
      res.json({ reply });
    } catch (error: any) {
      console.error('OpenRouter Error:', error);
      res.status(500).json({ error: error.message || 'Failed to communicate with AI Tutor' });
    }
  });

  app.get("/api/courses", (req, res) => {
    res.json({
      courses: [
        { id: "MATH201", title: "Advanced Algebra", description: "Master complex equations.", lessons: 24, difficulty: "Intermediate", progress: 65, category: "Mathematics" },
        { id: "HIST105", title: "World History II", description: "Modern history.", lessons: 30, difficulty: "Beginner", progress: 30, category: "Humanities" },
      ]
    });
  });

  app.get("/api/courses/:courseId", (req, res) => {
    res.json({
      id: req.params.courseId, title: "Advanced Algebra", subject: "Mathematics",
      lessons: [{ id: "l1", title: "Introduction to Quadratics", type: "video" }],
      enrolledStudents: 150
    });
  });

  app.get("/api/student/:studentId/adaptive-path", (req, res) => {
    res.json({
      recommendedLessons: [{ id: "l2", title: "Factoring Techniques", difficulty: 5, reason: "You typically struggle with fractions." }],
      focusArea: "Fractions", nextLesson: { id: "l2", title: "Factoring Techniques", difficulty: 5 },
      estimatedCompletion: "2 weeks"
    });
  });

  app.post("/api/assessments/submit", (req, res) => {
    res.json({ questionId: req.body.questionId, isCorrect: true, score: 20, feedback: "Outstanding!" });
  });

  app.get("/api/teacher/:teacherId/classes", (req, res) => {
    res.json({ classes: [{ id: "c1", name: "Math 101 - Period 3", studentCount: 28, avgScore: 82, status: "On Track" }] });
  });

  app.get("/api/teacher/:teacherId/class/:classId/analytics", (req, res) => {
    res.json({
      studentPerformance: [
        { name: "Emma Thompson", accuracy: 94, lessonsCompleted: 12, lastActive: "2 hours ago" },
        { name: "Liam Garcia", accuracy: 88, lessonsCompleted: 11, lastActive: "Yesterday" },
        { name: "Alex Chen", accuracy: 55, lessonsCompleted: 8, lastActive: "3 days ago" }
      ],
      classAverage: 82, topPerformers: [{ name: "Emma Thompson", score: 94 }],
      needsSupport: [{ name: "Alex Chen", reason: "Falling below 60%", score: 55 }]
    });
  });

  app.get("/api/student/:studentId/gamification", (req, res) => {
    res.json({
      streak: 3,
      badges: [
        { id: 1, name: 'Top 10%', icon: 'Award', earned: true, color: 'orange' },
        { id: 2, name: 'Flawless', icon: 'Medal', earned: true, color: 'green' },
        { id: 3, name: 'Master', icon: 'Trophy', earned: false, color: 'blue' },
      ],
      streakHistory: [true, false, true, true, true, false, false],
    });
  });

  // ─── VITE ──────────────────────────────────────────────────────────────────

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => { res.sendFile(path.join(distPath, 'index.html')); });
  }

  app.listen(PORT, "0.0.0.0", () => console.log(`Server running on http://localhost:${PORT}`));
}

startServer();
