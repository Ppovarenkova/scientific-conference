import styles from './EditSubmissionModal.module.css';
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import avatar from '../../assets/avatar.png';
import Title from '../ui/Title/Title';

export default function EditSubmissionModal({ submission, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    affiliation: "",
    abstract_title: "",
    abstract_text: "",
    additional_authors: "",
    additional_affiliations: "",
    arrival_date: "",
    departure_date: "",
    admin_notes: "",
    status: "pending",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    // Block scroll
    document.body.style.overflow = 'hidden';
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // Populate form data
    if (submission) {
      setFormData({
        name: submission.name || "",
        email: submission.email || "",
        affiliation: submission.affiliation || "",
        abstract_title: submission.abstract_title || "",
        abstract_text: submission.abstract_text || "",
        additional_authors: submission.additional_authors || "",
        additional_affiliations: submission.additional_affiliations || "",
        arrival_date: submission.arrival_date || "",
        departure_date: submission.departure_date || "",
        admin_notes: submission.admin_notes || "",
        status: submission.status || "pending",
      });

      if (submission.photo) {
        setPhotoPreview(submission.photo.startsWith('http') 
          ? submission.photo 
          : `http://localhost:8000${submission.photo}`
        );
      }

      // Count words
      if (submission.abstract_text) {
        const words = submission.abstract_text.trim().split(/\s+/).filter(w => w.length > 0);
        setWordCount(words.length);
      }
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [submission]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Count words for abstract
    if (name === "abstract_text") {
      const words = value.trim().split(/\s+/).filter(w => w.length > 0);
      setWordCount(words.length);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert("Please select a valid image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Photo size must not exceed 5MB");
        return;
      }

      setPhoto(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(submission.photo ? 
      (submission.photo.startsWith('http') ? submission.photo : `http://localhost:8000${submission.photo}`) 
      : null
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

     try {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      alert("Session expired. Please login again.");
      window.location.href = "/";
      return;
    }

    let response;

    // If photo was changed, use FormData
    if (photo) {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== undefined) {
          submitData.append(key, formData[key]);
        }
      });
      submitData.append('photo', photo);

      response = await fetch(`http://localhost:8000/api/admin/submissions/${submission.id}/`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: submitData,
      });
    } else {
      // If no photo change, use JSON
      response = await fetch(`http://localhost:8000/api/admin/submissions/${submission.id}/`, {
        method: 'PATCH',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    }

    if (response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      alert("Session expired. Please login again.");
      window.location.href = "/";
      return;
    }

    if (response.ok) {
      const updated = await response.json();
      
      // Show different message for approved submissions
      if (updated.status === 'approved') {
        alert("Changes saved successfully!\n\nThe published Participant and Abstract have been updated on the public site.");
      } else {
        alert("Changes saved successfully!");
      }
      
      onSave(updated);
      onClose();
    } else {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      alert(`Failed to save (${response.status}): ${errorText}`);
    }
  } catch (error) {
    console.error("Detailed error:", error);
    alert(`Connection error: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  if (!submission) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button 
          className={styles.closeBtn} 
          onClick={onClose}
          type="button"
        >
          ×
        </button>


        <Title text={"Edit Submission"} />

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Photo */}
          <div className={styles.photoSection}>
            {photoPreview ? (
              <div className={styles.photoPreview}>
                <img src={photoPreview} alt="Preview" />
                {photo && (
                  <button 
                    type="button" 
                    onClick={removePhoto}
                    className={styles.removePhoto}
                  >
                    ✕
                  </button>
                )}
              </div>
            ) : (
              <img src={avatar} alt="No photo" className={styles.avatarPlaceholder} />
            )}
            <label className={styles.uploadButton}>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
              Change Photo
            </label>
          </div>

          <div className={styles.formGrid}>
            {/* Name */}
            <div className={styles.field}>
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className={styles.field}>
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Affiliation */}
            <div className={styles.field}>
              <label>Affiliation *</label>
              <input
                type="text"
                name="affiliation"
                value={formData.affiliation}
                onChange={handleChange}
                required
              />
            </div>

            {/* Status */}
            <div className={styles.field}>
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Abstract Title */}
            <div className={styles.fieldFull}>
              <label>Abstract Title</label>
              <input
                type="text"
                name="abstract_title"
                value={formData.abstract_title}
                onChange={handleChange}
              />
            </div>

            {/* Abstract Text */}
            <div className={styles.fieldFull}>
              <label>
                Abstract Description
                <span className={styles.wordCount}>({wordCount} words)</span>
              </label>
              <textarea
                name="abstract_text"
                value={formData.abstract_text}
                onChange={handleChange}
                rows="8"
              />
            </div>

            {/* Additional Authors */}
            <div className={styles.fieldFull}>
              <label>Additional Authors</label>
              <input
                type="text"
                name="additional_authors"
                value={formData.additional_authors}
                onChange={handleChange}
              />
            </div>

            {/* Additional Affiliations */}
            <div className={styles.fieldFull}>
              <label>Additional Affiliations</label>
              <textarea
                name="additional_affiliations"
                value={formData.additional_affiliations}
                onChange={handleChange}
                rows="3"
              />
            </div>

            {/* Dates */}
            <div className={styles.field}>
              <label>Arrival Date *</label>
              <input
                type="date"
                name="arrival_date"
                value={formData.arrival_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.field}>
              <label>Departure Date *</label>
              <input
                type="date"
                name="departure_date"
                value={formData.departure_date}
                onChange={handleChange}
                required
              />
            </div>

            {/* Admin Notes */}
            <div className={styles.fieldFull}>
              <label>Admin Notes (internal)</label>
              <textarea
                name="admin_notes"
                value={formData.admin_notes}
                onChange={handleChange}
                rows="4"
                placeholder="Internal notes for admins..."
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" disabled={loading} className={styles.saveBtn}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}