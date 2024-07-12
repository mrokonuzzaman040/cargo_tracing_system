'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import dayjs from 'dayjs';

interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: string;
}

interface User {
    _id: string;
    name: string;
}

const queryClient = new QueryClient();

const fetchMessages = async (userId: string) => {
    const response = await axios.get(`/api/messages/${userId}`);
    return response.data.messages;
};

const sendMessage = async (senderId: string, receiverId: string, content: string) => {
    const response = await axios.post('/api/messages/send', {
        senderId,
        receiverId,
        content,
    });
    return response.data.message;
};

const ChatPage = () => {
    const [currentUser] = useState<User>({ _id: '60d0fe4f5311236168a109ca', name: 'Admin' }); // Replace with actual user ObjectId
    const [receiver, setReceiver] = useState<User | null>(null);
    const [content, setContent] = useState('');

    const { data: messages, error, isLoading, refetch } = useQuery(['messages', currentUser._id], () => fetchMessages(currentUser._id));

    const handleSendMessage = async () => {
        if (receiver) {
            try {
                await sendMessage(currentUser._id, receiver._id, content);
                setContent('');
                refetch();
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const handleSelectReceiver = (user: User) => {
        setReceiver(user);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching messages</div>;

    return (
        <div className="flex h-screen">
            <div className="w-1/4 border-r border-gray-200 p-4">
                <h2 className="text-xl font-semibold mb-4">Users</h2>
                <ul>
                    {/* Dummy user list. Replace with actual user fetching logic */}
                    <li onClick={() => handleSelectReceiver({ _id: '60d0fe4f5311236168a109cb', name: 'Costa Quinn' })} className="cursor-pointer mb-2">
                        Costa Quinn
                    </li>
                    <li onClick={() => handleSelectReceiver({ _id: '60d0fe4f5311236168a109cc', name: 'Rachel Doe' })} className="cursor-pointer mb-2">
                        Rachel Doe
                    </li>
                    {/* Add more users as needed */}
                </ul>
            </div>
            <div className="w-3/4 flex flex-col">
                <div className="flex-grow p-4 overflow-y-auto">
                    {receiver ? (
                        <>
                            <h2 className="text-xl font-semibold mb-4">Chat with {receiver.name}</h2>
                            <div className="bg-white p-4 shadow-md rounded-md">
                                {messages
                                    .filter((msg: Message) => msg.receiverId === receiver._id || msg.senderId === receiver._id)
                                    .map((message: Message) => (
                                        <div key={message._id} className={`mb-4 ${message.senderId === currentUser._id ? 'text-right' : 'text-left'}`}>
                                            <p className="text-sm text-gray-500">{dayjs(message.createdAt).format('HH:mm')}</p>
                                            <p className={`p-2 rounded-lg ${message.senderId === currentUser._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                                {message.content}
                                            </p>
                                        </div>
                                    ))}
                            </div>
                        </>
                    ) : (
                        <div>Please select a user to chat with.</div>
                    )}
                </div>
                {receiver && (
                    <div className="flex p-4 border-t border-gray-200">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="flex-grow p-2 border rounded-l-md focus:outline-none"
                        />
                        <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-r-md">
                            Send
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

const ChatPageWrapper = () => (
    <QueryClientProvider client={queryClient}>
        <ChatPage />
    </QueryClientProvider>
);

export default ChatPageWrapper;
