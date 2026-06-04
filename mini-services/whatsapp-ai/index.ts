import ZAI from "z-ai-web-dev-sdk";
import { Database } from "bun:sqlite";

// ─── Constants ──────────────────────────────────────────────────────────────
const PORT = 3004;
const MAX_HISTORY = 20;

// ─── System Prompt ─────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the AI assistant for Charlessolarwater Projects (CSWP), a multi-disciplinary engineering company based in Edenvale, Johannesburg, South Africa. You provide professional, accurate information and help guide potential clients.

COMPANY FACTS (ONLY use these — do NOT invent any information):
- Full Name: Charlessolarwater Projects
- Founded: 2012 (13+ years operating)
- Director: Charles Somanje (Pr. Water & Electrical Engineer)
- Location: Edenvale, Johannesburg, South Africa
- Phone: +27 83 314 5636
- Email: info@charlessolarwater.co.za
- WhatsApp: wa.me/27833145636
- Website: charlessolarwater.co.za
- Stats: 100+ projects delivered, 5 engineering sectors, 15+ team members, 3+ African countries

SERVICES (5 core sectors):
1. Water Engineering Systems — purification, municipal/industrial distribution, borehole drilling, pump installation, wastewater management, stormwater drainage, storage tanks, pipe laying/reticulation, water quality testing
2. Electrical Infrastructure — HV/LV reticulation, substation design, industrial power distribution, compliance certification, generator/UPS installation, street lighting, cable laying/jointing, load balancing, power factor correction
3. Solar Water Heating — solar thermal installations, heat pump integration, commercial solar arrays, system design/sizing, maintenance/optimization, hot water recirculation, energy audits, hybrid heating
4. Construction & Civil Works — residential/commercial/industrial building, civil engineering, earthworks, project management, renovation/refurbishment, structural assessments, site preparation, quality assurance
5. Smart Automation Systems — IoT sensor networks, SCADA monitoring, predictive maintenance, energy management/analytics, building management systems (BMS), remote monitoring dashboards, automated control, data-driven optimization

TEAM:
- Charles Somanje — Founder & Director, Pr. Water & Electrical Engineer. Multi-disciplinary expertise across water, electrical, construction, automation.
- Chunda Mwewa — Senior Water Engineer, BSc Water Engineering. Water purification, borehole design, municipal distribution.
- Nomsa Dlamini — Electrical Infrastructure Lead, Pr. Electrical Engineer. HV installations, reticulation, solar-integrated power.
- David Nkosi — Construction & Projects Manager, BSc Construction Management. End-to-end construction delivery.
- Tina Kaweme — Automation & Systems Engineer, MSc Control Systems. SCADA, IoT, BMS.

NOTABLE PROJECTS:
- Soweto Solar Installation (Gauteng) — 250kW commercial solar array for industrial facility, reduced energy costs by 40%
- Cape Town Water Treatment (Western Cape) — 50,000L/day purification plant serving 3 communities
- Limpopo Borehole Network (Limpopo) — 12-borehole network with solar-powered pumping for rural water supply
- Johannesburg Smart Building (Gauteng) — Full BMS with IoT monitoring across 15,000m² commercial building
- Durban Port Electrical (KwaZulu-Natal) — HV reticulation and substation upgrade for port facility
- Harare Solar Farm (Zimbabwe) — 500kW ground-mount solar farm with battery storage integration

VALUES: Precision, Reliability, Innovation, Sustainability, Execution Excellence
VISION: Leading African infrastructure systems integrator
MISSION: Deliver reliable, efficient, sustainable engineering solutions that empower communities and advance Africa's infrastructure

STRICT RULES:
1. NEVER hallucinate — only use information from the knowledge base above
2. If asked something NOT in this knowledge base, say: "I don't have specific information on that topic. For accurate details, please contact our engineering team at +27 83 314 5636 or info@charlessolarwater.co.za"
3. NEVER invent prices, costs, or technical specs not listed above
4. NEVER make up team member details, credentials, or contact info not listed
5. NEVER claim capabilities or services not listed above

