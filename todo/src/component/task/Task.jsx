import React, { useState, useRef } from "react";
import "./Task.css";
import { Link } from "react-router-dom";
function Task() {
  const [fruits, setFruits] = useState([]);
  const [isUpdate, setIsupdate] = useState("");
  const inputRef = useRef();
  const handleClick = () => {
    if (!inputRef.current.value) return;

    if (isUpdate) {
      // console.log(isUpdate, "this is isupdate  ");
      const filterArr = fruits.map((ele) => {
        if (ele == isUpdate) {
          const value = inputRef.current.value;
          // console.log(value, "tis vallye");
          return value;
        }
        return ele;
      });
      // console.log(filterArr, "this is filter aar");
      setFruits(filterArr);
      setIsupdate("");
      inputRef.current.value = "";
      return;
    }

    setFruits([...fruits, inputRef.current.value]);
    inputRef.current.value = "";

  };

  const handleDelete = (index) => {
    fruits.splice(index, 1);
    setFruits([...fruits]);
  };
  const handleUpdate = (ele) => {
    inputRef.current.value = ele;
    setIsupdate(ele);
  };

  console.log(fruits);
  return (
    <div className="taskContainer">
    <Link to={'/'}>go to home</Link>
      <div>
        <input type="text" placeholder="Enter Fruits name" ref={inputRef} />
        <button onClick={handleClick}>Submit</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {fruits.map((ele, index) => {
            return (
              <tr key={index}>
                <td>{ele}</td>
                <td onClick={() => handleDelete(index)}>delete</td>
                <td onClick={() => handleUpdate(ele)}>Update</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Task;
