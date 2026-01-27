import styles from './AdminLoginModal.module.css';
import { useState } from "react";
import { createPortal } from "react-dom";

export default function AdminLoginModal({ onSuccess, onClose }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "admin",
          password
        })
      });

      if (!res.ok) {
        setError("Wrong password");
        setLoading(false);
        return;
      }

      const data = await res.json();
      
      // Сохраняем токены
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      
      console.log("Token saved:", data.access); // Для отладки
      
      // Вызываем callback только после сохранения
      onSuccess();
    } catch (err) {
      setError("Connection error");
      setLoading(false);
    }
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <form onSubmit={submit}>
          <h3>Admin login</h3>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
          <button type="button" onClick={onClose} disabled={loading}>
            Cancel
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}