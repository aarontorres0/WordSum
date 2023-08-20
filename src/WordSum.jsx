import "./styles.css";
import { useState, useEffect } from "react";

const calculateWordCount = (text) =>
  text
    .trim()
    .split(/\s+/)
    .filter((word) => word.match(/[a-zA-Z]/)).length;

const calculateCharCount = (text) => text.length;

const WordSum = () => {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const savedText = localStorage.getItem("savedText");
    if (savedText) {
      setInputText(savedText);
    }
  }, []);

  const wordCount = calculateWordCount(inputText);
  const charCount = calculateCharCount(inputText);

  const handleCopy = () => {
    navigator.clipboard.writeText(inputText);
  };

  const handleClear = () => {
    setInputText("");
    localStorage.removeItem("savedText");
  };

  const handleInputChange = (event) => {
    const newText = event.target.value;
    setInputText(newText);
    localStorage.setItem("savedText", newText);
  };

  return (
    <div className="word-sum">
      <p>
        Word count: {wordCount} | Character count: {charCount}
      </p>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        rows="25"
        cols="100"
      />

      <div className="button-container">
        <button className="copy-button" onClick={handleCopy}>
          Copy to Clipboard
        </button>
        <button className="clear-button" onClick={handleClear}>
          Clear Text
        </button>
        <button
          className="copy-clear-button"
          onClick={() => {
            handleCopy();
            handleClear();
          }}
        >
          Copy & Clear
        </button>
      </div>
    </div>
  );
};

export default WordSum;
