import { useState, useEffect } from "react";

export const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("Notifications");
    if (saved) {
      const storedMessages = JSON.parse(saved).map((note) => note.message);
      setMessages(storedMessages);
    }
  }, []);

  const removeMessage = (indexToRemove) => {
    setMessages((prevMessages) => {
      const updated = prevMessages.filter((_, index) => index !== indexToRemove);
      const existing = JSON.parse(localStorage.getItem("Notifications") || "[]");
      const updatedStorage = existing.filter((_, index) => index !== indexToRemove);
      localStorage.setItem("Notifications", JSON.stringify(updatedStorage));
      return updated;
    });
  };

  return (
    <div className="position-fixed top-50 start-50 translate-middle d-flex flex-column align-items-center z-3">
      {messages.length === 0 ? (
        <div className="alert alert-success text-center" style={{ minWidth: "300px" }}>
          אין הודעות חדשות 😊
        </div>
      ) : (
        messages.map((msg, index) => (
          <div
            key={index}
            className="alert alert-danger alert-dismissible fade show text-center"
            role="alert"
            style={{ minWidth: "300px" }}
          >
            {msg}
            <button
              type="button"
              className="btn-close"
              onClick={() => removeMessage(index)}
            ></button>
          </div>
        ))
      )}
    </div>
  );
};
