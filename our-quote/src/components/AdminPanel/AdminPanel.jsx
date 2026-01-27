import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AdminPanel.module.css';

export default function AdminPanel() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAdminData() {
      const token = localStorage.getItem("access_token");
      
      if (!token) {
        console.log("No token found");
        navigate("/");
        return;
      }

      console.log("Fetching with token:", token); // Для отладки

      try {
        const res = await fetch("http://localhost:8000/api/admin-panel/", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!res.ok) {
          console.log("Response not OK:", res.status);
          setError("Access denied");
          setLoading(false);
          // Удаляем невалидный токен
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setTimeout(() => navigate("/"), 2000);
          return;
        }

        const responseData = await res.json();
        console.log("Admin data:", responseData);
        setData(responseData);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Connection error");
        setLoading(false);
      }
    }

    fetchAdminData();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/");
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.error}>{error}</p>
        <p>Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Admin Panel</h1>
      <p>{data?.message}</p>
      <p>User: {data?.user}</p>
      <button onClick={handleLogout}>Logout</button>
      
      {/* Здесь добавьте ваш функционал админ-панели */}
    </div>
  );
}