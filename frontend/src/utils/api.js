let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

export async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) return null;

  try {
    const response = await fetch("http://localhost:8000/api/auth/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken })
    });

    if (!response.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/";
      return null;
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access);
    return data.access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/";
    return null;
  }
}

function buildHeaders(options, token) {
  const isFormData = options.body instanceof FormData;

  return {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    ...(isFormData ? {} : {
      "Content-Type": options.headers?.["Content-Type"] || "application/json"
    }),
  };
}

export async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(options, token),
  });

  if (response.status === 401) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(token => {
        return fetch(url, {
          ...options,
          headers: buildHeaders(options, token),
        });
      });
    }

    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken();

      if (newToken) {
        processQueue(null, newToken);

        return fetch(url, {
          ...options,
          headers: buildHeaders(options, newToken),
        });
      } else {
        processQueue(new Error("Token refresh failed"), null);
        window.location.href = "/";
        return response;
      }
    } finally {
      isRefreshing = false;
    }
  }

  return response;
}