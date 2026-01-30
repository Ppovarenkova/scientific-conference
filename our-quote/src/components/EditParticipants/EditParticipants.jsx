import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EditParticipants.module.css';
import Title from '../ui/Title/Title';
import avatar from '../../assets/avatar.png';
import Loader from '../ui/Loader/Loader';

export default function EditParticipants() {
  const [submissions, setSubmissions] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubmissions();
  }, [filter]);

  async function fetchSubmissions() {
    setLoading(true);
    const token = localStorage.getItem("access_token");
    
    try {
      const res = await fetch(`http://localhost:8000/api/admin/submissions/?status=${filter}`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Submissions data:", data);
        setSubmissions(data);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  }

  async function publishSubmission(id) {
    if (!window.confirm('Publish this submission? This will create a Participant and Abstract entry.')) return;

    const token = localStorage.getItem("access_token");
    
    try {
      const res = await fetch(`http://localhost:8000/api/admin/submissions/${id}/publish/`, {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        alert('✅ Published successfully!');
        fetchSubmissions();
      } else {
        const error = await res.json();
        alert(`❌ Failed to publish: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert('❌ Connection error');
    }
  }

  async function deleteSubmission(id) {
    if (!window.confirm('Delete this submission permanently?')) return;

    const token = localStorage.getItem("access_token");
    
    try {
      const res = await fetch(`http://localhost:8000/api/admin/submissions/${id}/`, {
        method: 'DELETE',
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        alert('✅ Deleted successfully');
        fetchSubmissions();
      }
    } catch (error) {
      alert('❌ Connection error');
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function getPhotoUrl(photoPath) {
    if (!photoPath) return null;
    if (photoPath.startsWith('http')) return photoPath;
    return `http://localhost:8000${photoPath}`;
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <button onClick={() => navigate("/admin-panel")} className={styles.backBtn}>
        ←  Back
      </button>
      
      <Title text="Participant Submissions"></Title>

      <div className={styles.filterButtons}>
        <button 
          className={filter === 'pending' ? styles.active : ''}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={filter === 'approved' ? styles.active : ''}
          onClick={() => setFilter('approved')}
        >
          Approved
        </button>
        <button 
          className={filter === 'rejected' ? styles.active : ''}
          onClick={() => setFilter('rejected')}
        >
          Rejected
        </button>
        <button 
          className={filter === '' ? styles.active : ''}
          onClick={() => setFilter('')}
        >
          All
        </button>
      </div>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate("/admin-panel")} className={styles.backBtn}>
        ←  Back
      </button>
      
      <Title text="Participant Submissions"></Title>

      <div className={styles.filterButtons}>
        <button 
          className={filter === 'pending' ? styles.active : ''}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={filter === 'approved' ? styles.active : ''}
          onClick={() => setFilter('approved')}
        >
          Approved
        </button>
        <button 
          className={filter === 'rejected' ? styles.active : ''}
          onClick={() => setFilter('rejected')}
        >
          Rejected
        </button>
        <button 
          className={filter === '' ? styles.active : ''}
          onClick={() => setFilter('')}
        >
          All
        </button>
      </div>

      {submissions.length === 0 ? (
        <div className={styles.noDataContainer}>
            <p className={styles.noData}>No submissions found</p>
        </div>
      ) : (
        <div className={styles.submissionsGrid}>
          {submissions.map(sub => (
            <div key={sub.id} className={styles.submissionCard}>
              <div className={styles.cardHeader}>
                <div className={styles.headerLeft}>
                  {sub.photo ? (
                    <img 
                      src={getPhotoUrl(sub.photo)} 
                      alt={sub.name}
                      className={styles.participantPhoto}
                      onError={(e) => {
                        console.error("Failed to load image:", sub.photo);
                        e.target.src = avatar;
                      }}
                    />
                  ) : (
                    <div className={styles.photoPlaceholder}>
                      <img src={avatar} alt="No Avatar" className={styles.participantPhoto} />
                    </div>
                  )}
                  <div>
                    <h3>{sub.name}</h3>
                    <p className={styles.email}>{sub.email}</p>
                  </div>
                </div>
                <span className={`${styles.badge} ${styles[sub.status]}`}>
                  {sub.status}
                </span>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.infoRow}>
                  <strong>Affiliation:</strong>
                  <span>{sub.affiliation}</span>
                </div>

                <div className={styles.infoRow}>
                  <strong>Abstract Title:</strong>
                  <span className={!sub.abstract_title ? styles.emptyValue : ''}>
                    {sub.abstract_title || '—'}
                  </span>
                </div>

                <div className={styles.abstractSection}>
                  <strong>Abstract:</strong>
                  {sub.abstract_text ? (
                    <p className={styles.abstractText}>
                      {sub.abstract_text.length > 200 
                        ? sub.abstract_text.substring(0, 200) + '...' 
                        : sub.abstract_text}
                    </p>
                  ) : (
                    <p className={`${styles.abstractText} ${styles.emptyValue}`}>
                      —
                    </p>
                  )}
                </div>

                {sub.additional_authors && (
                  <div className={styles.infoRow}>
                    <strong>Co-authors:</strong>
                    <span>{sub.additional_authors}</span>
                  </div>
                )}

                <div className={styles.datesSection}>
                  <div className={styles.dateInfo}>
                    <strong>Arrival:</strong>
                    <span>{formatDate(sub.arrival_date)}</span>
                  </div>
                  <div className={styles.dateInfo}>
                    <strong>Departure:</strong>
                    <span>{formatDate(sub.departure_date)}</span>
                  </div>
                  <div className={styles.dateInfo}>
                    <strong>Stay:</strong>
                    <span>{sub.stay_duration} days</span>
                  </div>
                </div>

                <div className={styles.metadata}>
                  <small>Submitted: {formatDate(sub.submitted_at)}</small>
                </div>
              </div>

              <div className={styles.cardActions}>
                {sub.status === 'pending' && (
                  <button 
                    className={styles.publishBtn}
                    onClick={() => publishSubmission(sub.id)}
                  >
                     Publish
                  </button>
                )}
                <button 
                  className={styles.editBtn}
                  onClick={() => navigate(`/admin-panel/edit-submission/${sub.id}`)}
                >
                  Edit
                </button>
                <button 
                  className={styles.deleteBtn}
                  onClick={() => deleteSubmission(sub.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}