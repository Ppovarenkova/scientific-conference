import styles from './RegistrationForm.module.css';
import { useState } from "react";
import Title from '../ui/Title/Title';
import Separator from '../ui/Separator/Separator';


export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    affiliation: "",
    abstract: "",
    arrival: "",
    departure: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
      newErrors.name = "Please enter a valid name (letters only)";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email";
    }

    if (formData.address.trim().length < 5) {
      newErrors.address = "Address is too short";
    }

    if (formData.affiliation.trim().length < 3) {
      newErrors.affiliation = "Please enter a valid affiliation";
    }

    if (formData.abstract.trim().length < 10) {
      newErrors.abstract = "Abstract must be at least 10 characters";
    }

    if (!formData.arrival) {
      newErrors.arrival = "Please select arrival date";
    }

    if (!formData.departure) {
      newErrors.departure = "Please select departure date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("✅ Registration successful!");
      console.log(formData);
      //  fetch / axios here to send data to server
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className={styles.formSection}>
        <Title text="Registration Form" />
        <p className={styles.instructions}>
            Conference fee is free of charge, accommodation is not provided
        </p>
        <p className={styles.deadline}>
            Please submit your registration until April 23, 2025
        </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Contact address and e-mail</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
          {errors.address && <span className={styles.error}>{errors.address}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Affiliation</label>
          <input
            type="text"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
            required
          />
          {errors.affiliation && (
            <span className={styles.error}>{errors.affiliation}</span>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>The abstract of your contribution</label>
          <textarea
            name="abstract"
            value={formData.abstract}
            onChange={handleChange}
            required
          />
          {errors.abstract && (
            <span className={styles.error}>{errors.abstract}</span>
          )}
        </div>

        <div className={styles.fieldRow}>
          <div>
            <label className={styles.date}>Arrival date</label>
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
            <label className={styles.date}>Departure date</label>
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
    </section>
  );
}

