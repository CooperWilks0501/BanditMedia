// Cloudflare Worker — receives form submissions from the WilksMedia site
// and forwards them as email via Resend.
//
// Deploy: paste this into the Cloudflare dashboard Worker editor.
// Required env var (secret): RESEND_API_KEY
//
// Source of truth: this file in the repo. If you edit in the dashboard, sync
// the change back here so git history reflects what's deployed.

const FROM_ADDRESS = "WilksMedia Form <noreply@wilksmedia.com>";
const TO_ADDRESS = "cooper@wilksmedia.com";

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON" }, 400);
    }

    // Honeypot: bots fill hidden fields humans never see. Silently accept.
    if (body.website) {
      return jsonResponse({ ok: true });
    }

    const { name, email, company, projectType, budget, message } = body;

    if (!name || !email || !message) {
      return jsonResponse(
        { error: "Name, email, and message are required." },
        400,
      );
    }

    if (!isValidEmail(email)) {
      return jsonResponse({ error: "Please enter a valid email address." }, 400);
    }

    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        reply_to: email,
        subject: `New quote request from ${name}`,
        text: buildEmailBody({ name, email, company, projectType, budget, message }),
      }),
    });

    if (!resendResp.ok) {
      const err = await resendResp.text();
      console.error("Resend error:", resendResp.status, err);
      return jsonResponse(
        { error: "Failed to send. Try again or email cooper@wilksmedia.com directly." },
        502,
      );
    }

    return jsonResponse({ ok: true });
  },
};

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}

function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function buildEmailBody({ name, email, company, projectType, budget, message }) {
  return [
    "New quote request from wilksmedia.com:",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    projectType ? `Project type: ${projectType}` : null,
    budget ? `Budget: ${budget}` : null,
    "",
    "Message:",
    message,
    "",
    "---",
    `Reply directly to this email to respond to ${name}.`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
