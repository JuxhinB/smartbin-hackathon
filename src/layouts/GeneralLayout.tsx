import React from "react";
import { PageHeader, Button } from 'antd';
import { PageHeaderProps } from "antd/lib/page-header";
import { useHistory } from "react-router-dom"

interface GeneralLayoutProps {
  children: JSX.Element;
  title: string;
  subTitle: string;
}

const GeneralLayout = ({ title, subTitle, children }: GeneralLayoutProps) => {
  const history = useHistory()
  return (
    <div className={"outer-container w-full h-full"}>
      <div className={"inner-container w-full h-full flex flex-col relative"}>
        <PageHeader
          title={title}
          subTitle={subTitle}
          className="bg-white"
        >
          <div className="flex">
            <Button
              className="mr-2"
              onClick={() => {
                history.push("/")
              }
              }
            >
              Map Locations
            </Button>
            <Button
              onClick={() => {
                history.push("/bin-list")
              }
              }
            >
              Bin List
            </Button>
          </div>
        </PageHeader>
        {children}
      </div>
    </div>
  );
};

export default GeneralLayout;