HANDOFF PROTOCOL:
When the user needs any of the following, trigger a HUMAN HANDOFF:
- Pricing quotes or cost estimates
- Site-specific technical assessments
- Detailed project planning or scoping
- Urgent/emergency requests
- Complaints or disputes
- Legal or contractual questions
- Anything you're uncertain about

Handoff response format:
"I'd recommend connecting directly with our engineering team for this. They can provide accurate, project-specific guidance.

📞 Phone: +27 83 314 5636
✉️ Email: info@charlessolarwater.co.za
💬 WhatsApp: wa.me/27833145636
📋 Or use the contact form on our website"

Then append [HANDOFF] at the very end of your response.

QUICK REPLIES: Generate 3 relevant quick reply suggestions with each response. These should be follow-up questions the user might ask. Format as an array of strings.

RESPONSE STYLE:
- Professional but warm and approachable
- Use bullet points for lists
- Keep under 300 words unless asked for detail
- End with a relevant next step suggestion
- For WhatsApp: use simple formatting, avoid complex markdown`;

const QUICK_REPLY_PROMPT = `Based on the following AI assistant response about Charlessolarwater Projects (an engineering company in South Africa offering water, electrical, solar, construction, and automation services), generate exactly 3 short, relevant quick-reply suggestions the user might ask next. Each should be under 10 words. Return ONLY a JSON array of strings, nothing else.

Response:
`;

// ─── ZAI SDK Singleton ────────────────────────────────────────────────────
let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

// ─── Database Setup ─────────────────────────────────────────────────────────
const db = new Database("whatsapp-ai-sessions.db", { create: true });

db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS quick_replies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL,
    message_id INTEGER NOT NULL,
    reply_1 TEXT NOT NULL DEFAULT '',
    reply_2 TEXT NOT NULL DEFAULT '',
    reply_3 TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
  )
`);

// Prepared statements
const createSessionStmt = db.prepare(
  "INSERT INTO sessions (id) VALUES (?)"
);
const updateSessionStmt = db.prepare(
  "UPDATE sessions SET updated_at = datetime('now') WHERE id = ?"
);
const insertMessageStmt = db.prepare(
  "INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)"
);
const getMessagesStmt = db.prepare(
  "SELECT role, content FROM messages WHERE session_id = ? ORDER BY created_at ASC"
);
const pruneMessagesStmt = db.prepare(
  "DELETE FROM messages WHERE session_id = ? AND id NOT IN (SELECT id FROM messages WHERE session_id = ? ORDER BY created_at DESC LIMIT ?)"
);

// ─── Helpers ───────────────────────────────────────────────────────────────
const startTime = Date.now();

