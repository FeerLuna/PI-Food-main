import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../redux/actions";
import "../styles/SearchBar.css";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setName("");
        dispatch(getRecipeByName(name));
    }

    return (
        <form className="form__searchBar">
            <input
                type="text"
                value={name} 
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                className="form__searchBar__input"
            />
            <input
                type="submit"
                value="Search"
                onClick={(e) => handleSubmit(e)}
                className="form__searchBar__input2"
            />
        </form>
    );
}
