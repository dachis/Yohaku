import type { NextPage } from "next";
import { KeyboardEvent, useEffect } from "react";
import HeaderTemplate from "../components/HeaderTemplate";

const Home: NextPage = () => {
  const handleKeyDown = (event: globalThis.KeyboardEvent) => {
    console.log("key Pressed: " + event.key)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false)
  }, [])

  return (
    <HeaderTemplate>
      <div className="h-96 px-20 flex justify-center items-center">
        <span className="text-3xl font-bold first-letter:text-6xl first-letter:mr-3 pl-32 indent-[-4.5rem]">
          バスの運転手が「あなたを乗せてバスは走る」とつぶやき、バスを走らせる。「おーい、バスはどこー?」と問いかけると、バスは「おーい」と返事をする。
        </span>
      </div>
      <div className="h-96 bg-gray-800"></div>
      <div className="h-96"></div>
    </HeaderTemplate>
  );
};

export default Home;
