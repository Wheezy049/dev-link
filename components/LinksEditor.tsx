import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import AddLinkForm from "./AddLinkForm";
import EmptyState from "./EmptyState";

export default function LinksEditor() {
  const { links, setLinks, saveData, saving, user } = useAppContext();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [draggableIndex, setDraggableIndex] = useState<number | null>(null);

  const handleAddLink = () => {
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setLinks((prev) => [
      { id: tempId, platform: "github", url: "", userId: user?.uid || "" },
      ...prev,
    ]);
  };

  const handleRemoveLink = (index: number) => {
    setLinks((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    setLinks((prev) => {
      const copy = [...prev];
      const item = copy[fromIndex];
      copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  };

  return (
    <div className="w-[343px] md:w-[721px] lg:w-[808px] min-h-[739px] p-8 md:p-10 rounded-[24px] bg-white flex flex-col">
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-[#333333] text-2xl md:text-3xl font-bold mb-2">
              Customize your links
            </h1>
            <p className="text-base text-[#737373]">
              Add/edit/remove links below and then share all your profiles with the world!
            </p>
          </div>
          <button
            onClick={() => saveData(undefined, undefined, links)}
            disabled={saving}
            className={`w-full md:w-auto px-7 py-3 text-base font-semibold text-white bg-[#633CFF] rounded-lg transition-colors shrink-0 ${
              saving
                ? "opacity-25 cursor-not-allowed"
                : "hover:bg-[#5733E5] hover:shadow-lg"
            }`}
          >
            {saving ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Saving...</span>
              </div>
            ) : (
              "Save"
            )}
          </button>
        </div>
        <div>
          <button
            onClick={handleAddLink}
            className="bg-white h-11 w-full text-base font-semibold text-[#633CFF] border border-[#633CFF] hover:bg-[#EFEBFF] transition-colors rounded-lg flex justify-center items-center mb-6"
          >
            + Add new link
          </button>
        </div>
        <div className="max-h-[500px] overflow-y-auto no-scrollbar flex flex-col gap-4">
          {links.length === 0 ? (
            <EmptyState />
          ) : (
            links.map((link, index) => (
              <div
                key={link.id || index}
                draggable={draggableIndex === index}
                onDragStart={(e) => {
                  setDraggedIndex(index);
                  e.dataTransfer.effectAllowed = "move";
                }}
                onDragEnd={() => {
                  setDraggedIndex(null);
                  setDraggableIndex(null);
                }}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => {
                  if (draggedIndex !== null && draggedIndex !== index) {
                    handleReorder(draggedIndex, index);
                    setDraggedIndex(index);
                  }
                }}
                className={`transition-all duration-200 ${
                  draggedIndex === index
                    ? "opacity-40 scale-[0.98] border-2 border-dashed border-[#633CFF] rounded-xl"
                    : ""
                }`}
              >
                <AddLinkForm
                  index={index}
                  link={link}
                  onChange={(updated) => {
                    setLinks((prev) => {
                      const copy = [...prev];
                      copy[index] = updated;
                      return copy;
                    });
                  }}
                  onRemove={() => handleRemoveLink(index)}
                  onGripMouseDown={() => setDraggableIndex(index)}
                  onGripMouseUp={() => setDraggableIndex(null)}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}