import React from "react";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import CustomLayout from "@/components/common/CustomLayout";
import CustomContainer from "@/components/custom/CustomContainer";

const Kontak = () => {
  return (
    <CustomLayout blackText={true}>
      <div className="py-[20vh] sm:py-[30vh]">
        <CustomContainer className="flex justify-center items-center gap-4 flex-col sm:flex-row">
          {/* Map Section */}
          <div className="sm:w-[50%]">
            <div className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.3964969339518!2d110.43060539999999!3d-6.962466300000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70f359469b3bf5%3A0x74d4fa5119a8c4ad!2sKantor%20Kelurahan%20Tanjung%20Mas!5e0!3m2!1sen!2sid!4v1738561455839!5m2!1sen!2sid"
                className="w-full h-[450px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="bg-primary text-white sm:w-[50%] p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">
              Kantor Kelurahan Tanjungmas
            </h1>

            <div className="flex items-center gap-2 mb-2">
              <MdLocationOn className="text-xl" />
              <p>
                Jl. Ronggowarsito No.42, Tj. Mas, Semarang Utara, Kota Semarang
              </p>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <MdPhone className="text-xl" />
              <p>(024) 3560341</p>
            </div>

            <div className="flex items-center gap-2">
              <MdEmail className="text-xl" />
              <a href="mailto:tanjungmas@gmail.com" className="hover:underline">
                tanjungmas@gmail.com
              </a>
            </div>
          </div>
        </CustomContainer>
      </div>
    </CustomLayout>
  );
};

export default Kontak;
