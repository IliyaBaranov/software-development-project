const API_URL = "http://localhost/beautyspace/backend/api";

/* ======================
   Base fetch wrapper
====================== */

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include", // ⬅️ ОБЯЗАТЕЛЬНО для PHP session
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API error");
  }

  // если backend вернул пустой ответ
  if (res.status === 204) {
    return null as T;
  }

  return res.json();
}

/* ======================
   Auth API helpers
====================== */

export const authApi = {
  login: (email: string, password: string) =>
    apiFetch("/auth/login.php", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) =>
    apiFetch("/auth/register.php", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
    }),

  me: () => apiFetch("/auth/me.php"),

  logout: () =>
    apiFetch("/auth/logout.php", {
      method: "POST",
    }),
};
