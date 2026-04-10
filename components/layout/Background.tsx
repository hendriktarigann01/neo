import Image from "next/image";

interface BackgroundProps {
  position?: string;
  opacity?: string;
  rotate?: string;
}

export function Background({
  position = "top-1/2 left-0",
  opacity = "opacity-10",
  rotate,
}: BackgroundProps) {
  return (
    <div className={`absolute z-0 pointer-events-none ${position}`}>
      <Image
        src="/pattern-neo.webp"
        alt="pattern"
        priority
        width={2200}
        height={400}
        className={`${opacity} ${rotate ?? ""}`}
      />
    </div>
  );
}
