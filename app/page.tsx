import Image from "next/image";
import { AppleOutlined } from "@ant-design/icons";

export default function Home() {
  return (
    <>
      <h1>This is the Kasun's Development Branch</h1>
      <div className="flex items-center">
        <AppleOutlined className="text-6xl" />
      </div>
    </>
  );
}
