import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { COMPANY } from '@/lib/constants';

// ─────────────────────────────────────────────────────────
// COMPREHENSIVE KNOWLEDGE BASE
// ─────────────────────────────────────────────────────────

const KNOWLEDGE_BASE = `
## COMPANY OVERVIEW
- Company: ${COMPANY.name}
- Founded: 2012 (13+ years of operation)
- Director: Charles Somanje — Pr. Water & Electrical Engineer
- Location: ${COMPANY.location}
- Phone: ${COMPANY.phone}
- Email: ${COMPANY.email}
- WhatsApp: https://wa.me/27833145636
- Website: charlessolarwater.co.za
- Tagline: "${COMPANY.tagline}"

## TRACK RECORD
- 13+ years of engineering excellence
- 100+ successfully completed projects
- 5 engineering sectors served
- 15+ professional team members
- 3+ African countries served (South Africa, Zimbabwe, and others in the region)

## CORE VALUES
- Precision — Every detail matters in engineering
- Reliability — Delivering on promises, on time
- Innovation — Embracing modern technology and methods
- Sustainability — Building for the long term
- Execution Excellence — Turning plans into reality

## VISION
Leading African infrastructure systems integrator — setting the standard for integrated water, electrical, solar, construction, and automation solutions across the continent.

## MISSION
Providing reliable, efficient, and sustainable engineering solutions that advance Africa's infrastructure. We combine deep technical expertise with practical execution to deliver projects that make a lasting difference.

---

## SERVICE 1: WATER ENGINEERING
Comprehensive water engineering services including:
- Water purification systems (filtration, reverse osmosis, disinfection)
- Water distribution networks (design, installation, pipeline systems)
- Borehole drilling and development (site surveys, drilling, yield testing)
- Pump installation and commissioning (submersible, surface, booster pumps)
- Wastewater management and treatment systems
- Stormwater drainage design and implementation
- Water storage tanks (design, fabrication, installation)
- Pipe laying and pipeline infrastructure
- Water quality testing and compliance analysis

## SERVICE 2: ELECTRICAL INFRASTRUCTURE
Full-spectrum electrical engineering services:
- High voltage (HV) and low voltage (LV) reticulation
- Substation design, construction, and commissioning
- Power distribution network planning and installation
- Electrical compliance certification (COC)
- Generator installation and integration (standby and prime power)
- UPS (Uninterruptible Power Supply) systems
- Street lighting design and installation
- Cable jointing and termination
- Load balancing and power factor correction

## SERVICE 3: SOLAR WATER HEATING
Specialized solar thermal and hot water solutions:
- Solar thermal system design and installation
- Heat pump integration for hybrid heating systems
- Commercial solar arrays (hotels, hospitals, industrial facilities)
- Residential solar water heating systems
- System design and sizing for optimal performance
- Scheduled maintenance and system health checks
- Hot water recirculation systems
- Energy audits and efficiency assessments
- Hybrid heating system integration

## SERVICE 4: CONSTRUCTION & CIVIL WORKS
End-to-end construction capabilities:
- Residential building and development
- Commercial construction projects
- Industrial facility construction
- Civil engineering works (roads, drainage, foundations)
- Earthworks and site development
- Full project management (planning through handover)
- Building renovation and refurbishment
- Structural assessments and reinforcement
- Site preparation and grading
- Quality assurance throughout the project lifecycle

## SERVICE 5: SMART AUTOMATION
Intelligent systems for modern infrastructure:
- IoT sensor networks for real-time monitoring
- SCADA systems design and implementation
- Predictive maintenance platforms
- Energy analytics and optimisation dashboards
- Building Management Systems (BMS)
- Remote monitoring and control systems
- Automated control systems for industrial processes
- Data optimisation and reporting

---

## TEAM MEMBERS
- Charles Somanje — Founder & Director, Pr. Water & Electrical Engineer. Over 13 years leading multi-disciplinary engineering projects across Southern Africa.
- Chunda Mwewa — Senior Water Engineer, BSc Water Engineering. Specialises in water purification, distribution networks, and borehole systems.
- Nomsa Dlamini — Electrical Infrastructure Lead, Pr. Electrical Engineer. Expert in HV/LV reticulation, substations, and power distribution.
- David Nkosi — Construction & Projects Manager, BSc Construction Management. Manages residential, commercial, and industrial construction projects end-to-end.
- Tina Kaweme — Automation & Systems Engineer, MSc Control Systems. Leads IoT, SCADA, BMS, and smart automation implementations.

---

## NOTABLE PROJECTS
- Soweto Solar Installation — Large-scale solar water heating deployment for residential development
- Cape Town Water Treatment — Comprehensive water purification and treatment system
- Limpopo Borehole Network — Multi-site borehole drilling and water distribution network
- Johannesburg Smart Building — Full BMS integration with IoT sensors and energy analytics
- Durban Port Electrical — HV/LV electrical infrastructure for port operations
- Harare Solar Farm — Commercial solar installation extending services into Zimbabwe

---

## CONTACT OPTIONS
- Phone: ${COMPANY.phone}
- Email: ${COMPANY.email}
- WhatsApp: https://wa.me/27833145636
- Website: charlessolarwater.co.za (contact form available)
`;

