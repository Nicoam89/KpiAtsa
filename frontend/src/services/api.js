const rawApiBase = import.meta.env.VITE_API_URL;
const normalizedApiBase = (rawApiBase || "/api").replace(/\/$/, "");
const API_BASE = normalizedApiBase || "/api";
const apiBaseAlreadyIncludesApiSegment = /\/api$/i.test(API_BASE);

function normalizePath(path) {
  return path.startsWith("/") ? path : `/${path}`;
}

function ensureApiPrefix(path) {
  const normalizedPath = normalizePath(path);

  if (/^\/api(\/|$)/.test(normalizedPath)) {
    return normalizedPath;
  }

  if (/^\/(auth|kpis)(\/|$)/.test(normalizedPath)) {
    return `/api${normalizedPath}`;
  }

  return normalizedPath;
}

function removeApiPrefix(path) {
  const normalizedPath = normalizePath(path);
  return normalizedPath.replace(/^\/api(?=\/|$)/, "") || "/";
}


function toUrl(path) {
  const normalizedPath = normalizePath(path);

  if (!apiBaseAlreadyIncludesApiSegment && /^\/(auth|kpis)(\/|$)/.test(normalizedPath)) {
    return `${API_BASE}${ensureApiPrefix(normalizedPath)}`;
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
}

function buildError(response, payload) {
  const message =
    (payload && typeof payload === "object" && (payload.error || payload.message)) ||
    (typeof payload === "string" && payload) ||
    `Error HTTP ${response.status}`;

  return new Error(message);
}

function shouldRetryWithAlternatePath(path, response, payload) {
  if (response.status !== 404) {
    return false;
  }

  if (!/^\/(api\/)?(auth|kpis)(\/|$)/.test(normalizePath(path))) {
    return false;
  }

  return typeof payload === "string" && payload.includes("Cannot ");
}

function getAlternatePath(path) {
  const normalizedPath = normalizePath(path);

  if (/^\/api(\/|$)/.test(normalizedPath)) {
    return removeApiPrefix(normalizedPath);
  }

  if (/^\/(auth|kpis)(\/|$)/.test(normalizedPath)) {
    return ensureApiPrefix(normalizedPath);
  }

  return normalizedPath;
}


export async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body !== "string") {
    config.body = JSON.stringify(config.body);
  }

  const firstResponse = await fetch(toUrl(path), config);
  const firstPayload = await parseResponseBody(firstResponse);


 if (firstResponse.ok) {
    return firstPayload;
  }

  if (shouldRetryWithAlternatePath(path, firstResponse, firstPayload)) {
    const alternatePath = getAlternatePath(path);
    const secondResponse = await fetch(toUrl(alternatePath), config);
    const secondPayload = await parseResponseBody(secondResponse);

    if (secondResponse.ok) {
      return secondPayload;
    }

    throw buildError(secondResponse, secondPayload);
  }

  throw buildError(firstResponse, firstPayload);


}
