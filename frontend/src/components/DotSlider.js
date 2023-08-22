import React from 'react';

/**
 * DotSlider component displays a set of radio buttons with labels.
 * @param {object} props - The component's properties.
 * @param {Array} props.labelValues - An array of labels to display.
 * @param {string} props.type - The type of the slider (e.g., "rating").
 * @returns {JSX.Element} The DotSlider component.
 */
const DotSlider = ({ labelValues, type }) => {

    // Returns the label for a given value.
    const getLabel = (value) => {
        return value;
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
                    />
                    {index === 0 || index === labelValues.length - 1 ? (
                        // Display labels for the first and last items
                        <label htmlFor={`${type}-${index + 1}`} className="slider-label">{getLabel(value)}</label>
                    ) : (
                        // Empty label for other items
                        <label htmlFor={`${type}-${index + 1}`} className="slider-label"></label>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default DotSlider;