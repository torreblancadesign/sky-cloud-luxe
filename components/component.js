
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
          model: record["Model"],
          brand: record["Brand"],
          referenceNumber: record["Reference Number"],
          serialNumber: record["Serial Number"],
          band: record["Band"],
          dial: record["Dial"],
          purchaseDate: record["Purchase Date"],
          warrantyID: record["Warranty ID"],
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
    <div className={styles.container} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", paddingTop: "20px", minHeight: "auto" }}>
      <h2 style={{ color: "black", marginBottom: "8px", marginTop: "10px"}}>Certificate of Authenticity</h2>
      {!warrantyData ? (
        <>
          <p style={{ fontSize: "16px", color: "#0078B3", marginBottom: "16px", textAlign: "center"}}>
            Enter the 16-digit warranty code including dashes found on the back of your warranty card to view your watch details and/or to submit a claim.
          </p>
          {error && <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>}
          <form className={styles.form} onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
              Enter your warranty code (required)
            </label>
            <input
              type="text"
              className={styles.input}
              value={warrantyNumber}
              onChange={(e) => setWarrantyNumber(e.target.value)}
              placeholder=" warranty number..."
              style={{
                borderRadius: "999px",
                padding: "12px 20px",
                border: "1px solid #ccc",
                width: "100%",
                outline: "none",
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
              }}
            >
              Verify Warranty
            </button>
          </form>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "12px", border: "0px solid #ccc", borderRadius: "10px", backgroundColor: "#f4f4f6", width: "100%", maxWidth: "500px", minHeight: "auto" }}>
          {warrantyData.thumbnailImage && (
            <img src={warrantyData.thumbnailImage} alt="Product Thumbnail" style={{ maxWidth: "100%", height: "auto", borderRadius: "10px", marginBottom: "10px" }} />
          )}
          <h3 style={{ color: "#0078B3" }}>Warranty Details</h3>
          {warrantyData.model && <p><strong>Model:</strong> {warrantyData.model}</p>}
          {warrantyData.brand && <p><strong>Brand:</strong> {warrantyData.brand}</p>}
          {warrantyData.referenceNumber && <p><strong>Reference Number:</strong> {warrantyData.referenceNumber}</p>}
          {warrantyData.serialNumber && <p><strong>Serial Number:</strong> {warrantyData.serialNumber}</p>}
          {warrantyData.band && <p><strong>Band:</strong> {warrantyData.band}</p>}
          {warrantyData.dial && <p><strong>Dial:</strong> {warrantyData.dial}</p>}
          {warrantyData.purchaseDate && <p><strong>Purchase Date:</strong> {warrantyData.purchaseDate}</p>}
          {warrantyData.warrantyID && <p><strong>Warranty ID:</strong> {warrantyData.warrantyID}</p>}
          {warrantyData.warrantyStart && <p><strong>Warranty Start:</strong> {warrantyData.warrantyStart}</p>}
          {warrantyData.warrantyEnd && <p><strong>Warranty End:</strong> {warrantyData.warrantyEnd}</p>}
          {warrantyData.warrantyStatus && <p><strong>Warranty Status:</strong> {warrantyData.warrantyStatus}</p>}

            <button
            onClick={() => window.location.reload()} // Refreshes the page
            className={styles.button}
            style={{
              marginBottom: "6px", // Adds space below this button
              borderRadius: "999px",
              padding: "8px 14px",
              backgroundColor: "#0078B3", 
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
              maxWidth: "400px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Verify Another Warranty
          </button>
            
            <button
            onClick={() => window.open(`https://airtable.com/appeE4S87yKBhZZyb/pagHWmb1h8vIiDfUr/form?prefill_WarrantyID=${encodeURIComponent(warrantyData.warrantyID)}`, '_blank')}
            className={styles.button}
            style={{
              marginTop: "10px",
              borderRadius: "999px",
              padding: "8px 14px",
              backgroundColor: "#0078B3",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              width: "100%",
              maxWidth: "400px",
              fontFamily: "'Inter', sans-serif"
            
            }}
          >
            Submit Claim
          </button>
              
          <p style={{ marginTop: "12px", fontSize: "14px", color: "#333", textAlign: "center" }}>
            Contact us: <a href="mailto:info@skycloudluxe.com" style={{ color: "#0078B3", textDecoration: "none", fontWeight: "bold" }}>info@skycloudluxe.com</a>
          </p>
              
        </div>
      )}
    </div>
  );
};

export default Component;
