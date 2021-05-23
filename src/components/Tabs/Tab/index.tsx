import React from "react";
import { Item, TabContainer } from "./styles";

interface TabProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

const Tab: React.FC<TabProps> = ({ tabs, onChange, active }) => {
  return (
    <TabContainer>
      {tabs.map((item) => (
        <Item
          onClick={() => onChange(item)}
          key={item}
          active={item === active}
        >
          {item}
        </Item>
      ))}
    </TabContainer>
  );
};

export default Tab;
