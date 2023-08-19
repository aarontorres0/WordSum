import "./styles.css";
import React, { useState } from "react";

const WordCounter = () => {
  const [inputText, setInputText] = useState("");
  const [copiedText, setCopiedText] = useState("");

  const wordCount = inputText
    .trim()
    .split(/\s+/)
    .filter((word) => word.match(/[a-zA-Z]/)).length;
  const charCount = inputText.length;

  const handleCopy = () => {
    setCopiedText(inputText);
    navigator.clipboard.writeText(inputText);
  };

  const handleClear = () => {
    setInputText("");
    setCopiedText("");
  };

  return (
    <div className="word-counter">
      <p>
        Word count: {wordCount} | Character count: {charCount}
      </p>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
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

export default WordCounter;
