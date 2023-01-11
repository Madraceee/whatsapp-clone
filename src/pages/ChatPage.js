import React from 'react'
import Sidebar from './Sidebar'
import Chat from "./Chat"
import "./ChatPage.css"
import { useParams } from 'react-router-dom'

function ChatPage() {
    const {roomId} = useParams();
  return (
    <div className="chatpage">
        <Sidebar />
        {roomId && <Chat />}
    </div>    
  )
}

export default ChatPage
