import React from "react";
import { PageHeader } from 'antd';

interface GeneralLayoutProps {
  children: JSX.Element;
  title: string;
  subTitle: string;
}

const GeneralLayout = ({ title, subTitle, children }: GeneralLayoutProps) => {
  return (
    <div className={"outer-container w-full h-full"}>
      <div className={"inner-container w-full h-full flex flex-col relative"}>
        <PageHeader
          title={title}
          subTitle={subTitle}
        />
        {children}
      </div>
    </div>
  );
};

export default GeneralLayout;
