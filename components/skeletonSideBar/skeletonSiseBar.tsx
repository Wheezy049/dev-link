import { SavedNameProps } from "../layout";
export type Link = {
  id?: string;
  platform: string;
  url: string;
  userId: string;
};

// export type savedNameProps = {
//   firstName: string;
//   lastName: string;
// };

interface SkeletonSideBarProps {
  links: Link[];
  savedName: SavedNameProps;
}

export default function SkeletonSideBar({ links, savedName}: SkeletonSideBarProps) {
  console.log("SkeletonSideBar: savedName updated:", JSON.stringify(savedName));
  return (
    <div className="hidden lg:flex lg:flex-row justify-center items-center w-[560px] h-[834px] p-6 rounded-xl bg-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="308"
        height="632"
        viewBox="0 0 308 632"
        fill="none"
      >
        <path
          d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z"
          stroke="#737373"
        />
        <svg
          x="11"
          y="11"
          xmlns="http://www.w3.org/2000/svg"
          width="286"
          height="612"
          viewBox="0 0 286 612"
          fill="none"
        >
          <path
            d="M1 45.5C1 20.9233 20.9233 1 45.5 1H69.5C75.8513 1 81 6.14873 81 12.5C81 20.5081 87.4919 27 95.5 27H190.5C198.508 27 205 20.5081 205 12.5C205 6.14873 210.149 1 216.5 1H240.5C265.077 1 285 20.9233 285 45.5V566.5C285 591.077 265.077 611 240.5 611H45.5C20.9233 611 1 591.077 1 566.5V45.5Z"
            fill="white"
            stroke="#737373"
          />
          <svg
            x="95"
            y="50"
            xmlns="http://www.w3.org/2000/svg"
            width="97"
            height="150"
            viewBox="0 0 97 150"
            fill="none"
          >
            <circle cx="48.5" cy="48" r="48" fill="#EEEEEE" />
          </svg>
          <svg
            x="30"
            y="50"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="150"
            viewBox="0 0 100% 150"
            fill="none"
          >
            <rect x="0" y="105" width="80%" height="25" rx="8" ry="8" fill="#EEEEEE" /> 
            <text x="20" y="120" fill="#000" fontSize="10">{savedName.firstName}</text>
          </svg>
          <svg
            x="70"
            y="90"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="150"
            viewBox="0 0 100% 150"
            fill="none"
          >
            <rect x="0" y="105" width="50%" height="25" rx="8" ry="8" fill="#EEEEEE" /> 
          </svg>


          {Array.isArray(links) && links.length === 0 && (
    <g transform="translate(20, 150)">
      {Array.from({ length: 5 }).map((_, index) => (
        <g key={index} transform={`translate(0, ${index * 64})`}>
          <rect
            x="0"
            y="90"
            width="85%"
            height="44"
            rx="8"
            ry="8"
            fill="#EEEEEE"
          />
        </g>
      ))}
    </g>
  )}
          {Array.isArray(links) && links.length > 0 && (
            <g transform="translate(20, 150)">
              {links.map((link, index) => (
                <g key={link.id} transform={`translate(0, ${index * 64})`}>
                  <rect
                    x="0"
                    y="90"
                    width="85%"
                    height="44"
                    rx="8"
                    ry="8"
                    fill="#1A1A1A"
                  />
                  <text x="20" y="115" fontSize="11" fill="#FFF" >
                    {link.platform}: {link.url}
                  </text>
                </g>
              ))}
            </g>
          )}
        </svg>
      </svg>
    </div>
  );
}
