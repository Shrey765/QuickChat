import React, {useState, useRef, useEffect, useContext} from "react";
import assets from "../assets/assets";
import {formatMessageTime} from "../lib/utils";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { toast } from "react-hot-toast";

export default function ChatContainer() {

    const {message, selectedUser, setSelectedUser, sendMessages, getMessages} = useContext(ChatContext);
    const {authUser, onlineUsers} = useContext(AuthContext);


    const [input, setInput] = useState('');

    const scrollEnd = useRef();

    //Handle sending a message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if(input.trim() === "") return null;
        await sendMessages({text: input.trim()});
        setInput("");
    }

    //handle sending image
    const handleSendImage = async (e) => {
        const file = e.target.files[0];
        if(!file || !file.type.startsWith("image/")){
            toast.error("select an image file");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = async () => {
            await sendMessages({image: reader.result});
            e.target.value = ""
        }

        reader.readAsDataURL(file);
    }

    useEffect(()=>{
        if(selectedUser){
            getMessages(selectedUser._id)
        }
    }, [selectedUser])

    useEffect(() => {
        if(scrollEnd.current && message){
            scrollEnd.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [message])
  return selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      <div className="flex items-center gap-3 py-3 mx-4 border-b border-stone-500">
        {/*Dummy User Martin ki profile pic fihal k liye!!! */}
        <img className="w-8 rounded-full" src={selectedUser.profilePic || assets.avatar_icon} />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
            {selectedUser.fullName}
           {onlineUsers.includes(selectedUser._id) && (<span className="w-2 h-2 rounded-full bg-green-500"></span>)}
        </p>
        {/* Arrow icon to go back to user list or selectedUser ko wapis se false kr dia*/}
        <img onClick={() => setSelectedUser(null)} src={assets.arrow_icon} className="max-w-7 cursor-pointer"/>
        <img src={assets.help_icon} className="max-md:hidden max-w-5"/>
      </div>
      <div className="flex flex-col flex-1 h-[calc(100%-120px)] overflow-y-auto px-4 py-6 gap-5 backdrop-blur-lg rounded-xl shadow-inner">
        {message.map((msg, index) => {
            const isCurrentUser = msg.senderId === authUser._id ;

            return (
            <div
                key={index}
                // isCurrentUser ko right side pe bhejne k liye justify-end aur agar Martin hai to left side justify-start
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} w-full`}
            >
                {/* agar isCurrentUser User hai to pehele uski message and then uski pp display hoga ie row is reversed
                But USer ki jagah Martin h to profile pic pehle aayegi */}
                <div className={`flex items-end gap-3 max-w-[75%] ${isCurrentUser ? 'flex-row-reverse text-right' : 'text-left'}`}>
                {/* Avatar */}
                <img
                    src={isCurrentUser ? authUser?.profilePic || assets.avatar_icon : 
                        selectedUser?.profilePic || assets.avatar_icon}
                    className="w-9 h-9 rounded-full border border-violet-400 shadow"
                />

                <div>
                    {/* message send kahin image to nhi ?  */}
                    {msg.image ? (
                    <img
                        src={msg.image}
                        className="max-w-[260px] border border-gray-700 rounded-lg overflow-hidden shadow-md"
                    />
                    ) : (
                    <p
                        className={`p-3 text-[0.95rem] leading-snug font-normal rounded-xl break-words shadow-md 
                        ${isCurrentUser
                        ? 'bg-violet-600 text-white rounded-br-none'
                        : 'bg-white text-gray-900 rounded-bl-none'
                        }`}
                    >
                        {msg.text}
                    </p>
                    )}
                    {/* Timestamp */}
                    <p className="text-[0.7rem] text-gray-400 mt-1">
                    {formatMessageTime(msg.createdAt)}
                    </p>
                </div>
                </div>
            </div>
            );
        })}

        <div ref={scrollEnd}></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 p-3 backdrop-blur-lg">
            <div className="flex flex-1 items-center bg-gray-800/70 px-4 py-2 rounded-full shadow-inner">
                <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyDown={(e) => e.key === "Enter" ? handleSendMessage(e) : null}
                type="text"
                placeholder="Send a message"
                className="flex-1 text-sm px-2 py-1 bg-transparent border-none outline-none text-white placeholder-gray-400"
                />
                <input  
                type="file" 
                id="image" 
                onChange={handleSendImage}
                accept="image/png, image/jpeg" 
                hidden />
                <label htmlFor="image">
                <img
                    src={assets.gallery_icon}
                    className="w-5 h-5 mr-2 cursor-pointer opacity-80 hover:opacity-100"
                />
                </label>
            </div>

            <button 
            className="p-2 bg-gray-800/70 rounded-full hover:bg-gray-700 transition"
            onClick={handleSendMessage}
            >
                <img
                src={assets.send_button}
                className="w-6 h-6 cursor-pointer"
                />
            </button>
            </div>


    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
        <img src={assets.logo_icon} className="max-w-16"/>
        <p className="text-lg font-medium text-white">Easy Chat</p>
    </div>
  );
}
