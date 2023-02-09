import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "./templates/BaasicTemplate";

interface TypingProps {
  message: string;
  typeEnd: () => void;
  cursor?: boolean;
  className: string;
  speed: number;
}

const Typing = ({
  message,
  typeEnd,
  cursor = true,
  className = "",
  speed = 50,
}: TypingProps) => {
  const [text, setText] = useState("");
  const [scroll, setScroll] = useState(false);
  const [width, height]  = useWindowSize();
  const msgEl = useRef<HTMLDivElement>(null);

  // 指定された間隔でstateを更新する
  useEffect(() => {
    // マウント時の処理
    const charItr = message[Symbol.iterator]();
    let timerId: NodeJS.Timeout;

    (function showChar() {
      const nextChar = charItr.next();
      if (nextChar.done) {
        typeEnd();
        return;
      }
      setText((current) => current + nextChar.value);
      const comma = /[。!?！？]/u
      const period = /[、]/u
      const fixedSpeed = comma.test(nextChar.value) ? speed*10 : period.test(nextChar.value) ? speed*7 : speed
      timerId = setTimeout(showChar, fixedSpeed);
    })();

    // アンマウント時に念のためタイマー解除
    return () => {
      setText("")
      clearTimeout(timerId)
    };
  }, [message]);

  // レンダリングのたびに表示エリアをスクロールする
  useEffect(() => {
    const el = msgEl.current;
    if (!el) return
    if (!el.clientHeight || !height) return
    if (el.clientHeight >= (height - FOOTER_HEIGHT - HEADER_HEIGHT)) {
      setScroll(true)
    }
    if (el.clientHeight < el.scrollHeight) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  });

  const getScroll = (s: boolean) => {
    switch(s){
      case true:
        return "overflow-scroll";
      default:
        return "";
    }
  }

  return (
    <div
      className={className + " " + getScroll(scroll)}
      style={{ whiteSpace: "pre-line" }}
      ref={msgEl}
    >
      {text}
    </div>
  );
};

export default Typing;
