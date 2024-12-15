import { useState, useEffect } from "react";
import AddLinkForm from "../addLinkForm/addLinkForm";
import EmptyForm from "../emptyForm/emptyForm";
import { createLink, getLinks, updateLink, deleteLink } from "@/CRUD/crud";
import useAuth from "@/useAuth/useAuth";

export type Link = {
  platform: string;
  url: string;
  id?: string;
  userId: string; // Ensure userId is always a string
};

export default function Links({
  links,
  setLinks,
}: {
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
}) {
  const { user } = useAuth();
  const [linkForms, setLinkForms] = useState<number[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddLink = async (platform: string, url: string) => {
    if (user) {
      const newLink = { platform, url, userId: user.uid };
      const linkId = await createLink(newLink);
      setLinks((prevLinks) => [...prevLinks, { ...newLink, id: linkId }]);
    }
  };

  const handleRemoveLinkForm = (number: number) => {
    setLinkForms((prevForms) => prevForms.filter((form) => form !== number));
  };

  const handleUpdateLink = async (id: string, platform: string, url: string) => {
    if (user) {
      await updateLink(id, user.uid, { platform, url });
      setLinks((prevLinks) =>
        prevLinks.map((link) => (link.id === id ? { ...link, platform, url } : link))
      );
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (user) {
      await deleteLink(id, user.uid);
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
    }
  };

  const handleAddForm = () => {
    setLinkForms((prevForms) => [...prevForms, prevForms.length + 1]);
    setShowForm(true);
  };

  return (
    <div>
      <div className=" flex justify-center items-center m-6 gap-6">
        {/* <SkeletonSideBar links={links}/> */}
        <div className="flex flex-col gap-1">
          <div className="w-[343px] md:w-[721px] lg:w-[808px] h-[739px] border-b border-b-[#D9D9D9] p-10 rounded-xl bg-white overflow-hidden">
            <h1 className="text-[#333] text-2xl md:text-3xl font-bold mb-2">
              Customize your links
            </h1>
            <p className="text-base text-[#333] mb-10">
              Add/edit/remove links below and then share all your profiles with
              the world!
            </p>
            <div>
              <button
                onClick={handleAddForm}
                className="bg-white h-11 w-full text-base font-semibold text-[#633CFF] px-7 py-3 border border-[#633CFF] rounded-lg flex justify-center mb-6"
              >
                + Add new link
              </button>
            </div>
            {!showForm ? (
              <EmptyForm />
            ) : (
              linkForms.map((number) => (
                <AddLinkForm
                  key={number}
                  number={number}
                  onAddLink={handleAddLink}
                  onRemoveLink={handleRemoveLinkForm}
                />
              ))
            )}
            <div>
              {links.map((link) => (
                <div key={link.id} className="flex items-center justify-between">
                  <span>{link.platform}: {link.url}</span>
                  <div>
                    <button onClick={() => handleUpdateLink(link.id!, link.platform, link.url)}>Edit</button>
                    <button onClick={() => handleDeleteLink(link.id!)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[343px] md:w-[721px] lg:w-[808px] h-[94px] flex justify-end items-center px-10 py-6 rounded-xl bg-white">
            <button className="px-7 py-3 text-base font-semibold text-white bg-[#633CFF] opacity-25 rounded-lg">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
