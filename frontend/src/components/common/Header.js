import React from "react";
import CustomContainer from "../custom/CustomContainer.js";
import Image from "next/image";
import Link from "next/link";
import StickyWrapper from "../custom/StickyComponent.js";
import HeaderImages from "../commonComponents/HeaderImages.js";
import MobileNavLinks from "../commonComponents/MobileNavLinks.js";

export default function Header({ blackText = false }) {
  const textColor = blackText ? "text-black" : "text-white";

  return (
    <StickyWrapper>
      <div className="py-3">
        <CustomContainer className="flex justify-between items-center">
          <div className="block">
            <Link href="/">
              <Image
                src="/icon-semarang.png"
                alt="semarang logo"
                width="0"
                height="0"
                sizes="100vw"
                className="w-auto h-[53px] md:h-[63px]"
              />
            </Link>
          </div>
          <HeaderImages />
          <nav>
            <ul className="hidden md:flex gap-5">
              {[
                { href: "/", label: "Beranda" },
                { href: "/tentang", label: "Tentang" },
                { href: "/layanan", label: "Layanan" },
                { href: "/info", label: "Info" },
                { href: "/berita", label: "Berita" },
                { href: "/kontak", label: "Kontak" },
              ].map((item) => (
                <li key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className={`${textColor} transition ease-in-out duration-[5ms] group-hover:text-primary`}
                  >
                    {item.label}
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </li>
              ))}
            </ul>
            <MobileNavLinks blackTextHamburger={blackText} />
          </nav>
        </CustomContainer>
      </div>
    </StickyWrapper>
  );
}
