import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-14 h-9">
          <Image
            src="/logo-neo.png"
            alt="NEO"
            fill
            className="object-contain"
          />
        </div>
        <p className="text-white/30 text-sm text-center">
          © {new Date().getFullYear()} NEO Display. All rights reserved.
        </p>
        <p className="text-neo-yellow/50 text-xs font-medium tracking-widest uppercase">
          Smart Economy Display
        </p>
      </div>
    </footer>
  );
}
