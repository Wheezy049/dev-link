import { useState } from "react";

interface AddLinkFormProps {
  number: number;
  onAddLink: (platform: string, url: string) => void;
  onRemoveLink: (number: number) => void;
}

const AddLinkForm = ({ number, onAddLink, onRemoveLink }: AddLinkFormProps) => {
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const platformPatterns: Record<string, RegExp> = {
    github: /^https:\/\/(www\.)?github\.com\/.+$/,
    facebook: /^https:\/\/(www\.)?facebook\.com\/.+$/,
    twitter: /^https:\/\/(www\.)?x\.com\/.+$/,
    instagram: /^https:\/\/(www\.)?instagram\.com\/.+$/,
    linkedin: /^https:\/\/(www\.)?linkedin\.com\/.+$/,
    // Add more platforms as needed
  };

  const validateUrl = (platform: string, url: string): boolean => {
    const pattern = platformPatterns[platform.toLowerCase()];
    if (pattern) {
      return pattern.test(url);
    }
    return false;
  };

  const handleAddLink = () => {
    if (validateUrl(platform, url)) {
      onAddLink(platform, url);
      // setPlatform("");
      // setUrl("");
      // setError("");
    } else {
      setError("Invalid URL format for the selected platform");
    }
  };

  return (
    <div className="bg-gray-300">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-black">Link #{number}</h3>
        <button onClick={() => onRemoveLink(number)} className="text-red-500">
          Remove
        </button>
      </div>
      <label className="flex flex-col gap-1">
        <span className="font-semibold text-black">Platform</span>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="border border-gray-300 text-black rounded-lg p-2"
        >
          <option value="">Select Platform</option>
          <option value="github">GitHub</option>
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>
          {/* Add more platforms as needed */}
        </select>
      </label>
      <label className="flex flex-col gap-1">
        <span className="font-semibold">Link</span>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={`e.g. https://www.${platform.toLowerCase()}.com/yourprofile`}
          className="border border-gray-300 text-black rounded-lg p-2"
        />
      </label>
      {error && <span className="text-red-500">{error}</span>}
      <button
        onClick={handleAddLink}
        className="bg-blue-500 text-white p-2 rounded-lg mt-2"
      >
        Add Link
      </button>
    </div>
  );
};

export default AddLinkForm;
