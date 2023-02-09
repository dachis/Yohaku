import { ScriptProps } from "next/script";
import { useEffect, useRef, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi"
import Menu from "../Menu";

interface HeaderTemplate {}

const HeaderTemplate: React.FC<ScriptProps> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => {
    setMenuOpen(false)
  }

  useEffect(() => {
    
  })

  return (
    <>
      <Menu open={menuOpen} close={closeMenu}/>
      <div className="flex py-3 px-3 justify-between">
        <span className="text-2xl text-gray-300" style={{textShadow: "1px 1px 2px #444"}}>文章.com</span>
        <span><BiMenuAltRight className="cursor-pointer" onClick={() => setMenuOpen(true)} size={32} color={"#808080"} /></span>
      </div>
      <div>{children}</div>
    </>
  );
};

export default HeaderTemplate;
