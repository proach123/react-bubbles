import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { authios } from "../utils/authios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }, props) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const {id} = useParams();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    authios()
    .put(`/api/colors/${id}`, colorToEdit)
    .then(res => {

      let newArray =colors.filter((elm)=>{
        return elm.id !== colorToEdit.id
      })

      updateColors([...newArray, res.data])
      console.log(colors)
    })
    .catch(err => console.log(err));
};

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

  const deleteColor = color => {
    console.log(color)
    authios().delete(`/api/colors/${color.id}`).then(
      res=>{
        let newArray = colors.filter((elm)=>{
          return elm.id !== color.id
        })
        console.log(newArray)
        updateColors([...newArray])
      }
      
    ).catch(err => console.log(err))
    // make a delete request to delete this color
  };


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
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
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
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
