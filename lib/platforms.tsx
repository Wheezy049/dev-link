import React from "react";
import { 
  FaGithub, 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube, 
  FaTiktok, 
  FaDiscord, 
  FaSlack, 
  FaGitlab, 
  FaDev 
} from "react-icons/fa";
import { SiHashnode } from "react-icons/si";

export type PlatformConfig = {
  id: string;
  name: string;
  color: string;
  bg: string;
  icon: React.ReactNode;
  pattern: RegExp;
  placeholder: string;
};

export const platforms: PlatformConfig[] = [
  {
    id: "github",
    name: "GitHub",
    color: "#1A1A1A",
    bg: "bg-[#1A1A1A] hover:bg-[#333333] text-white",
    pattern: /^https:\/\/(www\.)?github\.com\/.+$/,
    placeholder: "https://github.com/username",
    icon: <FaGithub size={16} />
  },
  {
    id: "facebook",
    name: "Facebook",
    color: "#1877F2",
    bg: "bg-[#1877F2] hover:bg-[#3b5998] text-white",
    pattern: /^https:\/\/(www\.)?facebook\.com\/.+$/,
    placeholder: "https://facebook.com/username",
    icon: <FaFacebook size={16} />
  },
  {
    id: "twitter",
    name: "Twitter",
    color: "#1D9BF0",
    bg: "bg-[#1D9BF0] hover:bg-[#007cc4] text-white",
    pattern: /^https:\/\/(www\.)?(x|twitter)\.com\/.+$/,
    placeholder: "https://x.com/username",
    icon: <FaTwitter size={16} />
  },
  {
    id: "instagram",
    name: "Instagram",
    color: "#E1306C",
    bg: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:brightness-110 text-white",
    pattern: /^https:\/\/(www\.)?instagram\.com\/.+$/,
    placeholder: "https://instagram.com/username",
    icon: <FaInstagram size={16} />
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    color: "#0A66C2",
    bg: "bg-[#0A66C2] hover:bg-[#004182] text-white",
    pattern: /^https:\/\/(www\.)?linkedin\.com\/(in|pub)\/.+$/,
    placeholder: "https://linkedin.com/in/username",
    icon: <FaLinkedin size={16} />
  },
  {
    id: "youtube",
    name: "YouTube",
    color: "#FF0000",
    bg: "bg-[#FF0000] hover:bg-[#cc0000] text-white",
    pattern: /^https:\/\/(www\.)?youtube\.com\/.+$/,
    placeholder: "https://youtube.com/@username",
    icon: <FaYoutube size={16} />
  },
  {
    id: "tiktok",
    name: "TikTok",
    color: "#010101",
    bg: "bg-[#010101] hover:bg-[#1a1a1a] text-white",
    pattern: /^https:\/\/(www\.)?tiktok\.com\/.+$/,
    placeholder: "https://tiktok.com/@username",
    icon: <FaTiktok size={16} />
  },
  {
    id: "discord",
    name: "Discord",
    color: "#5865F2",
    bg: "bg-[#5865F2] hover:bg-[#4752c4] text-white",
    pattern: /^https:\/\/(www\.)?(discord\.com|discord\.gg)\/.+$/,
    placeholder: "https://discord.gg/invitecode",
    icon: <FaDiscord size={16} />
  },
  {
    id: "slack",
    name: "Slack",
    color: "#4A154B",
    bg: "bg-[#4A154B] hover:bg-[#3b103c] text-white",
    pattern: /^https:\/\/[a-z0-9-]+\.slack\.com\/.+$/,
    placeholder: "https://workspace.slack.com",
    icon: <FaSlack size={16} />
  },
  {
    id: "gitlab",
    name: "GitLab",
    color: "#FC6D26",
    bg: "bg-[#FC6D26] hover:bg-[#e24e04] text-white",
    pattern: /^https:\/\/(www\.)?gitlab\.com\/.+$/,
    placeholder: "https://gitlab.com/username",
    icon: <FaGitlab size={16} />
  },
  {
    id: "devto",
    name: "Dev.to",
    color: "#0A0A0A",
    bg: "bg-[#0A0A0A] hover:bg-[#222222] text-white",
    pattern: /^https:\/\/(www\.)?dev\.to\/.+$/,
    placeholder: "https://dev.to/username",
    icon: <FaDev size={16} />
  },
  {
    id: "hashnode",
    name: "Hashnode",
    color: "#2962FF",
    bg: "bg-[#2962FF] hover:bg-[#0039cb] text-white",
    pattern: /^https:\/\/([a-z0-9-]+\.)?hashnode\.dev\/.+$|^https:\/\/hashnode\.com\/@.+$/,
    placeholder: "https://hashnode.dev/@username",
    icon: <SiHashnode size={16} />
  }
];