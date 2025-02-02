"use client";

import React, { useState, useEffect } from "react";
import { Button, Drawer, Space } from "antd";
import { getNavbarImages } from "@/app/api/public";
import Link from "next/link";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";

const MobileNavLinks = () => {
  const [open, setOpen] = useState(false);
  const [headerImages, setHeaderImages] = useState([]);

  useEffect(() => {
    const fetchNavbarImages = async () => {
      try {
        const response = await getNavbarImages();
        setHeaderImages(response);
      } catch (err) {
        console.error("Failed to fetch navbar images:", err);
      }
    };

    fetchNavbarImages();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="block md:hidden">
      <div className="text-2xl font-thin text-white" onClick={showDrawer}>
        <GiHamburgerMenu />
      </div>
      <Drawer
        placement="top"
        onClose={onClose}
        open={open}
        className="relative"
        height={525}
        extra={
          <div>
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
          </div>
        }
      >
        <div className="py-5 flex flex-col justify-center items-center text-2xl gap-3">
          <Link className="py-1 font-medium" href="/">
            Beranda
          </Link>
          <Link className="py-1 font-medium" href="/tentang">
            Tentang
          </Link>
          <Link className="py-1 font-medium" href="/layanan">
            Layanan
          </Link>
          <Link className="py-1 font-medium" href="/info">
            Info
          </Link>
          <Link className="py-1 font-medium" href="/berita">
            Berita
          </Link>
          <Link className="py-1 font-medium" href="/kontak">
            Kontak
          </Link>
        </div>
        <div className="flex gap-2 pt-5 justify-center">
          {headerImages.map((image) => (
            <Image
              key={image.id}
              src={`${image.image}`}
              alt="navbar image"
              width="0"
              height="0"
              sizes="100vw"
              className="w-auto max-h-[25px]"
            />
          ))}
        </div>
        <div className="absolute bottom-0 right-0 opacity-20">
          <Image
            src="/terratory.svg"
            alt="terratory svg"
            width="0"
            height="0"
            sizes="100vw"
            className="w-auto h-auto "
          />
        </div>
      </Drawer>
    </div>
  );
};
export default MobileNavLinks;
