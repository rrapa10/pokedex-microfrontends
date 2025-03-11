import React, { useState } from "react";
import { TextField, Box } from "@mui/material";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Box sx={{ padding: "10px", textAlign: "center" }}>
      <TextField
        variant="outlined"
        label="Name or number"
        placeholder="Ex: Bulbasaur"
        value={query}
        onChange={handleChange}
        sx={{ backgroundColor: "white", borderRadius: "8px" }}
      />
    </Box>
  );
};

export default SearchBar;
