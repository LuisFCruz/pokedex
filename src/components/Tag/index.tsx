import React from "react";
import { TagContent } from "./styles";
import iconTypePokemon from "../../assets/types";

export { TagGroup } from "./styles";

interface Props {
  icon: string;
  color: string;
  children?: React.ReactNode;
}

const Tag: React.FC<Props> = ({ icon, children, color }) => {
  const iconName = icon as keyof typeof iconTypePokemon;
  return (
    <TagContent color={color}>
      { iconTypePokemon[iconName]}
      {children && <span>{children}</span>}
    </TagContent>
  );
};

export default Tag;
