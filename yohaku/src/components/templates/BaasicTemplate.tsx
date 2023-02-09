import { ScriptProps } from "next/script";
import React from "react";
import HeaderTemplate from "../templates/HeaderTemplate";
import FooterTemplate from "./FooterTemplate";

export const HEADER_HEIGHT = 48
export const FOOTER_HEIGHT = 36

const BasicTemplate: React.FC<ScriptProps> = ({ children }) => {
  const getClassName = () => {
    return ""
  }
  return (
    <>
      <div className="h-screen">
        <HeaderTemplate>
          <FooterTemplate>
            <div style={{height: `calc(100vh - ${HEADER_HEIGHT+FOOTER_HEIGHT}px)`}}>{children}</div>
          </FooterTemplate>
        </HeaderTemplate>
      </div>
    </>
  );
};

export default BasicTemplate;
