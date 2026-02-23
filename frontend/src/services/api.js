const rawApiBase = import.meta.env.VITE_API_URL;
const normalizedApiBase = (rawApiBase || "/api").replace(/\/$/, "");
const API_BASE = normalizedApiBase || "/api";

function toUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (/^\/api(\/|$)/.test(normalizedPath)) return normalizedPath;
  return `${API_BASE}${normalizedPath}`;
}

async function parseResponseBody(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  const text = await response.text();
 if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function apiRequest(path, options = {}) {

const config = {
    ...options,
 headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  };

  if (config.body && typeof config.body !== "string") {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(toUrl(path), config);
  const payload = await parseResponseBody(response);

  if (!response.ok) {
    if (
      response.status === 404 &&
      typeof payload === "string" &&
      payload.includes("NOT_FOUND")
    ) {
      throw new Error(
        `API_NOT_FOUND: ${response.url}. Configurá Vercel Root Directory en la raíz del repo (no en frontend) para exponer /api/*.`
      );
    }

    const message =
      (payload && typeof payload === "object" && (payload.error || payload.message)) ||
      (typeof payload === "string" && payload) ||
      `Error HTTP ${response.status}`;
    throw new Error(message);
  }

  return payload;
}
