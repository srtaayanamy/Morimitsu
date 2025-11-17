import React from "react";

interface PageTitleProps {
  title: React.ReactNode; 
  children?: React.ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl p-6 flex items-center justify-between shadow-sm">
      <h1 className="text-2xl font-semibold text-[#1E1E1E]">{title}</h1>
      {children}
    </div>
  );
};

export default PageTitle;
