"use client";
import { useState, useEffect } from "react";

interface ProfileProps {
  savedName: { firstName: string; lastName: string; email: string; };
  setSavedName: (name: { firstName: string; lastName: string; email: string }) => void;
  setImage: (imageUrl: string) => void;
  image: string;
}

export default function Profile({
  savedName,
  setSavedName,
  image,
  setImage,
}: ProfileProps) {
  const [firstName, setFirstName] = useState(savedName.firstName || "");
  const [lastName, setLastName] = useState(savedName.lastName || "");
  const [email, setEmail] = useState(savedName.email || "");
  // const [image, setImage] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }
    setError("");
    const updatedName = { firstName, lastName , email};
    setSavedName(updatedName);
    console.log("Profile: Saving name:", updatedName);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // Creating a file reader to read the image
      const reader = new FileReader();

      reader.onloadend = () => {
        // Setting the image data URL (base64) to the state
        handleSetImage(reader.result as string);
      };

      // Read the image file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleSetImage = (imageUrl: string) => {
    setImage(imageUrl);
  };

  useEffect(() => {
    setFirstName(savedName.firstName || "");
    setLastName(savedName.lastName || "");
  }, [savedName]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-center items-center m-6 gap-6">
        <div className="flex flex-col gap-1">
          <div className="w-[343px] md:w-[721px] lg:w-[808px] h-[739px] border-b border-b-[#D9D9D9] p-10 rounded-xl bg-white">
            <h1 className="text-2xl md:text-3xl text-[#333] font-bold mb-2">
              Profile Details
            </h1>
            <p className="text-base text-[#333] mb-10">
              Add your details to create a personal touch to your profile.
            </p>
            <div className="bg-[#FAFAFA] p-20 mb-6 flex justify-between gap-4 items-center">
              <h1 className="text-[#737373] text-base w-1/3">
                Profile picture
              </h1>
              <form
                id="upload-form"
                className="bg-[#EFEBFF] w-[193px] h-[193px] rounded-lg flex flex-col items-center justify-center space-y-4"
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="none"
                    viewBox="0 0 40 40"
                  >
                    <path d="M33.75 6.25H6.25..." fill="#633CFF" />
                  </svg>
                  <p className="text-[#633CFF] font-semibold text-base">
                    + Upload Image
                  </p>
                </label>
              </form>
              {/* Render the uploaded image if it exists */}
              {image && (
                <img
                  src={image}
                  alt="Profile"
                  className="w-[193px] h-[193px] rounded-lg object-cover"
                />
              )}
              {/* <p className="text-[#737373] text-sm w-1/3">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p> */}
            </div>
            <div className="bg-[#FAFAFA] p-5 flex flex-col gap-3">
              <div className="flex w-full gap-4 items-center">
                <label className="w-1/2 text-[#737373] text-base">
                  First name*
                </label>
                <input
                  type="text"
                  placeholder="e.g. john"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-white w-full rounded-lg p-2 outline-none border-none border border-[#D9D9D9] text-[#333] text-base"
                />
              </div>
              <div className="flex w-full gap-4 items-center">
                <label className="w-1/2 text-[#737373] text-base">
                  Last name*
                </label>
                <input
                  type="text"
                  placeholder="e.g. Appleseed"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-white w-full rounded-lg p-2 outline-none border-none border border-[#D9D9D9] text-[#333] text-base"
                />
              </div>
              <div className="flex w-full gap-4 items-center">
                <label className="w-1/2 text-[#737373] text-base">Email</label>
                <input
                  type="email"
                  placeholder="e.g. email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white w-full rounded-lg p-2 outline-none border-none border border-[#D9D9D9] text-[#333] text-base"
                />
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className=" w-[343px] md:w-[721px] lg:w-[808px] h-[94px] flex justify-end items-center px-10 py-6 rounded-xl bg-white">
            <button
              onClick={handleSave}
              className="px-7 py-3 text-base font-semibold text-white bg-[#633CFF] rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
