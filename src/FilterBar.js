import React from 'react'
import './FilterBar.css'

export class FilterBar extends React.Component {
    render() {
        return (
            <div className="filter-div">
                <div className="custom-select">
                <select>
                    <option value="0">Default sorting:</option>
                    <option value="1">Audi</option>
                    <option value="2">BMW</option>
                    <option value="3">Citroen</option>
                    <option value="4">Ford</option>
                    <option value="5">Honda</option>
                    <option value="6">Jaguar</option>
                </select>
                </div>
                <div className="custom-select">
                <select>
                    <option value="0">Show 12:</option>
                    <option value="1">Audi</option>
                    <option value="2">BMW</option>
                    <option value="3">Citroen</option>
                    <option value="4">Ford</option>
                    <option value="5">Honda</option>
                    <option value="6">Jaguar</option>
                    <option value="7">Land Rover</option>
                    <option value="8">Mercedes</option>
                    <option value="9">Mini</option>
                    <option value="10">Nissan</option>
                    <option value="11">Toyota</option>
                    <option value="12">Volvo</option>
                </select>
                </div>
                <div className="search-bar">

                </div>
            </div>
        )
    }
}