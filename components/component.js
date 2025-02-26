import React, { useState, useEffect } from "react";
import styles from "../styles/style.module.css";

const Component = () => {
  const [warrantyNumber, setWarrantyNumber] = useState("");
  const [warrantyData, setWarrantyData] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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

  const openClaimModal = () => {
    if (warrantyData && warrantyData.warrantyID) {
      const claimUrl = `https://airtable.com/appeE4S87yKBhZZyb/pagHWmb1h8vIiDfUr/form?prefill_WarrantyID=${encodeURIComponent(
        warrantyData.warrantyID
      )}`;
      setModalUrl(claimUrl);
      setModalOpen(true);
    }
  };

  const handleWarrantyDetails = () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://google.com";
    }
  };

  const handleVerifyAnother = () => {
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "10px",
        minHeight: "100vh",
      }}
    >
      {/* The card wrapper that always displays the shadow */}
      <div
        style={{
          backgroundColor: "#f4f4f6",
          borderRadius: "10px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          padding: "12px",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "black", marginBottom: "6px", marginTop: "4px" }}>
          Certificate of Authenticity
        </h2>
        {!warrantyData ? (
          <>
            <p style={{ fontSize: "16px", color: "#0078B3", marginBottom: "12px" }}>
              Enter the 16-digit warranty code including dashes found on the back of your warranty card to view your watch details and/or to submit a claim.
            </p>
            {error && <p style={{ color: "red", marginBottom: "8px" }}>{error}</p>}
            <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
                Enter your warranty code (required)
              </label>
              <input
                type="text"
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
          <>
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
            <h3 style={{ color: "#0078B3", marginBottom: "8px" }}>Warranty Details</h3>
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
              onClick={openClaimModal}
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
                onClick={handleWarrantyDetails}
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
                onClick={handleVerifyAnother}
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

            <p style={{ marginTop: "12px", fontSize: "14px", color: "#333" }}>
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
          </>
        )}
      </div>
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
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
              onClick={() => setModalOpen(false)}
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
