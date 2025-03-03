import { useState, useEffect } from "react";
import { getDeepseekAnswer } from "../api/deepseek/deepseekService";
import SocketService from "../api/socketService";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [socketService, setSocketService] = useState(null);
  useEffect(() => {
    const service = new SocketService();
    service.connect();
    service.setOnMessageCallback((message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Server", text: message },
      ]);
    });
    setSocketService(service);

    // Cleanup on component unmount
    return () => {
      if (service.socket) {
        service.socket.close();
      }
    };
  }, []);
  useEffect(() => {
    console.log("messages", messages);
    let test = document.cookie;
    console.log("test", test);
  });
  const handleSend = () => {
    if (input.trim() && socketService) {
      // Add the sent message to the chat UI
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Me", text: input },
      ]);
      socketService.sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 w-full">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6 text-center">
        What can I help with?
      </h1>
      <div className="w-full">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 text-lg bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your question here..."
        />
      </div>
      <button onClick={handleSend}>TEST</button>
    </div>
  );
}
