import Image from "next/image";
import { getTranslations } from "next-intl/server";

const navHrefs = ["#value", "#solution", "#flow", "#product", "#contact"];

export async function Footer() {
  const t = await getTranslations("footer");
  const links = t.raw("links") as string[];

  return (
    <footer className="bg-neo-black px-6 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Left */}
          <div>
            <div className="relative w-20 h-12 mb-3">
              <Image
                src="/logo-neo.png"
                alt="NEO"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-neo-white text-xs mb-5">{t("tagline")}</p>
            <div className="flex items-center gap-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-neo-white hover:text-neo-yellow text-xs font-medium transition-colors"
              >
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                />
                Instagram
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-neo-white hover:text-neo-yellow text-xs font-medium transition-colors"
              >
                <Image
                  src="/icons/tiktok.svg"
                  alt="Tiktok"
                  width={20}
                  height={20}
                />
                Tiktok
              </a>
            </div>
          </div>

          {/* Right: nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {links.map((label, i) => (
              <a
                key={i}
                href={navHrefs[i]}
                className="text-neo-white hover:text-neo-yellow text-sm transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-6 text-center">
          <p className="text-neo-white text-xs">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
