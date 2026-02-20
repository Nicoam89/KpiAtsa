const rawApiBase = import.meta.env.VITE_API_URL;
const normalizedApiBase = (rawApiBase || "/api").replace(/\/$/, "");
const API_BASE = normalizedApiBase || "/api";

function toUrl(path) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (/^\/api(\/|$)/.test(normalizedPath)) {
    return normalizedPath;
  }

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

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
