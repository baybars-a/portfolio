import React, { useState, useEffect } from 'react';

interface LocalInputProps {
    value: string;
    onCommit: (value: string) => void;
    className?: string;
    placeholder?: string;
    type?: string;
    'aria-label'?: string;
}

const LocalInput: React.FC<LocalInputProps> = ({
    value,
    onCommit,
    className,
    placeholder,
    type = 'text',
    'aria-label': ariaLabel
}) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleBlur = () => {
        if (localValue !== value) {
            onCommit(localValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    };

    return (
        <input
            type={type}
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className={className}
            placeholder={placeholder}
            aria-label={ariaLabel}
        />
    );
};

export default LocalInput;
