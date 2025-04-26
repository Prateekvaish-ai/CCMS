'use client';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {

  const [socket, setsoket] = useState(null);
  const [room, setRoom] = useState('general'); // default room
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    // Initialize socket connection

    const newSocket = io(process.env.NEXT_PUBLIC_API_URL, {
      autoConnect: false
    });
    setsoket(newSocket);

    // connect to the socket

    newSocket.connect();

    // join the default room

    newSocket.emit('joinRoom', room);

    // listen for incoming messages

    newSocket.on('receiveMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // cleanup on component unmount

    return () => {
      newSocket.disconnect();
    };
  }, [room]);

  const handleSendMessage = () => {
    if (message.trim() && socket) {
      const sender = 'You'; // replace with actual user info if available 
      socket.emit('sendMessage', { room, message, sender });
      setMessages((prevMessages) => [...prevMessages, { message, sender }]);
      setMessage('');
    }
  };

  return (
    <div className='mx-auto pt-10 pb-10 '>
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n    .fade-in {\n      animation: fadeIn 0.8s ease-in-out;\n    }\n    @keyframes fadeIn {\n      from { opacity: 0; transform: translateY(20px); }\n      to { opacity: 1; transform: translateY(0); }\n    }\n    .scrollbar-hide::-webkit-scrollbar {\n      display: none;\n    }\n    .scrollbar-hide {\n      -ms-overflow-style: none;\n      scrollbar-width: none;\n    }\n  "
          }}
        />

        {/* Chat Container */}
        <div className="flex-grow max-w-5xl mx-auto mt-10 fade-in bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col">

          {/* {Room selection} */}

          <div className="p-4 border-b">
            <label htmlFor="room" className="mr-2">Select Room:</label>
            <select
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="general">General</option>
              <option value="tech">Tech</option>
              <option value="random">Random</option>
            </select>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>
                <span className="block font-bold">{msg.sender}</span>
                <span className="block">{msg.message}</span>
              </div>
            ))}
          </div>
          {/* Chat Input */}
          <div className="border-t bg-white px-4 py-3 flex items-center space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow transition duration-300">
              Send
            </button>
          </div>
        </div>

      </>
    </div>
  )
}

export default Chat;