function generateSessionId(): string {
  return `wa_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

function jsonResponse(
  data: unknown,
  status = 200
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
    },
  });
}

interface ChatRequest {
  message: string;
  sessionId?: string;
  history?: Array<{ role: string; content: string }>;
}

function isHandoff(text: string): boolean {
  return text.includes("[HANDOFF]");
}

// ─── Quick Reply Generation ─────────────────────────────────────────────────
async function generateQuickReplies(
  aiResponse: string
): Promise<string[]> {
  try {
    const zai = await getZAI();
    const qrResult = await zai.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            QUICK_REPLY_PROMPT +
            aiResponse +
            '\n\nRespond with ONLY a JSON array of 3 strings, nothing else. Example: ["question 1","question 2","question 3"]',
        },
      ],
      thinking: { type: "disabled" },
    });

    const raw = qrResult.choices[0]?.message?.content || "[]";
    // Extract JSON array from the response (handle potential wrapping text)
    const match = raw.match(/\[[\s\S]*?\]/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed) && parsed.length >= 3) {
        return parsed.slice(0, 3).map(String);
      }
    }
  } catch (err) {
    console.error("[WhatsApp AI] Quick reply generation failed:", err);
  }

  // Fallback quick replies
  return [
    "What services do you offer?",
    "How can I get a quote?",
    "Tell me about your projects",
  ];
}

// ─── Chat Handler ───────────────────────────────────────────────────────────
async function handleChat(body: ChatRequest): Promise<Response> {
  const { message, sessionId: incomingSessionId, history } = body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return jsonResponse(
      { success: false, error: "Message is required" },
      400
    );
  }

  // Get or create session
  let sessionId = incomingSessionId || generateSessionId();

  try {
    createSessionStmt.run(sessionId);
  } catch {
    // Session already exists — that's fine
    updateSessionStmt.run(sessionId);
  }

  // Build conversation history
  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [];

  // 1. Always include system prompt
  messages.push({ role: "system", content: SYSTEM_PROMPT });

  // 2. Load stored history from DB
  const storedRows = getMessagesStmt.all(sessionId) as Array<{
    role: string;
    content: string;
  }>;
  for (const row of storedRows) {
    messages.push({
      role: row.role as "user" | "assistant",
      content: row.content,
    });
  }

  // 3. Merge any incoming history (from client) that's not already stored
  if (history && Array.isArray(history)) {
    const storedUserMessages = new Set(
      storedRows.filter((r) => r.role === "user").map((r) => r.content)
    );
    const storedAssistantMessages = new Set(
      storedRows
        .filter((r) => r.role === "assistant")
        .map((r) => r.content)
    );

    for (const msg of history) {
      if (msg.role === "user" && !storedUserMessages.has(msg.content)) {
        messages.push({ role: "user", content: msg.content });
      } else if (
        msg.role === "assistant" &&
        !storedAssistantMessages.has(msg.content)
      ) {
        messages.push({ role: "assistant", content: msg.content });
      }
    }
  }

  // 4. Add the current user message
  messages.push({ role: "user", content: message.trim() });

  // Store user message in DB
  insertMessageStmt.run(sessionId, "user", message.trim());

  // Call AI via ZAI SDK
  let aiResponse: string;
  try {
    const zai = await getZAI();
    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: "disabled" },
    });

    aiResponse =
      completion.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response. Please try again.";
  } catch (err) {
    console.error("[WhatsApp AI] AI call failed:", err);
    aiResponse =
      "I'm experiencing a temporary issue. Please try again or contact us directly at +27 83 314 5636.";
  }

  // Store assistant response in DB
  insertMessageStmt.run(sessionId, "assistant", aiResponse);

  // Prune history to last MAX_HISTORY messages
  pruneMessagesStmt.run(sessionId, sessionId, MAX_HISTORY);

  // Update session timestamp
  updateSessionStmt.run(sessionId);

  // Detect handoff
  const handoff = isHandoff(aiResponse);

  // Generate quick replies (best-effort, non-blocking fallback)
  const quickReplies = await generateQuickReplies(aiResponse);

  return jsonResponse({
    success: true,
    response: aiResponse,
    sessionId,
    quickReplies,
    handoff,
  });
}

// ─── Health Handler ──────────────────────────────────────────────────────────
function handleHealth(): Response {
  return jsonResponse({
    status: "ok",
    uptime: Math.floor((Date.now() - startTime) / 1000),
  });
}

// ─── Global Error Handlers ─────────────────────────────────────────────────
process.on("unhandledRejection", (reason) => {
  console.error("[WhatsApp AI] Unhandled rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("[WhatsApp AI] Uncaught exception:", err);
});

// ─── Server ────────────────────────────────────────────────────────────────
const server = Bun.serve({
  port: PORT,
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const method = req.method;

    try {
      // CORS preflight
      if (method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders() });
      }

      // Route: Health check
      if (url.pathname === "/api/health" && method === "GET") {
        return handleHealth();
      }

      // Route: Chat
      if (url.pathname === "/api/chat" && method === "POST") {
        try {
          const body: ChatRequest = await req.json();
          return await handleChat(body);
        } catch {
          return jsonResponse({ success: false, error: "Invalid JSON body" }, 400);
        }
      }

      // 404
      return jsonResponse({ error: "Not found" }, 404);
    } catch (err) {
      console.error("[WhatsApp AI] Fetch error:", err);
      return jsonResponse({ success: false, error: "Internal server error" }, 500);
    }
  },
});

console.log(`[WhatsApp AI] Service running on port ${PORT}`);
console.log(`[WhatsApp AI] Health: http://localhost:${PORT}/api/health`);
console.log(`[WhatsApp AI] Chat:   http://localhost:${PORT}/api/chat`);
