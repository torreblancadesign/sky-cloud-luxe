import React, { useState } from "react";
import styles from "../styles/style.module.css";
//comment to push to deployment, delete later

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
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          value={warrantyNumber}
          onChange={e => setWarrantyNumber(e.target.value)}
          placeholder="Enter warranty number"
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Component;
 