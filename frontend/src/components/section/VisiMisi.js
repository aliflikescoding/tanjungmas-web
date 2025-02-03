"use client";

import { useState, useEffect } from "react";
import CustomContainer from "../custom/CustomContainer";
import { getMisi, getVisi } from "@/app/api/public";
import Image from "next/image";

const VisiMisi = () => {
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState([]);

  useEffect(() => {
    const fetchVisiMisi = async () => {
      try {
        const visiData = await getVisi();
        const misiData = await getMisi();
        setVisi(visiData);
        setMisi(misiData);
      } catch (error) {
        console.error("Failed to fetch visi and misi:", error);
      }
    };

    fetchVisiMisi();
  }, []);

  return (
    <div className="mb-[5vh] sm:mb-[15vh]">
      <CustomContainer>
        <div className="flex md:flex-row flex-col justify-between items-center">
          <div>
            <div className="mb-4">
              <h2 className="title2 mb-3">Visi</h2>
              <p className="font-bold text-xl sm:text-lg">"{visi}"</p>
            </div>
            <div>
              <h2 className="title2 mb-3">Misi</h2>
              <ul className="list-disc pl-5">
                {misi.length > 0 ? (
                  misi.map((item) => (
                    <li key={item.id} className="mb-2">
                      {item.title}
                    </li>
                  ))
                ) : (
                  <li className="mb-2">No misi available</li>
                )}
              </ul>
            </div>
          </div>
          <div className="md:min-w-[50%] md:pl-11">
            <Image
              src={`/terratory.svg`}
              width={0}
              height={0}
              sizes="100vw"
              className="h-auto w-full"
              alt="terratory svg"
            />
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default VisiMisi;
