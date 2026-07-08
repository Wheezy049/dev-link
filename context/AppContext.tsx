"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { getLinks, getUserProfile, saveUserProfile, deleteLink, updateLink, createLink, Link, UserProfile } from "@/lib/firebase/db";
import { toast } from "react-toastify";

interface AppContextType {
  user: any;
  loading: boolean;
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  image: string;
  setImage: (imageUrl: string) => void;
  saveData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [profile, setProfile] = useState<UserProfile>({ firstName: "", lastName: "", email: "" });
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const userProfile = await getUserProfile(user.uid);
          if (userProfile) {
            setProfile({
              firstName: userProfile.firstName || "",
              lastName: userProfile.lastName || "",
              email: userProfile.email || "",
              profileImage: userProfile.profileImage || "",
            });
            if (userProfile.profileImage) {
              setImage(userProfile.profileImage);
            }
          }

          const userLinks = await getLinks(user.uid);
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

  const saveData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await saveUserProfile(user.uid, {
        ...profile,
        profileImage: image,
      });

      const dbLinks = await getLinks(user.uid);
      const dbLinkIds = dbLinks.map(l => l.id).filter(Boolean) as string[];
      const currentLinkIds = links.map(l => l.id).filter(Boolean) as string[];

      // Delete removed links
      const toDelete = dbLinkIds.filter(id => !currentLinkIds.includes(id));
      for (const id of toDelete) {
        await deleteLink(id, user.uid);
      }

      // Create or update remaining links
      const updatedLinks: Link[] = [];
      for (const link of links) {
        if (link.id) {
          await updateLink(link.id, user.uid, { platform: link.platform, url: link.url });
          updatedLinks.push(link);
        } else {
          const newId = await createLink({ platform: link.platform, url: link.url, userId: user.uid });
          updatedLinks.push({ ...link, id: newId });
        }
      }
      setLinks(updatedLinks);
      toast.success("Your changes have been successfully saved!");
    } catch (err) {
      console.error("Error saving user data:", err);
      toast.error("Error saving changes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      loading: loading || authLoading,
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