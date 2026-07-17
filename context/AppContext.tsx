"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { getLinks, getUserProfile, getUserByUsername, saveUserProfile, deleteLink, updateLink, createLink, Link, UserProfile } from "@/lib/firebase/db";
import { toast } from "react-toastify";

interface AppContextType {
  user: any;
  loading: boolean;
  saving: boolean;
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  image: string;
  setImage: (imageUrl: string) => void;
  saveData: (updatedProfile?: UserProfile, updatedImage?: string, updatedLinks?: Link[]) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [profile, setProfile] = useState<UserProfile>({ firstName: "", lastName: "", email: "" });
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const [userProfile, userLinks] = await Promise.all([
            getUserProfile(user.uid),
            getLinks(user.uid)
          ]);

          if (userProfile) {
            setProfile({
              firstName: userProfile.firstName || "",
              lastName: userProfile.lastName || "",
              email: userProfile.email || user.email || "",
              profileImage: userProfile.profileImage || "",
              username: userProfile.username || "",
              bio: userProfile.bio || "",
              phoneNumber: userProfile.phoneNumber || "",
              description: userProfile.description || "",
            });
            if (userProfile.profileImage) {
              setImage(userProfile.profileImage);
            }
          } else {
            // Default user's profile email to their Firebase Auth email
            setProfile({
              firstName: "",
              lastName: "",
              email: user.email || "",
              username: "",
              bio: "",
              phoneNumber: "",
              description: "",
            });
          }

          setLinks(userLinks.map(link => ({ ...link, userId: link.userId || user.uid })));
        } catch (err) {
          console.error("Error loading user data:", err);
          toast.error("Failed to load profile details.");
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const saveData = async (updatedProfile?: UserProfile, updatedImage?: string, updatedLinks?: Link[]) => {
    if (!user) {
      console.log("saveData aborted: user is null");
      return;
    }
    setSaving(true);
    try {
      const activeProfile = updatedProfile || profile;
      const activeImage = updatedImage !== undefined ? updatedImage : image;
      const activeLinks = updatedLinks || links;

      // 1. Uniqueness check for username slug
      if (activeProfile.username) {
        const cleanedUsername = activeProfile.username.toLowerCase().trim();
        const usernameRegex = /^[a-zA-Z0-9-_]{3,30}$/;
        if (!usernameRegex.test(cleanedUsername)) {
          toast.error("Username must be between 3 and 30 characters and only contain letters, numbers, hyphens (-), and underscores (_).");
          setSaving(false);
          return;
        }

        const existingUser = await getUserByUsername(cleanedUsername);
        if (existingUser && existingUser.uid !== user.uid) {
          toast.error("This username is already taken. Please choose another one.");
          setSaving(false);
          return;
        }
      }

      // 2. Fetch current DB links to calculate deletions
      const dbLinks = await getLinks(user.uid);
      const dbLinkIds = dbLinks.map(l => l.id).filter(Boolean) as string[];
      const currentLinkIds = activeLinks.map(l => l.id).filter(Boolean) as string[];

      // 3. Prepare all write and delete promises
      const promises: Promise<any>[] = [];

      // Save user profile details
      promises.push(
        saveUserProfile(user.uid, {
          ...activeProfile,
          username: activeProfile.username ? activeProfile.username.toLowerCase().trim() : "",
          profileImage: activeImage,
        })
      );

      // Delete removed links
      const toDelete = dbLinkIds.filter(id => !currentLinkIds.includes(id));
      toDelete.forEach(id => {
        promises.push(deleteLink(id, user.uid));
      });

      // Update or create remaining links
      const saveLinksPromises = activeLinks.map(async (link) => {
        if (link.id && !link.id.startsWith("temp-")) {
          await updateLink(link.id, user.uid, { platform: link.platform, url: link.url });
          return link;
        } else {
          const newId = await createLink({ platform: link.platform, url: link.url, userId: user.uid });
          return { ...link, id: newId };
        }
      });

      // 4. Execute all write and delete operations concurrently
      const [_, savedLinks] = await Promise.all([
        Promise.all(promises),
        Promise.all(saveLinksPromises)
      ]);

      if (updatedProfile) {
        setProfile({
          ...updatedProfile,
          username: updatedProfile.username ? updatedProfile.username.toLowerCase().trim() : "",
        });
      }
      if (updatedImage !== undefined) {
        setImage(activeImage);
      }
      setLinks(savedLinks);

      toast.success("Your changes have been successfully saved!");
    } catch (err) {
      console.error("Error saving user data:", err);
      toast.error("Error saving changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      loading: loading || authLoading,
      saving,
      links,
      setLinks,
      profile,
      setProfile,
      image,
      setImage,
      saveData,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}