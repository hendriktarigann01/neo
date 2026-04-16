import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Dropdown({
  groups,
  activeGroupId,
  handleGroupClick,
}: {
  groups: Array<{ id: string; label: string }>;
  activeGroupId: string;
  handleGroupClick: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeLabel =
    groups.find((g) => g.id === activeGroupId)?.label || "Select";

  return (
    <div ref={ref} className="md:hidden w-full max-w-64 mx-auto relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bg-neo-yellow text-[#4B5563] w-full py-4 px-5 rounded-full flex items-center justify-between font-medium"
      >
        <span>{activeLabel}</span>
        <ChevronDown
          className={`h-5 w-5 ml-2 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 mt-2 w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-2 z-50">
          {groups.map((group) => {
            const isActive = activeGroupId === group.id;

            return (
              <button
                key={group.id}
                onClick={() => {
                  handleGroupClick(group.id);
                  setOpen(false);
                }}
                className={`text-left py-3 px-4 rounded-lg transition-all ${
                  isActive
                    ? "bg-neo-yellow/20 text-[#4B5563]"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {group.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
