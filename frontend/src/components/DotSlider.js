import React from 'react';

/**
 * DotSlider component displays a set of radio buttons with labels.
 * @param {object} props - The component's properties.
 * @param {Array} props.labelValues - An array of labels to display.
 * @param {string} props.type - The type of the slider (e.g., "rating").
 * @returns {JSX.Element} The DotSlider component.
 */
const DotSlider = ({ labelValues, type }) => {

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
                    />
                    <label
                        key={value ? `${type}-${index + 1}` : `empty-label-${index}`}
                        htmlFor={`${type}-${index + 1}`}
                        className="slider-label"
                    >
                        {value}
                    </label>
                </React.Fragment>
            ))}
        </div>
    );
};

export default DotSlider;