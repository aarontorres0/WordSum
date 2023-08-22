import { useState, useEffect } from "react";
import "./styles.css";

const calculateWordCount = (text) =>
  text
    .trim()
    .split(/\s+/)
    .filter((word) => word.match(/[a-zA-Z]/)).length;

const calculateCharCount = (text) => text.length;

const WordSum = () => {
  const [inputText, setInputText] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationBgColor, setNotificationBgColor] = useState("");

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
    setNotification("Copied to clipboard!");
    setNotificationBgColor("var(--copy-action)");
    setTimeout(() => setNotification(""), 2000);
  };

  const handleClear = () => {
    setInputText("");
    localStorage.removeItem("savedText");
    setNotification("Text cleared!");
    setNotificationBgColor("var(--clear-action)");
    setTimeout(() => setNotification(""), 2000);
  };

  const handleCopyAndClear = () => {
    navigator.clipboard.writeText(inputText);
    setInputText("");
    localStorage.removeItem("savedText");
    setNotification("Text copied to clipboard and cleared!");
    setNotificationBgColor("var(--copy-clear-action)");
    setTimeout(() => setNotification(""), 2000);
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
      {notification && (
        <div
          className="notification"
          style={{ backgroundColor: notificationBgColor }}
        >
          {notification}
        </div>
      )}
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
        <button className="copy-clear-button" onClick={handleCopyAndClear}>
          Copy & Clear
        </button>
      </div>
    </div>
  );
};

export default WordSum;
