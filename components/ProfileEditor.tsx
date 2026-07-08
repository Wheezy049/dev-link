"use client";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export default function ProfileEditor() {
  const { profile, setProfile, image, setImage, saveData, loading } = useAppContext();
  const [firstName, setFirstName] = useState(profile.firstName || "");
  const [lastName, setLastName] = useState(profile.lastName || "");
  const [email, setEmail] = useState(profile.email || "");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }
    setError("");
    // Update local context values
    setProfile({ firstName, lastName, email });
    // Trigger global context save
    await saveData();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          // Create canvas to crop and resize the image to a standard 150x150 square
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const targetSize = 150;
          canvas.width = targetSize;
          canvas.height = targetSize;

          if (ctx) {
            // Center crop calculations
            const minSize = Math.min(img.width, img.height);
            const startX = (img.width - minSize) / 2;
            const startY = (img.height - minSize) / 2;

            // Draw image cropped to square
            ctx.drawImage(
              img,
              startX,
              startY,
              minSize,
              minSize,
              0,
              0,
              targetSize,
              targetSize
            );

            // Compress to JPEG with 0.8 quality factor (results in ~5-12KB base64)
            const compressedBase64 = canvas.toDataURL("image/jpeg", 0.8);
            setImage(compressedBase64);
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    setFirstName(profile.firstName || "");
    setLastName(profile.lastName || "");
    setEmail(profile.email || "");
  }, [profile]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-[343px] md:w-[721px] lg:w-[808px] min-h-[739px] border border-[#D9D9D9] p-8 md:p-10 rounded-xl bg-white flex flex-col justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl text-[#333333] font-bold mb-2">
            Profile Details
          </h1>
          <p className="text-base text-[#737373] mb-10">
            Add your details to create a personal touch to your profile.
          </p>

          {/* Profile Picture Upload Section */}
          <div className="bg-[#FAFAFA] p-6 rounded-xl mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <h2 className="text-[#737373] text-sm md:text-base w-full md:w-1/3">
              Profile picture
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 w-full md:w-2/3">
              <div className="relative w-[193px] h-[193px] rounded-lg bg-[#EFEBFF] flex flex-col items-center justify-center cursor-pointer overflow-hidden border border-[#BEADFF]">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  id="image-upload"
                />
                
                {image ? (
                  <div className="absolute inset-0 w-full h-full z-0 group">
                    <img
                      src={image}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-lg group-hover:opacity-40 transition-opacity"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-40">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
                        <path d="M33.75 6.25H6.25c-1.378 0-2.5 1.122-2.5 2.5v22.5c0 1.378 1.122 2.5 2.5 2.5h27.5c1.378 0 2.5-1.122 2.5-2.5V8.75c0-1.378-1.122-2.5-2.5-2.5Zm-27.5 2.5h27.5v16.11l-5.69-5.69a1.25 1.25 0 0 0-1.77 0l-7.79 7.79-3.79-3.79a1.25 1.25 0 0 0-1.77 0L5.03 29.83a1.23 1.23 0 0 0-.03-.23V8.75Zm0 22.5V31l7.11-7.11 3.79 3.79a1.25 1.25 0 0 0 1.77 0l7.79-7.79 6.84 6.84v4.57H6.25v-.01Z" fill="#FFFFFF"/>
                      </svg>
                      <p className="text-white font-semibold text-xs mt-1">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" viewBox="0 0 40 40">
                      <path d="M33.75 6.25H6.25c-1.378 0-2.5 1.122-2.5 2.5v22.5c0 1.378 1.122 2.5 2.5 2.5h27.5c1.378 0 2.5-1.122 2.5-2.5V8.75c0-1.378-1.122-2.5-2.5-2.5Zm-27.5 2.5h27.5v16.11l-5.69-5.69a1.25 1.25 0 0 0-1.77 0l-7.79 7.79-3.79-3.79a1.25 1.25 0 0 0-1.77 0L5.03 29.83a1.23 1.23 0 0 0-.03-.23V8.75Zm0 22.5V31l7.11-7.11 3.79 3.79a1.25 1.25 0 0 0 1.77 0l7.79-7.79 6.84 6.84v4.57H6.25v-.01Z" fill="#633CFF"/>
                    </svg>
                    <p className="text-[#633CFF] font-semibold text-sm mt-2">+ Upload Image</p>
                  </div>
                )}
              </div>
              <p className="text-[#737373] text-xs max-w-[200px]">
                Image will be optimized automatically. Use PNG or JPG format.
              </p>
            </div>
          </div>

          {/* Text Input Fields Section */}
          <div className="bg-[#FAFAFA] p-6 rounded-xl flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full">
              <label className="text-[#737373] text-sm md:w-1/3">
                First name*
              </label>
              <input
                type="text"
                placeholder="e.g. John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-white border border-[#D9D9D9] rounded-lg p-3 outline-none focus:border-[#633CFF] focus:ring-1 focus:ring-[#633CFF] text-[#333333] text-base w-full md:w-2/3"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full">
              <label className="text-[#737373] text-sm md:w-1/3">
                Last name*
              </label>
              <input
                type="text"
                placeholder="e.g. Appleseed"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-white border border-[#D9D9D9] rounded-lg p-3 outline-none focus:border-[#633CFF] focus:ring-1 focus:ring-[#633CFF] text-[#333333] text-base w-full md:w-2/3"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full">
              <label className="text-[#737373] text-sm md:w-1/3">
                Email
              </label>
              <input
                type="email"
                placeholder="e.g. email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border border-[#D9D9D9] rounded-lg p-3 outline-none focus:border-[#633CFF] focus:ring-1 focus:ring-[#633CFF] text-[#333333] text-base w-full md:w-2/3"
              />
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
      </div>

      {/* Save Button Footer Panel */}
      <div className="w-[343px] md:w-[721px] lg:w-[808px] h-[94px] flex justify-end items-center px-10 py-6 border border-[#D9D9D9] rounded-xl bg-white">
        <button
          onClick={handleSave}
          disabled={loading}
          className={`px-7 py-3 text-base font-semibold text-white bg-[#633CFF] rounded-lg transition-colors ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-[#BEADFF] hover:shadow-lg"
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}