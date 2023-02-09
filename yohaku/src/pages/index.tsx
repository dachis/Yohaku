import type { NextPage } from "next";
import { useCallback, useEffect, useRef } from "react";
import BasicTemplate from "../components/templates/BaasicTemplate";
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
      何かを思い出したようにそう呟くと、そいつはカバンを開けて中を探る。
      「ほれ、お土産」
      そして取り出したるは魚の干物。それを吾輩の前に置くと、またわしわしと撫でてきた。
      「今日の晩御飯にでも食べなさい」
      そう言って扉を開けると、外へと出ていった。……さて、
      「いただくか！」
      『ニャー！』
      目の前に置かれた魚を食べようと手を伸ばすが、ふと思うところがあって手を止めた。……あいつにはいつも世話になっているしなぁ……。よし！
      「お前も食うか？」
      少しだけ分け与えてやることにする。すると、
      『
      「ニャー！」
      』…………ん？なんか聞こえなかったか？空耳かな？まあいいか。
      魚を分け与えると、早速食べることにした。やはり魚はいい。うまい！ ◆◆◆
      それから数日後のこと。
      『ニャオォ～ン♪』
      今日もまた日課のパトロールをしていた時のことだ。公園を通りかかったところで見知った顔を見つけた。
      「あ、猫ちゃん！」
      向こうもこちらに気付いたようで、嬉しそうな声を上げて駆け寄ってきた。
      「こんにちは～♪」
      『ニャー♪』`);
    }
  }, [inputLock])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false)
  }, [])

  return (
    <BasicTemplate>
      <div className="h-full px-20 flex flex-col justify-center items-center">
        {params.message.length === 0 && (<span className="text-gray-400">press any key...</span>)}
        <Typing
          className="w-[50%] max-h-full overflow-x-visible" 
          speed={40}
          {...params}
        />
      </div>
    </BasicTemplate>
  );
};

export default Home;