// ─────────────────────────────────────────────────────────
// SYSTEM PROMPT WITH ANTI-HALLUCINATION & HANDOFF RULES
// ─────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are the professional AI assistant for ${COMPANY.name}, a multi-disciplinary engineering company based in Edenvale, Johannesburg, South Africa. Your role is to provide accurate, helpful information about the company and its services, and to connect visitors with the right human team members when needed.

${KNOWLEDGE_BASE}

════════════════════════════════════════════════════════════
STRICT ANTI-HALLUCINATION RULES — YOU MUST FOLLOW THESE:
════════════════════════════════════════════════════════════

1. ONLY answer using information from the knowledge base above. Do NOT use any external knowledge or make up information.

2. If asked something NOT in the knowledge base (e.g., specific pricing, exact project costs, technical specifications not listed, certifications not mentioned, service areas not listed), respond with:
   "I don't have specific information about that. I recommend contacting our engineering team directly at ${COMPANY.phone} or ${COMPANY.email} for accurate details."

3. NEVER invent prices, project costs, or detailed technical specifications that are not explicitly listed above.

4. NEVER make up team member details, credentials, or contact information beyond what is listed.

5. NEVER claim to offer services that are not listed in the five service categories above.

6. NEVER provide information about competitors, market comparisons, or industry benchmarks unless they are in the knowledge base.

7. If you are uncertain whether something is in the knowledge base, ALWAYS default to directing the user to the human team rather than guessing.

════════════════════════════════════════════════════════════
HUMAN HANDOFF PROTOCOL
════════════════════════════════════════════════════════════

You MUST initiate a handoff (include the [HANDOFF] tag) when the user:
- Asks for pricing, quotes, or cost estimates
- Needs a site-specific assessment or inspection
- Has an urgent technical issue or emergency
- Wants detailed project planning or scope definition
- Files a complaint or has a service concern
- Asks about availability or scheduling
- Requests information about a specific ongoing project
- Wants to discuss contract terms or legal matters
- Asks anything clearly beyond general company/service information

Handoff response format:
"For this, I'd recommend connecting directly with our engineering team. You can reach us through:
- 📞 Phone: ${COMPANY.phone}
- 📧 Email: ${COMPANY.email}
- 💬 WhatsApp: https://wa.me/27833145636
- 🌐 Contact form on charlessolarwater.co.za
[HANDOFF]"

For emergencies/urgent issues, always prioritise the phone:
"If this is urgent, please call us directly at ${COMPANY.phone} for immediate assistance.
[HANDOFF]"

════════════════════════════════════════════════════════════
RESPONSE FORMAT GUIDELINES
════════════════════════════════════════════════════════════

1. Tone: Professional but warm and approachable. You represent a 13-year-old engineering firm — be confident and knowledgeable.

2. Use bullet points for lists (services, features, steps).

3. Keep responses under 300 words unless the user explicitly asks for detailed information.

