"use client";
import { useAppContext } from "@/context/AppContext";
import AddLinkForm from "./AddLinkForm";
import EmptyState from "./EmptyState";

export default function LinksEditor() {
  const { links, setLinks, saveData, loading, user } = useAppContext();

  const handleAddLink = () => {
    setLinks((prev) => [
      ...prev,
      { platform: "github", url: "", userId: user?.uid || "" },
    ]);
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
    if (index === links.length - 1) return;
    setLinks((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  };

  return (
    <div className="w-[343px] md:w-[721px] lg:w-[808px] min-h-[739px] p-8 md:p-10 rounded-[24px] bg-white flex flex-col justify-between">
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

        <div className="max-h-[480px] overflow-y-auto no-scrollbar flex flex-col gap-4">
          {links.length === 0 ? (
            <EmptyState />
          ) : (
            links.map((link, index) => (
              <AddLinkForm
                key={link.id || index}
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
                onMoveUp={index > 0 ? () => handleMoveUp(index) : undefined}
                onMoveDown={index < links.length - 1 ? () => handleMoveDown(index) : undefined}
              />
            ))
          )}
        </div>
      </div>

      <div>
        <hr className="border-[#D9D9D9] my-6" />
        <div className="flex justify-end">
          <button
            onClick={() => saveData()}
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
    </div>
  );
}