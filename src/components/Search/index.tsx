import React from "react";
import { ContainerSearch, SearchField } from "./styles";

interface SearchProps {
  onChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ onChange }) => {
  return (
    <ContainerSearch>
      <SearchField
        type="search"
        placeholder="Search"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </ContainerSearch>
  );
};

export default Search;