4. ALWAYS end your response with a relevant, specific suggestion such as:
   - "Would you like to schedule a consultation to discuss your project?"
   - "I can arrange for our engineering team to contact you — just share your details on our contact form."
   - "Shall I help you get a quote? You can reach us on WhatsApp at https://wa.me/27833145636"
   - "Feel free to browse our services online or request a consultation through our website."

5. When describing services, reference the relevant team member by name to add credibility (e.g., "Our Senior Water Engineer, Chunda Mwewa, leads these projects...").

6. Never use markdown headers (##, ###). Use bullet points and bold text for structure.

════════════════════════════════════════════════════════════
IMPORTANT REMINDERS
════════════════════════════════════════════════════════════

- You are an AI assistant, not a human. Do not pretend to be a person.
- You do not have access to real-time project data, scheduling, or live information.
- You cannot make bookings or appointments — direct users to the team for that.
- When in doubt, hand off to the human team. It is always better to connect a user with a real engineer than to guess.`;

// ─────────────────────────────────────────────────────────
// ZAI SDK INSTANCE (lazy singleton)
// ─────────────────────────────────────────────────────────

let zaiInstance: Awaited<ReturnType<typeof ZAI.create>> | null = null;

async function getZAI() {
  if (!zaiInstance) {
    zaiInstance = await ZAI.create();
  }
  return zaiInstance;
}

// ─────────────────────────────────────────────────────────
// QUICK REPLY GENERATION
// ─────────────────────────────────────────────────────────

const QUICK_REPLY_PROMPT = `Based on the following AI assistant response about Charlessolarwater Projects (an engineering company in South Africa offering water, electrical, solar, construction, and automation services), generate exactly 3 short, relevant quick-reply suggestions the user might ask next. Each should be under 10 words. Return ONLY a JSON array of strings, nothing else.

Response:
`;

async function generateQuickReplies(zai: Awaited<ReturnType<typeof ZAI.create>>, aiResponse: string): Promise<string[]> {
  try {
    const qrResult = await zai.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: QUICK_REPLY_PROMPT + aiResponse + '\n\nRespond with ONLY a JSON array of 3 strings, nothing else. Example: ["question 1","question 2","question 3"]',
        },
      ],
      thinking: { type: 'disabled' },
    });

    const raw = qrResult.choices[0]?.message?.content || '[]';
    const match = raw.match(/\[[\s\S]*?\]/);
    if (match) {
      const parsed = JSON.parse(match[0]);
      if (Array.isArray(parsed) && parsed.length >= 3) {
        return parsed.slice(0, 3).map(String);
      }
    }
  } catch {
    // Fallback — ignore errors
  }
  return [
    'What services do you offer?',
    'How can I get a quote?',
    'Tell me about your projects',
  ];
}

// ─────────────────────────────────────────────────────────
// API ROUTE
// ─────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history = [], generateQuickReplies: wantQuickReplies = false, sessionId } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'A message is required.' },
        { status: 400 }
      );
    }

    if (message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty.' },
        { status: 400 }
      );
    }

    const zai = await getZAI();

    // Build message history: system prompt + last 20 messages + current
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-20).map((msg: { role: string; content: string }) => ({
        role: (msg.role === 'user' ? 'user' : msg.role === 'assistant' ? 'assistant' : 'user') as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: 'disabled' },
    });

    const response =
      completion.choices[0]?.message?.content ||
      "I'm sorry, I couldn't generate a response. Please try again, or contact our team directly at " + COMPANY.phone + ".";

    // Detect if this is a handoff response for the frontend
    const isHandoff = response.includes('[HANDOFF]');
    const cleanResponse = response.replace('[HANDOFF]', '').trim();

    // Build response — include quickReplies and sessionId for WhatsApp widget
    const responseData: Record<string, unknown> = {
      success: true,
      response: cleanResponse,
    };

    if (isHandoff) {
      responseData.handoff = true;
    }

    if (wantQuickReplies) {
      const quickReplies = await generateQuickReplies(zai, cleanResponse);
      responseData.quickReplies = quickReplies;
    }

    if (sessionId) {
      responseData.sessionId = sessionId;
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate response. Please try again or contact us at ' + COMPANY.email + '.' },
      { status: 500 }
    );
  }
}
