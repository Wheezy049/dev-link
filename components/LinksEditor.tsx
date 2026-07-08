"use client";
import React from "react";
import AddLinkForm from "./AddLinkForm";
import EmptyState from "./EmptyState";
import { Link as LinkType } from "@/lib/firebase/db";
import { useAppContext } from "@/context/AppContext";

export default function LinksEditor() {
  const { links, setLinks, saveData, loading } = useAppContext();

  const handleAddLink = () => {
    setLinks((prev) => [...prev, { platform: "github", url: "", userId: "" }]);
  };

  const handleLinkChange = (index: number, updatedLink: LinkType) => {
    setLinks((prev) => prev.map((link, idx) => (idx === index ? updatedLink : link)));
  };

  const handleRemoveLink = (index: number) => {
    setLinks((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setLinks((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    setLinks((prev) => {
      if (index === prev.length - 1) return prev;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-[343px] md:w-[721px] lg:w-[808px] min-h-[739px] border border-[#D9D9D9] p-8 md:p-10 rounded-xl bg-white flex flex-col justify-between">
        <div>
          <h1 className="text-[#333333] text-2xl md:text-3xl font-bold mb-2">
            Customize your links
          </h1>
          <p className="text-base text-[#737373] mb-10">
            Add/edit/remove links below and then share all your profiles with the world!
          </p>
          <div>
            <button
              onClick={handleAddLink}
              className="bg-white h-11 w-full text-base font-semibold text-[#633CFF] border border-[#633CFF] hover:bg-[#EFEBFF] transition-colors rounded-lg flex justify-center items-center mb-6"
            >
              + Add new link
            </button>
          </div>

          <div className="max-h-[480px] overflow-y-auto pr-2 flex flex-col gap-4">
            {links.length === 0 ? (
              <EmptyState />
            ) : (
              links.map((link, index) => (
                <div key={link.id || index} className="relative group">
                  <AddLinkForm
                    index={index}
                    link={link}
                    onChange={(updatedLink) => handleLinkChange(index, updatedLink)}
                    onRemove={() => handleRemoveLink(index)}
                  />
                  {/* Reordering Controls overlay */}
                  <div className="absolute top-4 right-20 flex gap-2">
                    <button
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className={`p-1 px-2 text-xs border rounded bg-white hover:bg-[#EFEBFF] ${
                        index === 0 ? "opacity-35 cursor-not-allowed" : "text-[#633CFF]"
                      }`}
                      title="Move Up"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleMoveDown(index)}
                      disabled={index === links.length - 1}
                      className={`p-1 px-2 text-xs border rounded bg-white hover:bg-[#EFEBFF] ${
                        index === links.length - 1 ? "opacity-35 cursor-not-allowed" : "text-[#633CFF]"
                      }`}
                      title="Move Down"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="w-[343px] md:w-[721px] lg:w-[808px] h-[94px] flex justify-end items-center px-10 py-6 border border-[#D9D9D9] rounded-xl bg-white">
        <button
          onClick={saveData}
          disabled={loading || links.length === 0}
          className={`px-7 py-3 text-base font-semibold text-white bg-[#633CFF] rounded-lg transition-colors ${
            loading || links.length === 0
              ? "opacity-25 cursor-not-allowed"
              : "hover:bg-[#BEADFF] hover:shadow-lg"
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}