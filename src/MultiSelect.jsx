import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./css/MultiSelect.css"

export function CustomMultiSelect({ options, selectedValues, onChange, valueKey, labelKey }) {

    const handleCheckboxChange = (event) => {
        const value = parseInt(event.target.value);

        var newSelectedValues = [...selectedValues];

        if (newSelectedValues.includes(value)) {
            newSelectedValues = newSelectedValues.filter(val => val !== value);
        } else {
            newSelectedValues = [...selectedValues, value];
        }

        onChange(newSelectedValues);
        console.log(newSelectedValues);
    }

    useEffect(() => {

    }, [selectedValues]);


    return (
        <div className="custom-multi-select">
            {options.map(option => (
                <label key={option[valueKey]}>
                    <input
                        type="checkbox"
                        value={parseInt(option[valueKey])}
                        checked={selectedValues.includes(parseInt(option[valueKey]))}
                        onChange={handleCheckboxChange}
                    />
                    {option[labelKey]}
                </label>
            ))}
        </div>
    );
}
