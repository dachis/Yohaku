import { ScriptProps } from "next/script";
import React from "react";

interface FooterTemplate {}

const FooterTemplate: React.FC<ScriptProps> = ({ children }) => {
  return (
    <>
      <div>{children}</div>
      <div className="pt-3 pr-3 text-center text-gray-500">© 2023 Tatsuya Sasaki</div>
    </>
  );
};

export default FooterTemplate;
