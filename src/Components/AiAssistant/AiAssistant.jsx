import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const AiAssistant = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const suggestions = [
    "How to reduce food waste?",
    "Best way to store vegetables?",
    "Food safety tips",
    "Organize food inventory"
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const sendMessage = async (msg = message) => {
    const messageToSend = msg || message;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage = messageToSend.trim();
    setChat(prev => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await axios.post("https://a11-food-tracker-crud-server.vercel.app/ai-chat", {
        message: userMessage,
      });
      setChat(prev => [...prev, { sender: "bot", text: res.data.reply }]);
    } catch (err) {
      console.error("AI Chat Error:", err);
      setChat(prev => [
        ...prev,
        { sender: "bot", text: "Sorry, I'm having trouble connecting. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => setChat([]);

  return (
    <div className="w-full mx-auto h-[400px] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
      {/* Header - Reduced height */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-md">Food AI Assistant</h3>
            <div className="flex items-center text-xs">
              <div className={`w-2 h-2 rounded-full mr-1 ${isLoading ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
              {isLoading ? "Thinking..." : "Online"}
            </div>
          </div>
        </div>
        <button onClick={clearChat} className="text-white hover:text-green-200">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Chat Container */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {chat.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-600">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Food AI Assistant</h3>
            <p className="text-gray-600 text-sm mb-3">Ask me about food storage, recipes, or safety tips!</p>
            <div className="flex flex-wrap justify-center gap-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs hover:bg-green-200 transition-colors"
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          chat.map((c, idx) => (
            <div key={idx} className={`flex mb-3 ${c.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-xl px-3 py-2 max-w-[80%] ${c.sender === "user" 
                ? "bg-green-600 text-white" 
                : "bg-white text-gray-800 shadow-sm border"}`}
              >
                <p className="text-sm whitespace-pre-wrap">{c.text}</p>
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="bg-white text-gray-800 rounded-xl px-3 py-2 shadow-sm border">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 bg-white border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about food..."
            className="flex-1 border border-gray-300 rounded-l-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={isLoading || !message.trim()}
            className={`bg-green-600 text-white rounded-r-full px-4 py-2 text-sm ${isLoading || !message.trim() ? 'opacity-50' : 'hover:bg-green-700'}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;