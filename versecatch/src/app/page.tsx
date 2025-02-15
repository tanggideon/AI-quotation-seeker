import Image from "next/image";
import BottomSheet from "./components/bottomSheet";
import Transcription from "./components/transcription";

export default function Home() {
  return (
    <div className="w-full h-screen items-center justify-center flex">
      <div className="w-[1440px] h-[800px] flex flex-col items-center justify-between">
      <h1 className="font-semibold text-[20px]">VerseCatch</h1>
        <Transcription />
        <BottomSheet />
        
      </div>
    </div>
  );
}
