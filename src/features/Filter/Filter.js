import React, { useState } from 'react';
import "./Filter.css";
import { useDispatch, useSelector } from 'react-redux';
import { sortByCategory, sortByDateCentral } from '../../reducers/blogReducer';

function Filter({ getCategory }) {

    // hooks
    const dispatch = useDispatch();

    // application state
    const [category, setCategory] = useState("all");
    const [sortByDate, setSortByDate] = useState("latest");

    // application function
    const handleCategoryChange = e => {
        setCategory(e.target.value)
        getCategory(e.target.value)
        dispatch(sortByCategory(e.target.value))
    }

    const handleSortByDateChange = e => {
        setSortByDate(e.target.value)
        dispatch(sortByDateCentral(e.target.value))
    }

    return (
        <div className="filter">
            <select value={category} onChange={handleCategoryChange} className="filter__filters filter__category">
                <option value="all">All</option>
                <option value="workout">Workout</option>
                <option value="investing">Investing</option>
                <option value="business">Business</option>
                <option value="coding">Coding</option>
            </select>

            <select value={sortByDate} onChange={handleSortByDateChange} className="filter__filters filter__sortByDate">
                <option value="latest">Last Modified: Latest</option>
                <option value="oldest">Last Modified: Oldest</option>
            </select>
        </div>
    )
}

export default Filter
