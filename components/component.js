import React, { useState } from "react";
import styles from "../styles/style.module.css";

const Component = () => {
  const [warrantyNumber, setWarrantyNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!warrantyNumber) {
      alert("Please enter a warranty number.");
      return;
    }

    try {
      const response = await fetch('/api/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ warrantyNumber }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      alert(`Response: ${data.message}`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2 style={{ color: "black", marginBottom: "8px" }}>Verify Your Watch Warranty</h2>
      <p style={{ fontSize: "14px", color: "#007bff", marginBottom: "16px" }}>
        Enter the 16-digit warranty code found on the back of your warranty card to view your watch details and/or to submit a claim.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          Enter your warranty code (required)
        </label>
        <input
          type="text"
          className={styles.input}
          value={warrantyNumber}
          onChange={e => setWarrantyNumber(e.target.value)}
          placeholder="warranty number..."
          style={{
            borderRadius: "999px",
            padding: "12px 20px",
            border: "1px solid #ccc",
            width: "100%",
            outline: "none"
          }}
        />
        <button 
          type="submit" 
          className={styles.button}
          style={{
            borderRadius: "999px",
            padding: "12px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%"
          }}
        >
          Verify Warranty
        </button>
      </form>
    </div>
  );
};

export default Component;


 