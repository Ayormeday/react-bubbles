import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from "../helpers/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};
const colorsURL = "http://localhost:5000/api/colors";

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    if (colorToEdit.id > 0) {
      
    axiosWithAuth()
    .put(`${colorsURL}/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log("Edited color on Server", res);
      updateColors(
        colors.map(color => {
          if (color.id === colorToEdit.id) {
            return colorToEdit;
          } else {
            return color;
          }
        })
      );
      setColorToEdit(initialColor);
      setEditing(false);
    })
    .catch(err => console.log(err.response));
    } else {
      axiosWithAuth()
      .post(`${colorsURL}`, colorToEdit)
      .then(res => {
        updateColors(res.data);
        setColorToEdit(initialColor);
        setEditing(false);
      })
      .catch(err => console.log(err.response));
    }
    
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    updateColors(colors.filter(item => item.id !== color.id));
    axiosWithAuth()
      .delete(`${colorsURL}${color.id}`)
      .then(res => {
        console.log("Deleted a color on server", res);
      })
      .catch(err => console.log("error in deleting: ", err.response));
  };

  const newColor = () => {
    setEditing(true);
		setColorToEdit(initialColor);
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      
      <div className="button-row">
        <button onClick={newColor}>Add Color</button>
      </div>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>{colorToEdit.id > 0 ? 'edit' : 'new'} color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};
export default ColorList;
