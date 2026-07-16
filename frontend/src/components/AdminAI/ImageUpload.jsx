/**
 * ImageUpload.jsx
 *
 * Drag-and-drop + file picker upload zone for property images.
 * Rendered inside the chat window when AI asks for an image upload.
 *
 * Props:
 *   label       {string}   - "Cover Image" or "Project Map"
 *   onUpload    {function} - Called with the selected File object
 *   disabled    {boolean}  - Disables interaction during upload
 */

import { useState, useRef } from "react";

function ImageUpload({ label = "Property Image", onUpload, disabled }) {
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, WebP, GIF).");
      return;
    }
    // Create local preview URL
    const url = URL.createObjectURL(file);
    setPreview(url);
    onUpload(file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const clearPreview = () => {
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div style={{ marginTop: "12px", maxWidth: "400px" }}>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        style={{ display: "none" }}
        id={`ai-image-upload-${label.replace(/\s+/g, "-").toLowerCase()}`}
        disabled={disabled}
      />

      {!preview ? (
        /* Drop Zone */
        <div
          className={`image-upload-zone ${dragging ? "drag-over" : ""}`}
          onClick={() => !disabled && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          role="button"
          aria-label={`Upload ${label}`}
          tabIndex={0}
          onKeyPress={(e) => e.key === "Enter" && inputRef.current?.click()}
        >
          <span className="upload-icon">📸</span>
          <h4>Upload {label}</h4>
          <p>Drag & drop or click to browse</p>
          <p style={{ marginTop: "6px", fontSize: "11px", color: "#334155" }}>
            JPG, PNG, WebP — Max 10MB
          </p>
        </div>
      ) : (
        /* Preview after selection */
        <div className="upload-preview">
          <img src={preview} alt={`${label} preview`} />
          <div className="upload-preview-overlay">
            <span onClick={clearPreview} role="button" tabIndex={0}>
              🔄 Change Image
            </span>
          </div>
          {/* Selected confirmation badge */}
          <div style={{
            padding: "8px 12px",
            background: "rgba(16,185,129,0.1)",
            borderTop: "1px solid rgba(16,185,129,0.2)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "12px",
            color: "#6ee7b7"
          }}>
            <span>✅</span>
            <span>{label} selected — click Send to upload</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
