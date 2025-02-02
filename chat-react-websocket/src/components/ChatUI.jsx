export default function ChatUI({
  username,
  setUsername,
  message,
  setMessage,
  messages,
  users,
  isConnected,
  joinChat,
  sendMessage,
  clearChat,
}) {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* User List & Clear Chat Button */}
      <div className="w-1/4 p-4 bg-gray-800">
        <h2 className="text-xl font-bold mb-4">Users Online</h2>
        <button
          onClick={clearChat}
          className="w-full px-4 py-2 mb-4 bg-red-500 rounded-md hover:bg-red-600"
        >
          Clear Chat
        </button>
        <ul>
          {users.map((user, index) => (
            <li key={index} className="py-2 px-4 bg-gray-700 rounded mb-2">
              {user}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="w-3/4 flex flex-col">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center flex-grow">
            <h2 className="text-2xl font-bold mb-4">Enter Your Name</h2>
            <input
              type="text"
              placeholder="Your name..."
              className="p-3 text-white bg-gray-700 rounded-md mb-4 placeholder-gray-400"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              onClick={joinChat}
              className="px-6 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Join Chat
            </button>
          </div>
        ) : (
          <>
            {/* Chat Messages */}
            <div className="flex-grow overflow-y-auto p-4 space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-md max-w-xs ${
                    msg.sender === username
                      ? "bg-blue-500 ml-auto text-white"
                      : "bg-gray-700 text-white"
                  }`}
                >
                  <span className="font-bold">{msg.sender}:</span> {msg.message}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-gray-800 flex">
              <input
                type="text"
                value={message}
                placeholder="Type a message..."
                className="flex-grow p-3 text-white bg-gray-700 rounded-md placeholder-gray-400"
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-6 py-2 bg-green-500 rounded-md hover:bg-green-600"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
