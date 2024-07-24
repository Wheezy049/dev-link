import Header from "../../components/header/header";
import SkeletonSideBar from "../../components/skeletonSideBar/skeletonSiseBar";

export default function Profile() {
  return (
    <div>
      <Header />
      <div className="flex flex-col lg:flex-row justify-center items-center m-6 gap-6">
        <SkeletonSideBar />
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
                className="bg-[#EFEBFF] w-[193px] h-[193px] px-5 py-15 rounded-lg flex flex-col items-center justify-center space-y-4"
              >
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M33.75 6.25H6.25C5.58696 6.25 4.95107 6.51339 4.48223 6.98223C4.01339 7.45107 3.75 8.08696 3.75 8.75V31.25C3.75 31.913 4.01339 32.5489 4.48223 33.0178C4.95107 33.4866 5.58696 33.75 6.25 33.75H33.75C34.413 33.75 35.0489 33.4866 35.5178 33.0178C35.9866 32.5489 36.25 31.913 36.25 31.25V8.75C36.25 8.08696 35.9866 7.45107 35.5178 6.98223C35.0489 6.51339 34.413 6.25 33.75 6.25ZM33.75 8.75V24.8047L29.6766 20.7328C29.4444 20.5006 29.1688 20.3164 28.8654 20.1907C28.5621 20.0651 28.2369 20.0004 27.9086 20.0004C27.5802 20.0004 27.2551 20.0651 26.9518 20.1907C26.6484 20.3164 26.3728 20.5006 26.1406 20.7328L23.0156 23.8578L16.1406 16.9828C15.6718 16.5143 15.0362 16.2512 14.3734 16.2512C13.7107 16.2512 13.075 16.5143 12.6062 16.9828L6.25 23.3391V8.75H33.75ZM6.25 26.875L14.375 18.75L26.875 31.25H6.25V26.875ZM33.75 31.25H30.4109L24.7859 25.625L27.9109 22.5L33.75 28.3406V31.25ZM22.5 15.625C22.5 15.2542 22.61 14.8916 22.816 14.5833C23.022 14.275 23.3149 14.0346 23.6575 13.8927C24.0001 13.7508 24.3771 13.7137 24.7408 13.786C25.1045 13.8584 25.4386 14.037 25.7008 14.2992C25.963 14.5614 26.1416 14.8955 26.214 15.2592C26.2863 15.6229 26.2492 15.9999 26.1073 16.3425C25.9654 16.6851 25.725 16.978 25.4167 17.184C25.1084 17.39 24.7458 17.5 24.375 17.5C23.8777 17.5 23.4008 17.3025 23.0492 16.9508C22.6975 16.5992 22.5 16.1223 22.5 15.625Z"
                      fill="#633CFF"
                    />
                  </svg>
                  <p className="text-[#633CFF] font-semibold text-base">
                    + Upload Image
                  </p>
                </div>
                <input
                  type="file"
                  id="image-upload"
                  name="image-upload"
                  accept="image/png, image/jpeg"
                  className="block w-full text-center mt-4"
                />
                <p id="error-message" className="text-red-500 mt-2"></p>
              </form>
              <p className="text-[#737373] text-sm w-1/3">
                Image must be below 1024x1024px. Use PNG or JPG format.
              </p>
            </div>
            <div className="bg-[#FAFAFA] p-5 flex flex-col gap-3">
              <div className="flex w-full gap-4 items-center">
                <label className="w-1/2 text-[#737373] text-base">First name*</label>
                <input type="text" placeholder="e.g. john" className="bg-white w-full rounded-lg p-2 outline-none border-none border border-[#D9D9D9] text-[#333] text-base"/>
              </div>
              <div className="flex w-full gap-4 items-center">
                <label className="w-1/2 text-[#737373] text-base">Last name*</label>
                <input type="text" placeholder="e.g. Appleseed" className="bg-white w-full rounded-lg p-2 outline-none border-none border border-[#D9D9D9] text-[#333] text-base"/>
              </div>
              <div className="flex w-full gap-4 items-center">
                <label className="w-1/2 text-[#737373] text-base">Email</label>
                <input type="email" placeholder="e.g. email@example.com" className="bg-white w-full rounded-lg p-2 outline-none border-none border border-[#D9D9D9] text-[#333] text-base"/>
              </div>
            </div>
          </div>
          <div className=" w-[343px] md:w-[721px] lg:w-[808px] h-[94px] flex justify-end items-center px-10 py-6 rounded-xl bg-white">
            <button className="px-7 py-3 text-base font-semibold text-white bg-[#633CFF] rounded-lg">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
