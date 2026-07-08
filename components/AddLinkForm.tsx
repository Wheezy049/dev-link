import { useState, useEffect } from "react";
import { Link } from "@/lib/firebase/db";

interface AddLinkFormProps {
  index: number;
  link: Link;
  onChange: (updatedLink: Link) => void;
  onRemove: () => void;
}

const AddLinkForm = ({ index, link, onChange, onRemove }: AddLinkFormProps) => {
  const [url, setUrl] = useState(link.url);
  const [platform, setPlatform] = useState(link.platform);
  const [error, setError] = useState("");

  const platformPatterns: Record<string, RegExp> = {
    github: /^https:\/\/(www\.)?github\.com\/.+$/,
    facebook: /^https:\/\/(www\.)?facebook\.com\/.+$/,
    twitter: /^https:\/\/(www\.)?(x|twitter)\.com\/.+$/,
    instagram: /^https:\/\/(www\.)?instagram\.com\/.+$/,
    linkedin: /^https:\/\/(www\.)?linkedin\.com\/(in|pub)\/.+$/,
  };

  const validateUrl = (selectedPlatform: string, inputUrl: string): boolean => {
    if (!inputUrl.trim()) {
      return true; // Don't show validation error if empty yet
    }
    const pattern = platformPatterns[selectedPlatform.toLowerCase()];
    if (pattern) {
      return pattern.test(inputUrl);
    }
    return true; // If platform has no pattern, assume valid
  };

  // Sync state when props change
  useEffect(() => {
    setUrl(link.url);
    setPlatform(link.platform);
  }, [link]);

  const handleUrlChange = (val: string) => {
    setUrl(val);
    const isValid = validateUrl(platform, val);
    if (!isValid) {
      setError("Please check the URL matches the selected platform");
    } else {
      setError("");
    }
    onChange({ ...link, url: val });
  };

  const handlePlatformChange = (val: string) => {
    setPlatform(val);
    const isValid = validateUrl(val, url);
    if (!isValid) {
      setError("Please check the URL matches the selected platform");
    } else {
      setError("");
    }
    onChange({ ...link, platform: val });
  };

  return (
    <div className="bg-[#FAFAFA] p-5 rounded-xl mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-[#737373] text-base flex items-center gap-2">
          {/* List drag/drop/reorder handles could go here */}
          <span>=</span>
          <span>Link #{index + 1}</span>
        </h3>
        <button onClick={onRemove} className="text-[#737373] hover:text-red-500 text-base font-normal">
          Remove
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 w-full">
          <span className="text-[#333333] text-xs font-normal">Platform</span>
          <select
            value={platform}
            onChange={(e) => handlePlatformChange(e.target.value)}
            className="border border-[#D9D9D9] text-[#333333] bg-white rounded-lg p-3 outline-none focus:border-[#633CFF] focus:ring-1 focus:ring-[#633CFF]"
          >
            <option value="github">GitHub</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 w-full relative">
          <span className="text-[#333333] text-xs font-normal">Link</span>
          <div className={`flex border rounded-lg p-3 items-center bg-white ${
            error ? "border-red-500 focus-within:border-red-500" : "border-[#D9D9D9] focus-within:border-[#633CFF]"
          }`}>
            <span className="text-[#737373] mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path fill="#737373" d="M8.52 11.23a.62.62 0 0 1-.44-.19l-.33-.33a.62.62 0 0 1 0-.88L9.8 7.78a1.25 1.25 0 1 0-1.77-1.77L6.08 7.96a.62.62 0 0 1-.88 0l-.33-.33a.62.62 0 0 1 0-.88l1.95-1.95a2.5 2.5 0 0 1 3.53 3.53l-1.4 1.4a.62.62 0 0 1-.43.5ZM6.03 12.38a2.5 2.5 0 0 1-3.53-3.53l1.4-1.4a.62.62 0 0 1 .88 0l.33.33a.62.62 0 0 1 0 .88L3.06 9.7a1.25 1.25 0 1 0 1.77 1.77l1.95-1.95a.62.62 0 0 1 .88 0l.33.33a.62.62 0 0 1 0 .88l-1.96 1.96a2.49 2.49 0 0 1-1.78.74Z"/>
              </svg>
            </span>
            <input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder={`e.g. https://www.${platform.toLowerCase()}.com/yourprofile`}
              className="text-[#333333] text-base outline-none border-none w-full bg-transparent"
            />
          </div>
          {error && <span className="text-red-500 text-xs mt-1 absolute bottom-[-18px] right-2">{error}</span>}
        </label>
      </div>
    </div>
  );
};

export default AddLinkForm;