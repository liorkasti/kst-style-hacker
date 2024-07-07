import React from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { SERVICES } from "../constants/strings";
import { colorCombination, sizeMapping } from "../constants/recommendations";

interface FilterClothingProps {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  type: string;
}

const FilterClothing: React.FC<FilterClothingProps> = ({
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  type,
}) => {
  return (
    <Grid container spacing={2} mb={4} justifyContent='center'>
      <Grid item xs={12} sm={4}>
        <FormControl variant='outlined' fullWidth>
          <InputLabel>{SERVICES.FILTER_BY_SIZE}</InputLabel>
          <Select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value as string)}
            label={SERVICES.FILTER_BY_SIZE}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {Object.keys(sizeMapping[type]).map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl variant='outlined' fullWidth>
          <InputLabel>{SERVICES.FILTER_BY_COLOR}</InputLabel>
          <Select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value as string)}
            label={SERVICES.FILTER_BY_COLOR}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {Object.keys(colorCombination).map((color) => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default FilterClothing;
