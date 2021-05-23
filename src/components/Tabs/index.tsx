import React, { useEffect, useState } from "react";
import { Content, Spacing, TabsContainer } from "./styles";
import Tab from "./Tab";

interface PanelProps {
  name: string;
  children: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ children }) => {
  return <div>{children}</div>;
};

interface TabsProps {
  children: React.ReactNode;
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [active, setActive] = useState("");
  const [tabHeader, setTabHeader] = useState<string[]>([]);
  const [childContent, setChildConent] = useState<{
    [key: string]: React.ReactNode;
  }>({});

  useEffect(() => {
    const headers: string[] = [];
    const childCnt: { [key: string]: React.ReactNode } = {};

    React.Children.forEach(children, (element) => {
      if (!React.isValidElement(element)) return;
      const { name } = element.props;
      headers.push(name);
      childCnt[name] = element;
    });

    setActive(headers[0]);
    setTabHeader(headers);
    setChildConent({ ...childCnt });
  }, [children]);

  return (
    <TabsContainer>
      <Tab tabs={tabHeader} active={active} onChange={setActive} />
      <Spacing />
      <Content>
        {Object.entries(childContent).map(([key, value]) => {
          return key === active ? value : null;
        })}
      </Content>
    </TabsContainer>
  );
};

export default Tabs;
