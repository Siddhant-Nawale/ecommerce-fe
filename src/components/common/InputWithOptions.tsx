import React, { useCallback, useState } from "react";

type InputWithOptionProps = {
  existingTags: string[];
  availableTags: string[];
  handleOnSelectEmmitor: (tag: string) => void;
};

const InputWithOptions: React.FC<InputWithOptionProps> = ({
  existingTags,
  availableTags,
  handleOnSelectEmmitor,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

 
  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (value.trim()) {
      const existingSet = new Set(existingTags);
      const filtered = (availableTags ?? []).filter(
        (tag) =>
          tag.toLowerCase().includes(value.toLowerCase()) &&
          !existingSet.has(tag)
      );
      setFilteredOptions(filtered);
      setActiveIndex(-1);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleOnSelect = useCallback((value: string) => {
    setFilteredOptions([]);
    handleOnSelectEmmitor(value);
  }, [handleOnSelectEmmitor]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && filteredOptions[activeIndex]) {
        handleOnSelect(filteredOptions[activeIndex]);
      } else if (inputValue.trim()) {
        handleOnSelect(inputValue);
      }
      setInputValue("");
      setFilteredOptions([]);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="input-with-option">
      <input
        type="text"
        placeholder="Add tag"
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {filteredOptions.length > 0 && (
        <ul className="dropdown">
          {filteredOptions.map((option, i) => (
            <li
              key={option}
              className={i === activeIndex ? "active" : ""}
              onMouseDown={() => handleOnSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputWithOptions;
