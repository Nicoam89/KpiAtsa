const rawApiBase = import.meta.env.VITE_API_URL;
const normalizedApiBase = (rawApiBase || "/api").replace(/\/$/, "");
const API_BASE = normalizedApiBase || "/api";
const HAS_CUSTOM_API_BASE = Boolean(rawApiBase);

function toUrl(path) {
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!HAS_CUSTOM_API_BASE) {
    if (/^\/api(\/|$)/.test(normalizedPath)) return normalizedPath;
    return `${API_BASE}${normalizedPath}`;
  }

  const withoutApiPrefix = normalizedPath.replace(/^\/api(?=\/|$)/, "");
  return `${API_BASE}${withoutApiPrefix.startsWith("/") ? withoutApiPrefix : `/${withoutApiPrefix}`}`;
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

  const primaryUrl = toUrl(path);
  const response = await fetch(primaryUrl, config);
  const payload = await parseResponseBody(response);

  if (!response.ok) {
    const pathString = String(path || "");
    const canRetryWithoutApiPrefix =
      response.status === 404 &&
      typeof payload === "string" &&
      payload.includes("NOT_FOUND") &&
      /^\/api(\/|$)/.test(pathString);

    if (canRetryWithoutApiPrefix) {
      const fallbackPath = pathString.replace(/^\/api(?=\/|$)/, "") || "/";
      const fallbackUrl = toUrl(fallbackPath);
      const fallbackResponse = await fetch(fallbackUrl, config);
      const fallbackPayload = await parseResponseBody(fallbackResponse);

      if (fallbackResponse.ok) {
        return fallbackPayload;
      }
    }

    if (
      response.status === 404 &&
      typeof payload === "string" &&
      payload.includes("NOT_FOUND")
    ) {
      throw new Error(
        `API_NOT_FOUND: ${response.url}. Si tu backend corre fuera de Vercel (por ejemplo Firebase/Firestore), configurá VITE_API_URL con la URL base de esa API.`
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

