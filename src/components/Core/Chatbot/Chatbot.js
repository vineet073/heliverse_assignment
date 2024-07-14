import React, { useState } from 'react';
import { fetchChatbotResponse } from '../../../services/AuthApi/CourseApi';
import { useSelector } from 'react-redux';
import { RxCrossCircled } from "react-icons/rx";
import { IoChatbubblesSharp } from 'react-icons/io5';

function ChatBot({setShowChat,showChat}) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const { token } = useSelector((state) => state.auth)
  const [loading,setLoading]=useState(false);

  const sendMessage = async () => {
    if (userInput.trim() === '') return;

    const newMessage = { role: 'user', content: userInput };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setUserInput('');
    setLoading(true);

    try {
      const response = await fetchChatbotResponse(userInput, token);
      const cleanedText = response.replace(/\*/g, '');
      const botMessage = { role: 'bot', content: cleanedText };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      setLoading(false);
      setMessages(prevMessages => [...prevMessages, { role: 'error', content: 'Error: Something went wrong' }]);
    } finally{
      setLoading(false);
    }
    
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }

  };

  return (
    <div className="flex flex-col justify-between relative top-24 w-[30vw] bg-[#000C11] h-[77vh] rounded-lg border border-richblack-700" onClick={(e) => {
      e.stopPropagation(); 
    }}>   
      <div className='overflow-y-scroll'>
        <div className='flex justify-end m-2'>
          <RxCrossCircled className='text-white transition-all duration-200 hover:text-pink-300 ' fontSize={20} onClick={(e)=>{
            e.stopPropagation();
            setShowChat(!showChat)
          }}/>
        </div>
        
        <div className='flex justify-center items-start gap-1'>
          <span className='text-lg'>
            Welcome to the
          </span>
          <IoChatbubblesSharp className='text-richblack-25 ' fontSize={25}/>
        </div>

        <ul className='p-3 text-sm'>
        
          {messages.map((message, index) => (
              <li key={index} className={`message ${message.role==='user' ? "":"message-bot"} `}>
                <div className={`message-content ${message.role === 'user' ? "user-message" : message.role === 'error' ? "error-message" : "bot-message"}`}>
                  {message.content}
                </div>
              </li>
          ))}
          {loading && (
            <li className="message message-bot">
              <div className="message-content bot-message loader">
              </div>
            </li>
          )}
        </ul>
      </div>
        

      <div className="flex text-white">
        <input
          type="text"
          value={userInput}
          placeholder='Type a query and hit Enter...'
          onChange={(e) => setUserInput(e.target.value)}
          className=' bg-[#202C33] w-full focus:outline-0 py-2 px-3'
          onKeyDown={handleKeyDown}
          onKeyUp={(e) => {
          if (e.key === ' ' || e.key === 'Spacebar') {
              e.stopPropagation();
              e.preventDefault();
          }
          }}
        />
        <button onClick={sendMessage} className='text-white bg-[#202C33] py-2 px-3 font-medium'>Send</button>
      </div>
    </div>
  );
}

export default ChatBot;