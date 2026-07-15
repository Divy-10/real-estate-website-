import { useRef } from "react";

function UploadArea({ selectedFile, setSelectedFile }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleClearFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="upload-container mb-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
        aria-label="Upload property image or project map"
      />

      {selectedFile ? (
        <div className="d-flex align-items-center gap-2 p-2 bg-light border rounded-3 position-relative" style={{ maxWidth: "220px" }}>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Upload preview"
            style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
          />
          <div className="flex-grow-1 overflow-hidden">
            <div className="text-truncate fw-semibold" style={{ fontSize: "12px", color: "var(--text-dark)" }}>
              {selectedFile.name}
            </div>
            <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>
              {(selectedFile.size / 1024).toFixed(1)} KB
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-close"
            onClick={handleClearFile}
            aria-label="Remove uploaded file"
            style={{ padding: "0.25rem", fontSize: "10px" }}
          ></button>
        </div>
      ) : (
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary d-inline-flex align-items-center gap-1.5 py-1.5 px-3"
          onClick={triggerFileInput}
          style={{ fontSize: "13px", borderRadius: "var(--radius-sm)" }}
        >
          <i className="bi bi-image"></i> Add Property Image / Map
        </button>
      )}
    </div>
  );
}

export default UploadArea;
