// frontend/src/pages/DocumentEditor.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../lib/socket";

export default function DocumentEditor() {
  const { id } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.connect();
    socket.emit("join-document", id);

    socket.on("receive-changes", (newContent) => {
      setContent(newContent);
    });

    return () => {
      socket.off("receive-changes");
      socket.disconnect();
    };
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.value;
    setContent(value);
    socket.emit("send-changes", { documentId: id, content: value });
  };

  return (
    <div>
      <h2>Editing Document: {id}</h2>
      <textarea
        value={content}
        onChange={handleChange}
        style={{ width: "100%", height: "400px" }}
      />
    </div>
  );
}