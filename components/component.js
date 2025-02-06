import React, { useState, useEffect } from "react";
import styles from "../styles/style.module.css";

const Component = () => {
  const [warrantyNumber, setWarrantyNumber] = useState("");
  const [warrantyData, setWarrantyData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!warrantyNumber) {
      alert("Please enter a warranty number.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.airtable.com/v0/appeE4S87yKBhZZyb/Warranty?filterByFormula={Warranty ID}='${warrantyNumber}'`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer patjuRrHGpdA3SdRb.84cf94ba5374da58c8468374d41f4cf06e2ea0a7f2f9750a0fbb8de50c94e320",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      if (data.records.length > 0) {
        const record = data.records[0].fields;
        setWarrantyData({
          thumbnailImage: record["Thumbnail Image"] ? record["Thumbnail Image"][0].url : null,
          model: record["Product"],
          brand: record["Brand"],
          referenceNumber: record["Reference Number"],
          serialNumber: record["Serial Number"],
          band: record["Band"],
          dial: record["Dial"],
          purchaseDate: record["Purchase Date"],
          warrantyStart: record["Warranty Start"],
          warrantyEnd: record["Warranty End"],
          warrantyStatus: record["Warranty Status"],
        });
        setError(null);
      } else {
        setWarrantyData(null);
        setError("Warranty ID does not match our records");
      }
    } catch (error) {
      setWarrantyData(null);
      setError("An error occurred while verifying warranty");
    }
  };

  return (
    <div className={styles.container} style={{ 
      display: "flex", 
      flexDirection: "column", 
      justifyContent: "flex-start", 
      alignItems: "center", 
      paddingTop: "20px", 
      minHeight: "auto", 
      overflow: "hidden", 
      fontFamily: "'Inter', sans-serif" 
    }}>
      <h2 style={{ 
        color: "black", 
        marginBottom: "8px", 
        marginTop: "10px", 
        fontFamily: "'Inter', sans-serif", 
        fontWeight: "500" 
      }}>
        Verify Your Watch Warranty
      </h2>
      <p style={{ fontSize: "14px", color: "#0078B3", marginBottom: "16px", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>
        Enter the 16-digit warranty code found on the back of your warranty card to view your watch details and/or to submit a claim.
      </p>
      {error && <p style={{ color: "red", marginBottom: "8px", fontFamily: "'Inter', sans-serif" }}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontFamily: "'Inter', sans-serif" }}>
          Enter your warranty code (required)
        </label>
        <input
          type="text"
          className={styles.input}
          value={warrantyNumber}
          onChange={(e) => setWarrantyNumber(e.target.value)}
          placeholder="warranty number..."
          style={{
            borderRadius: "999px",
            padding: "12px 20px",
            border: "1px solid #ccc",
            width: "100%",
            outline: "none",
            fontFamily: "'Inter', sans-serif"
          }}
        />
        <button
          type="submit"
          className={styles.button}
          style={{
            borderRadius: "999px",
            padding: "12px 20px",
            backgroundColor: "#0078B3",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%",
            marginTop: "10px",
            fontFamily: "'Inter', sans-serif"
          }}
        >
          Verify Warranty
        </button>
      </form>
    </div>
  );
};

export default Component;
