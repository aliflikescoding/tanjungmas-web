import React from "react";
import Image from "next/image";
import Link from "next/link";
import CustomContainer from "../custom/CustomContainer";
import FooterImageCommon from "../commonComponents/FooterImageCommon";


export default function Footer() {

  return (
    <div className="py-14 md:py-20 bg-red-500 text-white">
      <CustomContainer>
        <div className="flex flex-wrap justify-between gap-8">
          <div className="mr-[40px]">
            <Image
              src="/icon-semarang.png"
              alt="semarang logo"
              width="0"
              height="0"
              sizes="100vw"
              className="w-auto h-[63px]"
            />
            <p className="text-md mt-2 capitalize">
              Kelurahan tanjungmas semarang
            </p>
          </div>
          <div className="flex flex-col w-[210px]">
            <h3 className="text-2xl font-bold mb-2">Berita</h3>
            <Link className="hover:underline my-2 capitalize" href="#">
              Bidang Pembangunan
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Bidang Sosial
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Bidang Pemerintahan
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Bidang Trantib
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Sekertariat
            </Link>
          </div>
          <div className="flex flex-col w-[210px]">
            <h3 className="text-2xl font-bold mb-2">Layanan</h3>
            <Link className="hover:underline my-2 capitalize" href="#">
              Pembuatan KK
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Pembuatan KTP
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Pengantar Syarat Nikah
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Permohonan Akte Kelahiran
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Permohonan Akte Kematian
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Pengaduan Masyarakat
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Alur sistem pelayanan
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              CEK PBB
            </Link>
          </div>
          <div className="flex flex-col w-[210px]">
            <h3 className="text-2xl font-bold mb-2">Kembangan</h3>
            <Link className="hover:underline my-2 capitalize" href="#">
              LPMK
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              UMKM
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              UMKM
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              BKM
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              PKK
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Karang Taruna
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              FKK
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              KSM
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              KWT TUNAS BAHAGIA
            </Link>
          </div>
          <div className="flex flex-col w-[210px]">
            <h3 className="text-2xl font-bold mb-2">Pemberdayaan</h3>
            <Link className="hover:underline my-2 capitalize" href="#">
              Bidang Kesehatan
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Bidang Pariwisata
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Bidang Pendidikan
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Kamtimbas
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Bidang Ekonomi
            </Link>
            <Link className="hover:underline my-2 capitalize" href="#">
              Pemberdayaan perempuan
            </Link>
          </div>
        </div>
        <div className="py-8 flex md:flex-row flex-col-reverse md:justify-between md:items-center">
          <p>© Copyright Diskominfo 2025</p>
          <FooterImageCommon />
        </div>
      </CustomContainer>
    </div>
  );
}
