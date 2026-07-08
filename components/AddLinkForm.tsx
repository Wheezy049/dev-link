import { useState, useEffect, useRef } from "react";
import { Link } from "@/lib/firebase/db";
import { platforms } from "@/lib/platforms";

interface AddLinkFormProps {
  index: number;
  link: Link;
  onChange: (updatedLink: Link) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}

const AddLinkForm = ({ index, link, onChange, onRemove, onMoveUp, onMoveDown }: AddLinkFormProps) => {
  const [url, setUrl] = useState(link.url);
  const [platform, setPlatform] = useState(link.platform || "github");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentPlatform = platforms.find((p) => p.id === (platform || "").toLowerCase()) || platforms[0];

  const validateUrl = (selectedPlatform: string, inputUrl: string): boolean => {
    if (!inputUrl.trim()) return true;
    const config = platforms.find((p) => p.id === selectedPlatform.toLowerCase());
    if (config) {
      return config.pattern.test(inputUrl);
    }
    return true;
  };

  // Sync props to state
  useEffect(() => {
    setUrl(link.url);
    setPlatform(link.platform);
  }, [link]);

  // Click outside listener to close custom dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUrlChange = (val: string) => {
    setUrl(val);
    const isValid = validateUrl(platform, val);
    if (!isValid) {
      setError("Please check the URL matches the platform");
    } else {
      setError("");
    }
    onChange({ ...link, url: val });
  };

  const handlePlatformChange = (selectedId: string) => {
    setPlatform(selectedId);
    const isValid = validateUrl(selectedId, url);
    if (!isValid) {
      setError("Please check the URL matches the platform");
    } else {
      setError("");
    }
    onChange({ ...link, platform: selectedId });
    setIsOpen(false);
  };

  return (
    <div className="bg-[#FAFAFA] p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-[#737373] text-base flex items-center gap-2">
          {/* Drag Handle Mock */}
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="6" fill="none" viewBox="0 0 12 6" className="cursor-grab">
            <path fill="#737373" fillRule="evenodd" d="M0 1a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm0 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm5-4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm0 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm5-4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm0 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" clipRule="evenodd"/>
          </svg>
          <span>Link #{index + 1}</span>
        </h3>
        <div className="flex items-center gap-3">
          {onMoveUp && (
            <button
              type="button"
              onClick={onMoveUp}
              className="text-[#737373] hover:text-[#633CFF] transition-colors p-1 text-sm"
              title="Move Up"
            >
              ▲
            </button>
          )}
          {onMoveDown && (
            <button
              type="button"
              onClick={onMoveDown}
              className="text-[#737373] hover:text-[#633CFF] transition-colors p-1 text-sm"
              title="Move Down"
            >
              ▼
            </button>
          )}
          <span className="text-gray-300">|</span>
          <button onClick={onRemove} className="text-[#737373] hover:text-red-500 transition-colors text-base font-normal">
            Remove
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Custom React Dropdown Selector */}
        <div className="relative w-full" ref={dropdownRef}>
          <label className="text-[#333333] text-xs font-normal mb-1.5 block">Platform</label>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between border border-[#D9D9D9] rounded-lg p-3 bg-white text-[#333333] outline-none focus:border-[#633CFF] focus:ring-1 focus:ring-[#633CFF] cursor-pointer shadow-sm transition-all"
          >
            <div className="flex items-center gap-3 text-[#333333]">
              {currentPlatform.icon}
              <span>{currentPlatform.name}</span>
            </div>
            {/* Chevron Icon */}
            <svg
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="8"
              fill="none"
              viewBox="0 0 14 8"
            >
              <path stroke="#633CFF" strokeWidth="2" d="M1 1l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Floating Dropdown Choices Card */}
          {isOpen && (
            <div className="absolute top-[105%] left-0 w-full bg-white border border-[#D9D9D9] rounded-lg shadow-lg z-30 max-h-[220px] overflow-y-auto mt-1 no-scrollbar animate-fade-in">
              {platforms.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePlatformChange(p.id)}
                  className={`w-full flex items-center gap-3 p-3 text-left hover:bg-[#EFEBFF] transition-colors border-b border-gray-50 last:border-none ${
                    p.id === platform.toLowerCase() ? "text-[#633CFF] font-semibold bg-[#EFEBFF] bg-opacity-20" : "text-[#333333]"
                  }`}
                >
                  {p.icon}
                  <span className="text-sm">{p.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* URL Input */}
        <label className="flex flex-col gap-1.5 w-full relative">
          <span className="text-[#333333] text-xs font-normal">Link</span>
          <div className={`flex border rounded-lg p-3 items-center bg-white shadow-sm transition-all ${
            error ? "border-red-500 focus-within:border-red-500" : "border-[#D9D9D9] focus-within:border-[#633CFF] focus-within:shadow-[0_0_8px_rgba(99,60,255,0.15)]"
          }`}>
            <span className="text-[#737373] mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path fill="#737373" d="M8.52 11.23a.62.62 0 0 1-.44-.19l-.33-.33a.62.62 0 0 1 0-.88L9.8 7.78a1.25 1.25 0 1 0-1.77-1.77L6.08 7.96a.62.62 0 0 1-.88 0l-.33-.33a.62.62 0 0 1 0-.88l1.95-1.95a2.5 2.5 0 0 1 3.53 3.53l-1.4 1.4a.62.62 0 0 1-.43.5ZM6.03 12.38a2.5 2.5 0 0 1-3.53-3.53l1.4-1.4a.62.62 0 0 1 .88 0l.33.33a.62.62 0 0 1 0 .88L3.06 9.7a1.25 1.25 0 1 0 1.77 1.77l1.95-1.95a.62.62 0 0 1 .88 0l.33.33a.62.62 0 0 1 0 .88l-1.96 1.96a2.49 2.49 0 0 1-1.78.74Z"/>
              </svg>
            </span>
            <input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder={`e.g. ${currentPlatform.placeholder}`}
              className="text-[#333333] text-sm md:text-base outline-none border-none w-full bg-transparent"
            />
            {error && (
              <span className="text-red-500 text-xs font-normal absolute right-3 pr-2">
                {error}
              </span>
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default AddLinkForm;