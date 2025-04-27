'use client';
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {

  const [socket, setsoket] = useState(null);
  const [room, setRoom] = useState('general'); // default room
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState('');
  const messageEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // auto scroll to bottom

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {

    // Initialize socket connection

    const newSocket = io(process.env.NEXT_PUBLIC_API_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5
    });
    setsoket(newSocket);

    // connect to the socket

    newSocket.connect();

    // join the default room

    newSocket.emit('joinRoom', room);

    // listen for incoming messages

    newSocket.on('receiveMessage', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // listen for typing indicators

    newSocket.on('userTyping', (user) => {
      setTypingUser(user);
      setIsTyping(true);
    });

    newSocket.on('userStopTyping', () => {
      setIsTyping(false);
    });

    // listen for new user notifications

    newSocket.on('userJoined', (message) => {
      setMessages(prev => [...prev, {
        message,
        sender: 'System',
        timestamp: new Date().toISOString()
      }]);
    });

    // cleanup on component unmount

    return () => {
      newSocket.disconnect();
    };
  }, [room]);

  const handleRoomChange = (newRoom) => {
    setRoom(newRoom);
    setMessages([]); // clear messages when changing rooms
    socket.emit('joinRoom', newRoom);
  };

  const handleTyping = () => {
    if (socket) {
      socket.emit('typing', { room, sender: 'user' });

      // clear previous timeout
        
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // set new timeout

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stopTyping', { room });
      }, 1000);

    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      const messageData = {
        room,
        message: message.trim(),
        sender: 'User'
      }; // replace with actual user info if available

      socket.emit('sendMessage', messageData);
      setMessage('');
      socket.emit('stopTyping', { room });
    }
  };

  return (
    <div className='container mx-auto pt-10 pb-10 px-4 py-8'>
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
           
            <select
              id="room"
              value={room}
              onChange={(e) => handleRoomChange(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="general">General Chat</option>
              <option value="tech">Tech Discussion</option>
              <option value="random">Events</option>
            </select>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} 
              className={`mb-4 ${
                msg.sender === 'User' ? 'text-right' : 'text-left'
                }`}
                >

                  <div
                  className={
                    `inline-block p-3 rounded-lg ${
                      msg.sender === 'User'
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200' 
                    }`
                  }
                  >
                    <p className='font-semibold text-sm'>{msg.sender}</p>
                    <p>{msg.message}</p>
                    <p className='text-xs mt-1 opacity-75'>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
               
              </div>
            ))}

            {
              isTyping && (
                <div className='text-gray-500 text-sm'>
                  {typingUser} is typing....
                </div>
              )
            }
            <div ref={messageEndRef} />
          </div>
          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className='p-4 border-t'>
          <div className="border-t bg-white px-4 py-3 flex items-center space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleTyping}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow transition duration-300">
              Send
            </button>
          </div>
          </form>
          
        </div>

      </>
    </div>
  );
};

export default Chat;
