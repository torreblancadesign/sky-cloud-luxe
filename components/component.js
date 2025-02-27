import React, { useState, useEffect } from "react";
import styles from "../styles/style.module.css";

const Component = () => {
  const [warrantyNumber, setWarrantyNumber] = useState("");
  const [warrantyData, setWarrantyData] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");

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
          thumbnailImage: record["Thumbnail Image"]
            ? record["Thumbnail Image"][0].url
            : null,
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

  const openClaimModal = () => {
    if (warrantyData && warrantyData.warrantyID) {
      const claimUrl = `https://airtable.com/embed/appeE4S87yKBhZZyb/shrRO1AtNJi2EkRYr?prefill_WarrantyID=${encodeURIComponent(
        warrantyData.warrantyID
      )}`;
      setModalUrl(claimUrl);
      setIsModalOpen(true);
    }
  };

  return (
    <div
      className={styles.container}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "10px",
        minHeight: "auto",
        boxShadow: "0 0 30px rgb(0 0 0 / 100%)"

      }}
    >
      <h2 style={{ color: "black", marginBottom: "6px", marginTop: "4px" }}>
        Certificate of Authenticity
      </h2>
      {!warrantyData ? (
        <>
          <p
            style={{
              fontSize: "16px",
              color: "#0078B3",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            Enter the 16-digit warranty code including dashes found on the back of
            your warranty card to view your watch details and/or to submit a claim.
          </p>
          {error && <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>}
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "bold",
              }}
            >
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
        <div
          style={{
            textAlign: "center",
            paddingTop: "12px",
            paddingBottom: "0",
            paddingLeft: "12px",
            paddingRight: "12px",
            border: "0px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f4f4f6",
            width: "100%",
            maxWidth: "500px",
            minHeight: "auto",
          }}
        >
          {warrantyData.thumbnailImage && (
            <img
              src={warrantyData.thumbnailImage}
              alt="Product Thumbnail"
              style={{
                maxWidth: "100%",
                height: "auto",
                maxHeight: "150px",
                borderRadius: "10px",
                marginBottom: "6px",
              }}
            />
          )}
          <h3 style={{ color: "#0078B3", marginBottom: "8px" }}>
            Warranty Details
          </h3>
          {warrantyData.model && (
            <p style={{ marginBottom: "10px", marginTop: "10px" }}>
              <strong>Model:</strong> {warrantyData.model}
            </p>
          )}
          {warrantyData.brand && (
            <p style={{ marginBottom: "10px", marginTop: "10px" }}>
              <strong>Brand:</strong> {warrantyData.brand}
            </p>
          )}
          {warrantyData.referenceNumber && (
            <p style={{ marginBottom: "10px", marginTop: "10px" }}>
              <strong>Reference Number:</strong> {warrantyData.referenceNumber}
            </p>
          )}
          {warrantyData.serialNumber && (
            <p style={{ marginBottom: "10px", marginTop: "10px" }}>
              <strong>Serial Number:</strong> {warrantyData.serialNumber}
            </p>
          )}
          {warrantyData.band && (
            <p style={{ marginBottom: "10px", marginTop: "10px" }}>
              <strong>Band:</strong> {warrantyData.band}
            </p>
          )}
          {warrantyData.dial && (
            <p style={{ marginBottom: "10px", marginTop: "10px" }}>
              <strong>Dial:</strong> {warrantyData.dial}
            </p>
          )}
          {warrantyData.purchaseDate && (
            <p style={{ marginBottom: "10px", marginTop: "10px" }}>
              <strong>Purchase Date:</strong> {warrantyData.purchaseDate}
            </p>
          )}
          {warrantyData.warrantyID && (
            <p style={{ marginBottom: "10px", marginTop: "10px" }}>
              <strong>Warranty ID:</strong> {warrantyData.warrantyID}
            </p>
          )}
          {warrantyData.warrantyStart && (
            <p style={{ marginBottom: "10px", marginTop: "10px" }}>
              <strong>Warranty Start:</strong> {warrantyData.warrantyStart}
            </p>
          )}
          {warrantyData.warrantyEnd && (
            <p style={{ marginBottom: "10px", marginTop: "10px" }}>
              <strong>Warranty End:</strong> {warrantyData.warrantyEnd}
            </p>
          )}
          {warrantyData.warrantyStatus && (
            <p style={{ marginBottom: "10px", marginTop: "10px" }}>
              <strong>Warranty Status:</strong> {warrantyData.warrantyStatus}
            </p>
          )}

          <button
            onClick={openClaimModal}
            className={styles.button}
            style={{
              marginBottom: "6px",
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
            Submit Claim
          </button>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <button
              onClick={() => (window.location.href = "https://google.com")}
              className={styles.button}
              style={{
                borderRadius: "999px",
                padding: "8px 14px",
                backgroundColor: "#0078B3",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                width: "100%",
                maxWidth: "190px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Warranty Details
            </button>
            <button
              onClick={() => window.location.reload()}
              className={styles.button}
              style={{
                borderRadius: "999px",
                padding: "8px 14px",
                backgroundColor: "#0078B3",
                color: "white",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
                width: "100%",
                maxWidth: "190px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Verify Another Warranty
            </button>
          </div>

          <p
            style={{
              marginTop: "12px",
              fontSize: "14px",
              color: "#333",
              textAlign: "center",
              marginBottom: "0"
            }}
          >
            Contact us:{" "}
            <a
              href="mailto:info@skycloudluxe.com"
              style={{
                color: "#0078B3",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              info@skycloudluxe.com
            </a>
          </p>
        </div>
      )}

      {isModalOpen && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: "1px",
      width: "110%",
      height: "93%",
      backgroundColor: "transparent", // Changed from "rgba(0,0,0,0.5)"
      display: "flex",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        position: "relative",
        width: "90%",
        maxWidth: "800px",
        backgroundColor: "white",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setIsModalOpen(false)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "transparent",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        Close
      </button>
      <iframe
        src={modalUrl}
        style={{
          width: "100%",
          height: "80vh",
          border: "none",
        }}
        title="Submit Claim"
      />
    </div>
  </div>
)}
    </div>
  );
};

export default Component;
