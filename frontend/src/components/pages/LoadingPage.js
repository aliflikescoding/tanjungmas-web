import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Image from "next/image";

const LoadingPage = () => {
  return (
    <div
      style={{ backgroundImage: "url(/hero-image.jpg)" }}
      className="flex justify-center items-center bg-cover bg-center h-[110vh]"
    >
      <div className="bg-white rounded-md px-20 py-12 flex flex-col gap-4 items-center">
        <div className="w-14 h-14 sm:w-20 sm:h-20 mb-3 relative">
          <Image
            src="/icon-semarang.png"
            alt="Tanjungmas Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex items-center gap-5">
          <Spin
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 76,
                }}
                spin
              />
            }
          />
          <p className="text-4xl font-medium">Loading</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
