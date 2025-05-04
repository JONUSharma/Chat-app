import React from 'react'
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
const Theme = () => {
    return (
        <div>
            <label className="swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" className="theme-controller" value="light" />
                {/* sun icon */}
                <MdOutlineLightMode />
            </label>
        </div>
    )
}

export default Theme
