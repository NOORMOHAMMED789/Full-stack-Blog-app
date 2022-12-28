import React from "react";
import "./Create.css";

const Create = () => {
  return (
    <div>
      <form className="container3">
        <input type="text" className="title" required />
        <input type="file" name="file" id="" />
        <label htmlFor="">Upload image</label>
        <textarea
          className="textarea"
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Description here..."
        ></textarea>
        <button className="savepost">save post</button>
      </form>
    </div>
  );
};

export default Create;
