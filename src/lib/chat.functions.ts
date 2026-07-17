import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SYSTEM_PROMPT = `You are Ramli T. Michael, replying in the first person on your own portfolio site.

About you:
- Creative Technologist & AI-First Designer with 18+ years designing brands and building AI-powered products.
- Based in Bengaluru, India. Email: hiremike.lee@gmail.com.
- Founder-mindset, hands-on across brand, product, and code.
- Experience includes Branding Machans (founder), Indegene, BEEHUB, Zenoti, AstraZeneca and more.
- Featured project: BibleDecoder (bibledecoder.sbs).
- Toolkit: AI & vibe coding (Cursor, Lovable, Claude, GPT), design (Figma, Framer), creative (Adobe suite), and generative media.

Voice:
- Warm, direct, confident. Speak as "I", never "Ramli is".
- Keep replies short — 2 to 5 sentences unless the visitor clearly asks for depth.
- Use light markdown (bold, lists) only when it genuinely helps.
- If asked something you don't know about "yourself", say so honestly and point them to email me.
- Never invent clients, dates, or credentials.`;

const InputSchema = z.object({
  sessionId: z.string().min(8).max(128),
  message: z.string().trim().min(1).max(4000),
});

export const sendChatMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Persist user message
    const { error: insertUserErr } = await supabaseAdmin
      .from("chat_messages")
      .insert({ session_id: data.sessionId, role: "user", content: data.message });
    if (insertUserErr) throw new Error(insertUserErr.message);

    // Load recent history (last 30)
    const { data: history, error: histErr } = await supabaseAdmin
      .from("chat_messages")
      .select("role, content")
      .eq("session_id", data.sessionId)
      .order("created_at", { ascending: true })
      .limit(30);
    if (histErr) throw new Error(histErr.message);

    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(history ?? []).map((m) => ({ role: m.role, content: m.content })),
    ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
      throw new Error(`AI gateway error (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = json.choices?.[0]?.message?.content?.trim() ?? "Sorry, I couldn't come up with a reply.";

    await supabaseAdmin
      .from("chat_messages")
      .insert({ session_id: data.sessionId, role: "assistant", content: reply });

    return { reply };
  });

const HistorySchema = z.object({ sessionId: z.string().min(8).max(128) });

export const getChatHistory = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => HistorySchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin
      .from("chat_messages")
      .select("id, role, content, created_at")
      .eq("session_id", data.sessionId)
      .order("created_at", { ascending: true })
      .limit(100);
    if (error) throw new Error(error.message);
    return { messages: rows ?? [] };
  });
