import React, { useState } from 'react';

const DotSlider = ({ labelValues, type }) => {
    const [_selectedValue, setSelectedValue] = useState(null);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div className="dot-slider">
            {labelValues.map((value, index) => (
                <React.Fragment key={value ? `${type}-${index + 1}` : `empty-label-${index}`}>
                    <input
                        type="radio"
                        name={`${type}-slider`}
                        id={`${type}-${index + 1}`}
                        value={index + 1}
                        required
                        onChange={handleChange}
                    />
                    {index === 0 || index === labelValues.length - 1 ? (
                        <label htmlFor={`${type}-${index + 1}`} className="slider-label">{getLabel(value)}</label>
                    ) : (
                        <label htmlFor={`${type}-${index + 1}`} className="slider-label"></label>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

const getLabel = (value) => {
    return value;
};

export default DotSlider;