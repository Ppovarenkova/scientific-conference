import styles from './RegistrationForm.module.css';
import { useState } from "react";
import Title from '../ui/Title/Title';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    affiliation: "",
    abstract_title: "",
    abstract_text: "",
    additional_authors: "",
    additional_affiliations: "",
    arrival: "",
    departure: "",
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [wordCount, setWordCount] = useState(0);

  const validate = () => {
    const newErrors = {};


    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.affiliation.trim().length < 3) {
      newErrors.affiliation = "Please enter a valid affiliation";
    }

    // Validate word count in abstract
    const words = formData.abstract_text.trim().split(/\s+/).filter(w => w.length > 0);
    if (words.length > 250) {
      newErrors.abstract_text = "Abstract must not exceed 250 words";
    }

    if (!formData.arrival) {
      newErrors.arrival = "Please select arrival date";
    }

    if (!formData.departure) {
      newErrors.departure = "Please select departure date";
    }

    // Check that departure is after arrival
    if (formData.arrival && formData.departure && formData.departure <= formData.arrival) {
      newErrors.departure = "Departure date must be after arrival date";
    }

    // Validate photo
    if (photo && photo.size > 5 * 1024 * 1024) {
      newErrors.photo = "Photo size must not exceed 5MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Use FormData for file upload
        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('email', formData.email);
        submitData.append('affiliation', formData.affiliation);
        submitData.append('abstract_title', formData.abstract_title);
        submitData.append('abstract_text', formData.abstract_text);
        submitData.append('additional_authors', formData.additional_authors);
        submitData.append('additional_affiliations', formData.additional_affiliations);
        submitData.append('arrival_date', formData.arrival);
        submitData.append('departure_date', formData.departure);
        
        if (photo) {
          submitData.append('photo', photo);
        }

        const response = await fetch("http://localhost:8000/api/submit/", {
          method: "POST",
          body: submitData, // Don't set Content-Type header - browser will set it automatically with boundary
        });

        if (response.ok) {
          alert("✅ Registration successful! Your submission is pending review.");
          // Clear form
          setFormData({
            name: "",
            email: "",
            affiliation: "",
            abstract_title: "",
            abstract_text: "",
            additional_authors: "",
            additional_affiliations: "",
            arrival: "",
            departure: "",
          });
          setPhoto(null);
          setPhotoPreview(null);
          setWordCount(0);
        } else {
          const errorData = await response.json();
          alert(`❌ Registration failed: ${JSON.stringify(errorData)}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("❌ Connection error. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Count words for abstract
    if (name === "abstract_text") {
      const words = value.trim().split(/\s+/).filter(w => w.length > 0);
      setWordCount(words.length);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors({...errors, photo: "Please select a valid image file"});
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({...errors, photo: "Photo size must not exceed 5MB"});
        return;
      }

      setPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear error
      const newErrors = {...errors};
      delete newErrors.photo;
      setErrors(newErrors);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    // Clear file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <section className={styles.formSection}>
      <Title text="Registration Form" />
      <div className={styles.fadeIn}>
        <p className={styles.instructions}>
          Conference fee is free of charge, accommodation is not provided
        </p>
        <p className={styles.deadline}>
          Please submit your registration until April 23, 2025
        </p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Name - required */}
          <div className={styles.field}>
            <label className={styles.label}>
              Name <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={100}
              required
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          {/* Email - required */}
          <div className={styles.field}>
            <label className={styles.label}>
              Email <span className={styles.required}>*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              maxLength={100}
              required
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          {/* Affiliation - required */}
          <div className={styles.field}>
            <label className={styles.label}>
              Affiliation <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              name="affiliation"
              placeholder="University or Institution"
              value={formData.affiliation}
              onChange={handleChange}
              maxLength={200}
              required
            />
            {errors.affiliation && (
              <span className={styles.error}>{errors.affiliation}</span>
            )}
          </div>

          {/* Photo upload */}
          <div className={styles.field}>
            <label className={styles.label}>Photo (optional)</label>
            <div className={styles.photoUpload}>
              {!photoPreview ? (
                <label className={styles.uploadButton}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: 'none' }}
                  />
                  📷 Choose Photo
                </label>
              ) : (
                <div className={styles.photoPreview}>
                  <img src={photoPreview} alt="Preview" />
                  <button 
                    type="button" 
                    onClick={removePhoto}
                    className={styles.removePhoto}
                  >
                    ✕ Remove
                  </button>
                </div>
              )}
            </div>
            {errors.photo && <span className={styles.error}>{errors.photo}</span>}
            <small className={styles.hint}>Max 5MB, JPG/PNG format</small>
          </div>

          {/* Abstract title */}
          <div className={styles.field}>
            <label className={styles.label}>Abstract Title</label>
            <input
              type="text"
              name="abstract_title"
              placeholder="Title of your presentation"
              value={formData.abstract_title}
              onChange={handleChange}
              maxLength={400}
            />
          </div>

          {/* Abstract description */}
          <div className={styles.field}>
            <label className={styles.label}>
              Abstract Description 
              <span className={styles.wordCount}>
                ({wordCount}/250 words)
              </span>
            </label>
            <textarea
              name="abstract_text"
              placeholder="Brief description of your contribution (max 250 words)"
              value={formData.abstract_text}
              onChange={handleChange}
              maxLength={2500}
            />
            {errors.abstract_text && (
              <span className={styles.error}>{errors.abstract_text}</span>
            )}
          </div>

          {/* Additional authors */}
          <div className={styles.field}>
            <label className={styles.label}>Additional Authors</label>
            <input
              type="text"
              name="additional_authors"
              placeholder="Co-authors (if any)"
              value={formData.additional_authors}
              onChange={handleChange}
              maxLength={300}
            />
          </div>

          {/* Additional affiliations */}
          <div className={styles.field}>
            <label className={styles.label}>Additional Affiliations</label>
            <textarea
              name="additional_affiliations"
              placeholder="Affiliations of co-authors (if any)"
              value={formData.additional_affiliations}
              onChange={handleChange}
              rows="3"
              maxLength={500}
            />
          </div>

          {/* Period of stay - required */}
          <div className={styles.fieldRow}>
            <div>
              <label className={styles.date}>
                Arrival Date <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                name="arrival"
                value={formData.arrival}
                onChange={handleChange}
                required
              />
              {errors.arrival && (
                <span className={styles.error}>{errors.arrival}</span>
              )}
            </div>

            <div>
              <label className={styles.date}>
                Departure Date <span className={styles.required}>*</span>
              </label>
              <input
                type="date"
                name="departure"
                value={formData.departure}
                onChange={handleChange}
                required
              />
              {errors.departure && (
                <span className={styles.error}>{errors.departure}</span>
              )}
            </div>
          </div>

          <button type="submit" className={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}