import Cookies from "js-cookie";
import { API_URL } from "../url";
let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

const logout = () => {
  Cookies.remove("access");
  Cookies.remove("refresh");
  window.location.href = "/";
};

const fetchWithAuth = async (url, options = {}, { onTokenUpdate } = {}) => {
  const access = Cookies.get("access");
  const refresh = Cookies.get("refresh");

  const stringifiedBody =
    options.body && typeof options.body !== "string"
      ? JSON.stringify(options.body)
      : options.body;

  const applyToken = (token) => {
    const isFormData = options.body instanceof FormData;

    return {
      ...options,
      method: options.method || "GET",
      body: isFormData ? options.body : stringifiedBody,
      headers: {
        ...(!isFormData && stringifiedBody
          ? { "Content-Type": "application/json" }
          : {}),
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  };
  const retryRequest = async (token) => {
    return await fetch(url, applyToken(token));
  };

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      subscribeTokenRefresh(async (newAccessToken) => {
        try {
          const retryResponse = await retryRequest(newAccessToken);
          resolve(retryResponse);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  let response;
  if (access) {
    response = await retryRequest(access);
    if (response.status !== 401) return response;
  }

  if (!refresh) {
    logout();
    throw new Error("Unauthorized: No refresh token");
  }

  isRefreshing = true;

  try {
    const refreshResponse = await fetch(`${API_URL}/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!refreshResponse.ok) {
      logout();
      throw new Error("Token refresh failed");
    }

    const { access: newAccessToken } = await refreshResponse.json();

    if (!newAccessToken) {
      logout();
      throw new Error("No new access token returned");
    }

    Cookies.set("access", newAccessToken);
    onTokenUpdate?.(newAccessToken);

    onRefreshed(newAccessToken);

    return await retryRequest(newAccessToken);
  } catch (err) {
    logout();
    throw err;
  } finally {
    isRefreshing = false;
  }
};

export default fetchWithAuth;
