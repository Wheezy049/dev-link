"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { getLinks, getUserProfile, saveUserProfile, deleteLink, updateLink, createLink, Link, UserProfile } from "@/lib/firebase/db";
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
          const userProfile = await getUserProfile(user.uid);
          if (userProfile) {
            setProfile({
              firstName: userProfile.firstName || "",
              lastName: userProfile.lastName || "",
              email: userProfile.email || user.email || "",
              profileImage: userProfile.profileImage || "",
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
            });
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

      await saveUserProfile(user.uid, {
        ...activeProfile,
        profileImage: activeImage,
      });

      if (updatedProfile) {
        setProfile(updatedProfile);
      }
      if (updatedImage !== undefined) {
        setImage(activeImage);
      }

      const dbLinks = await getLinks(user.uid);
      const dbLinkIds = dbLinks.map(l => l.id).filter(Boolean) as string[];
      const currentLinkIds = activeLinks.map(l => l.id).filter(Boolean) as string[];

      // Delete removed links
      const toDelete = dbLinkIds.filter(id => !currentLinkIds.includes(id));
      for (const id of toDelete) {
        await deleteLink(id, user.uid);
      }

      // Create or update remaining links
      const finalLinks: Link[] = [];
      for (const link of activeLinks) {
        if (link.id) {
          await updateLink(link.id, user.uid, { platform: link.platform, url: link.url });
          finalLinks.push(link);
        } else {
          const newId = await createLink({ platform: link.platform, url: link.url, userId: user.uid });
          finalLinks.push({ ...link, id: newId });
        }
      }
      setLinks(finalLinks);
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