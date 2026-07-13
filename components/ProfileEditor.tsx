"use client";
import { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import { Image as ImageIcon } from "lucide-react";

export default function ProfileEditor() {
  const { profile, image, setImage, saveData, saving } = useAppContext();
  const [firstName, setFirstName] = useState(profile.firstName || "");
  const [lastName, setLastName] = useState(profile.lastName || "");
  const [email, setEmail] = useState(profile.email || "");
  const [username, setUsername] = useState(profile.username || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [phoneNumber, setPhoneNumber] = useState(profile.phoneNumber || "");
  const [description, setDescription] = useState(profile.description || "");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }
    setError("");
    // Trigger global context save with explicit values
    await saveData(
      { 
        firstName, 
        lastName, 
        email, 
        username: username.trim(),
        bio: bio.trim(),
        phoneNumber: phoneNumber.trim(),
        description: description.trim()
      }, 
      image
    );
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
    setUsername(profile.username || "");
    setBio(profile.bio || "");
    setPhoneNumber(profile.phoneNumber || "");
    setDescription(profile.description || "");
  }, [profile]);

  return (
    <div className="w-[343px] md:w-[721px] lg:w-[808px] min-h-[739px] p-8 md:p-10 rounded-[24px] bg-white flex flex-col justify-between">
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
                    <ImageIcon size={40} className="text-white" />
                    <p className="text-white font-semibold text-xs mt-1">Change Image</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <ImageIcon size={40} className="text-[#633CFF]" />
                  <p className="text-[#633CFF] font-semibold text-sm mt-2">+ Upload Image</p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-[#737373] text-xs max-w-[200px]">
                Image will be optimized automatically. Use PNG or JPG format.
              </p>
              {image && (
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="text-red-500 hover:text-red-700 font-semibold text-xs text-left w-fit transition-colors mt-1"
                >
                  Remove Image
                </button>
              )}
            </div>
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

        {/* Additional Details Section */}
        <div className="bg-[#FAFAFA] p-6 rounded-xl flex flex-col gap-4 mt-6">
          <h2 className="text-[#333333] text-lg font-semibold">Additional Info</h2>
          
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full">
            <label className="text-[#737373] text-sm md:w-1/3">
              Username Slug
            </label>
            <div className="flex flex-col w-full md:w-2/3">
              <div className="flex items-center bg-white border border-[#D9D9D9] rounded-lg focus-within:border-[#633CFF] focus-within:ring-1 focus-within:ring-[#633CFF]">
                <span className="pl-3 pr-1 text-[#737373] text-base select-none">/user/</span>
                <input
                  type="text"
                  placeholder="e.g. faruq"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                  className="bg-transparent p-3 outline-none text-[#333333] text-base w-full pl-0"
                />
              </div>
              <p className="text-[#737373] text-xs mt-1">
                Only letters, numbers, hyphens (-), and underscores (_) allowed.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full">
            <label className="text-[#737373] text-sm md:w-1/3">
              Bio / Headline
            </label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer | UI Designer"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-white border border-[#D9D9D9] rounded-lg p-3 outline-none focus:border-[#633CFF] focus:ring-1 focus:ring-[#633CFF] text-[#333333] text-base w-full md:w-2/3"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-full">
            <label className="text-[#737373] text-sm md:w-1/3">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="e.g. +1 234 567 890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="bg-white border border-[#D9D9D9] rounded-lg p-3 outline-none focus:border-[#633CFF] focus:ring-1 focus:ring-[#633CFF] text-[#333333] text-base w-full md:w-2/3"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 w-full">
            <label className="text-[#737373] text-sm md:w-1/3 mt-3">
              Description
            </label>
            <textarea
              placeholder="e.g. Tell us more about yourself, your background, or what you're working on..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="bg-white border border-[#D9D9D9] rounded-lg p-3 outline-none focus:border-[#633CFF] focus:ring-1 focus:ring-[#633CFF] text-[#333333] text-base w-full md:w-2/3 resize-none"
            />
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-xs mt-3">{error}</p>}
      <div>
        <hr className="border-[#D9D9D9] my-6" />
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-7 py-3 text-base font-semibold text-white bg-[#633CFF] rounded-lg transition-colors ${
              saving
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#5733E5] hover:shadow-lg"
            }`}
          >
            {saving ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Saving...</span>
              </div>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}