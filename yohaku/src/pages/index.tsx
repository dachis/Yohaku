import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import HeaderTemplate from "../components/HeaderTemplate";
import Typing from "../components/Typing";
import useTyping from "../hooks/typingStore";

const Home: NextPage = () => {
  const {
    typeStart,
    inputLock,
    ...params
  } = useTyping();
  const lockRef = useRef(false);
  lockRef.current = inputLock

  const handleKeyDown = useCallback((event: globalThis.KeyboardEvent) => {
    if (lockRef.current) return
    if (event.code === "Escape") {
      typeStart("")
    } else {
      typeStart(`吾輩は猫である。名前はまだない。
      そんな吾輩は今、ある人物の膝の上で丸くなって寝ている最中だ。その人物は今から仕事場に向かうらしく、玄関先で靴を履いている。
      「それじゃあ行ってきます」
      『ニャー』
      気を付けて行ってこいよーと鳴いてやると、
      「はいはい。行ってらっしゃいねー」
      頭を撫でられた。うむ、悪くはないな。
      「……あ、そうだ。忘れるところだった」
      何かを思い出したようにそう呟くと、そいつはカバンを開けて中を探る。`);
    }
  }, [inputLock])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false)
  }, [])

  return (
    <HeaderTemplate>
      <div className="h-screen px-20 flex flex-col justify-center items-center">
        {params.message.length === 0 && (<span className="text-gray-400">press any key...</span>)}
        <Typing
          className="w-[50%]"
          speed={80}
          {...params}
        />
      </div>
      <div className="h-screen bg-gray-800"></div>
      <div className="h-screen"></div>
    </HeaderTemplate>
  );
};

export default Home;
