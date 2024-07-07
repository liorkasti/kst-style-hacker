import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { deleteOutfit } from "../store/slices/outfits-slice";

const SavedOutfits: React.FC = () => {
  const savedOutfits = useSelector(
    (state: RootState) => state.outfits.savedOutfits
  );
  const dispatch = useDispatch();

  const handleDelete = (index: number) => {
    dispatch(deleteOutfit(index));
  };

  return (
    <div>
      <h1>Saved Outfits</h1>
      <ul>
        {savedOutfits.map((outfit, index) => (
          <li key={index}>
            <p>
              {outfit.shirt.brand} - {outfit.pants.brand} - {outfit.shoes.brand}
            </p>
            <p>
              {outfit.creationDate} - {outfit.creationTime}
            </p>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedOutfits;
