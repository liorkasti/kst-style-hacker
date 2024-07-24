import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { colorCombination, sizeMapping } from "../constants/recommendations";
import { SERVICES } from "../constants/strings";
import { ClotheSizeType, ColorType } from "../constants/types";

interface FilterClothingProps {
  selectedSize: string;
  setSelectedSize: (size: ClotheSizeType) => void;
  selectedColor: ColorType;
  setSelectedColor: (color: ColorType) => void;
  type: string;
}

const FilterClothing: FC<FilterClothingProps> = ({
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
            onChange={(e) => setSelectedSize(e.target.value as ClotheSizeType)}
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
            onChange={(e) => setSelectedColor(e.target.value as ColorType)}
            label={SERVICES.FILTER_BY_COLOR}>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {Object.keys(colorCombination)?.map((color) => (
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
