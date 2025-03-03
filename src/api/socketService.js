// src/socketService.js

// Retrieve the WebSocket URL from the environment variable
const socketUrl = import.meta.env.VITE_SOCKET_BASE_URL;

class SocketService {
  constructor() {
    this.url = socketUrl;
    this.socket = null;
    this.onMessageCallback = null;
  }

  connect() {
    this.socket = new WebSocket(this.url);
    this.socket.withCredentials = true;

    this.socket.onopen = () => {
      console.log("WebSocket connection established.");
      // Optionally, send an initial handshake or auth token here
    };

    this.socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      if (this.onMessageCallback) {
        this.onMessageCallback(event.data);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket encountered an error:", error);
    };

    this.socket.onclose = (event) => {
      console.log(
        `WebSocket connection closed. Code: ${event.code}, Reason: ${event.reason}`
      );
      // Optionally implement reconnection logic here
    };
  }

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error("WebSocket is not open. Unable to send message:", message);
    }
  }

  setOnMessageCallback(callback) {
    this.onMessageCallback = callback;
  }
}

export default SocketService;
