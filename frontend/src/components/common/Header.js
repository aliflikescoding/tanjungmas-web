import React from "react";
import CustomContainer from "../custom/CustomContainer.js";
import Image from "next/image";
import Link from "next/link";
import StickyWrapper from "../custom/StickyComponent.js";
import HeaderImages from "../commonComponents/HeaderImages.js";
import MobileNavLinks from "../commonComponents/MobileNavLinks.js";

export default async function Header() {

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
              <li className="group relative">
                <Link
                  href="/"
                  className="text-white transition ease-in-out duration-[5ms] group-hover:text-primary"
                >
                  Beranda
                </Link>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="group relative">
                <Link
                  href="/tentang"
                  className="text-white transition ease-in-out duration-[5ms] group-hover:text-primary"
                >
                  Tentang
                </Link>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="group relative">
                <Link
                  href="/layanan"
                  className="text-white transition ease-in-out duration-[5ms] group-hover:text-primary"
                >
                  Layanan
                </Link>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="group relative">
                <Link
                  href="/info"
                  className="text-white transition ease-in-out duration-[5ms] group-hover:text-primary"
                >
                  Info
                </Link>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="group relative">
                <Link
                  href="/berita"
                  className="text-white transition ease-in-out duration-[5ms] group-hover:text-primary"
                >
                  Berita
                </Link>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </li>
              <li className="group relative">
                <Link
                  href="/kontak"
                  className="text-white transition ease-in-out duration-[5ms] group-hover:text-primary"
                >
                  Kontak
                </Link>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
              </li>
            </ul>
            <MobileNavLinks />
          </nav>
        </CustomContainer>
      </div>
    </StickyWrapper>
  );
}
