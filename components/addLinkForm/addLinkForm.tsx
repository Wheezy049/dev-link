import { useState } from "react";
type AddLinkFormProps = {
  onAddLink: (platform: string, url: string) => void;
  number: number;
};

const socialMediaOptions = [
  { value: "twitter", label: "Twitter" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
];

export default function AddLinkForm({ onAddLink, number }: AddLinkFormProps) {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [url, setUrl] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlatform && url) {
      onAddLink(selectedPlatform, url);
      setSelectedPlatform("");
      setUrl("");
    }
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit} className="link-form">
        <h3>Link #{number}</h3>
        <div className="form-group">
          <label htmlFor={`platform-${number}`}>Select Platform</label>
          <select
            id={`platform-${number}`}
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            required
            className="form-control"
          >
            <option value="" disabled>
              Select a platform
            </option>
            {socialMediaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor={`url-${number}`}>URL</label>
          <input
            type="url"
            id={`url-${number}`}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter the URL"
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}
