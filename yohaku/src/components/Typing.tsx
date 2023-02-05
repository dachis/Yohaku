import React, { useEffect, useRef, useState } from "react";

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
      timerId = setTimeout(showChar, speed);
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
    if (el.clientHeight < el.scrollHeight) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  });

  return (
    <div
      className={className}
      style={{ whiteSpace: "pre-line" }}
      ref={msgEl}
    >
      {text}
    </div>
  );
};

export default Typing;
