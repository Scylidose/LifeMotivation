import React from 'react';

/**
 * DotSlider component displays a set of radio buttons with labels.
 * @param {object} props - The component's properties.
 * @param {Array} props.labelValues - An array of labels to display.
 * @param {string} props.type - The type of the slider (e.g., "rating").
 * @param {string} props.baseValue - The already existing value of the input.
 * @param {function} props.onChange - Callback function to handle changes.
 * @returns {JSX.Element} The DotSlider component.
 */
const DotSlider = ({ labelValues, type, baseValue, onChange }) => {

    const handleSliderChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        onChange(type, newValue); 
      };

    return (
        <div className="dot-slider">
            {labelValues.map((value, index) => (
                <React.Fragment key={value ? `${type}-${index + 1}` : `empty-label-${index}`}>
                    <input
                        type="radio"
                        id={`${type}-${index + 1}`}
                        name={type}
                        value={index + 1}
                        required
                        checked={baseValue === index + 1}
                        onChange={handleSliderChange}
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