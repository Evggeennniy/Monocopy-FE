import React, { useState } from "react";
import { API_URL } from "../../url";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// LoginPage.jsx
// Single-file React component (TailwindCSS required in your project)
// - Dark theme using #121212 tones
// - Email + password fields
// - Password masked with "eye" toggle
// - Simple fetch POST to /api/login (adjust endpoint as needed)

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Пожалуйста, заполните e-mail и пароль.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL + "/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Ошибка входа");
      }

      const data = await res.json();
      setSuccess("Вход выполнен успешно");

      // Сохраняем токены в куки (например на 7 дней)
      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      Cookies.set("refresh", data.refresh, {
        expires: 30,
        secure: true,
        sameSite: "strict",
      });

      console.log("login success", data);

      // TODO: редирект или обновление состояния auth
    } catch (err) {
      setError(err.message || "Не удалось войти");
    } finally {
      setLoading(false);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#121212] via-[#0f0f0f] to-[#0a0a0a] p-6">
      <div
        className="w-full max-w-md bg-opacity-60 backdrop-blur-md rounded-2xl border border-gray-800 shadow-lg p-8"
        style={{ backgroundColor: "rgba(18,18,18,0.6)" }}
      >
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          Вход в аккаунт
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-300">Name</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Aboba"
              className="mt-1 block w-full rounded-lg border border-gray-700 bg-[#121212] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
              required
              aria-label="E-mail"
            />
          </label>

          <label className="block relative">
            <span className="text-sm text-gray-300">Пароль</span>
            <div className="mt-1 flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                className="flex-1 rounded-l-lg border border-gray-700 bg-[#121212] px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                required
                aria-label="Пароль"
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="rounded-r-lg border border-l-0 border-gray-700 bg-[#121212] px-3 py-2 text-gray-300 hover:text-white focus:outline-none"
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
              >
                {/* Simple eye icon (SVG) */}
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.99 9.99 0 013.403-7.5M6.3 6.3L17.7 17.7"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9.88 9.88a3 3 0 014.24 4.24"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {error && <div className="text-sm text-red-400">{error}</div>}
          {success && <div className="text-sm text-green-400">{success}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-gray-800 to-gray-700 text-white font-medium hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
