import { ScriptProps } from "next/script";
import React from "react";

interface HeaderTemplate {}

const HeaderTemplate: React.FC<ScriptProps> = ({ children }) => {
  return (
    <>
      <div className="py-3 pr-3 text-right">MENU</div>
      <div>{children}</div>
    </>
  );
};

export default HeaderTemplate;
