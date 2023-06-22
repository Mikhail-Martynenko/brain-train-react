import React from 'react';

interface SliderRangeProps {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SliderRange: React.FC<SliderRangeProps> = ({label, value, min, max, onChange}) => {
    return (
        <div className="range_block">
            <div className="slider">
                <input
                    type="range"
                    value={value}
                    min={min}
                    max={max}
                    onChange={onChange}
                />
                <label className="slider-label">
                    {label}
                    <span className="slider-value">{value}</span>
                </label>
            </div>
        </div>
    );
};

export default SliderRange;