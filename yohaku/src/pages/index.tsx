import type { NextPage } from "next";
import { useCallback, useEffect, useRef } from "react";
import PostForm from "../components/PostForm";
import BasicTemplate from "../components/templates/BaasicTemplate";
import Typing from "../components/Typing";
import useTyping from "../hooks/typingStore";

interface HomeProps {
  posts: any
}

const Home: NextPage<HomeProps> = ({posts}: HomeProps) => {
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
      if (posts.status === 200) {
        typeStart(posts.data[0].content);
      }
    }
  }, [inputLock])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, false)
  }, [])

  return (
    <BasicTemplate>
      <PostForm className="absolute left-10 bottom-10"/>
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

export async function getServerSideProps() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let posts = await res.json();

  return {
    props: { posts },
  };
}

export default Home;
