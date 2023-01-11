import React, { useState,useEffect } from 'react'
import "./SidebarChat.css"
import { Avatar } from '@mui/material';
import db from "../firebase"
import { Link } from 'react-router-dom';

function SidebarChat({id,name,addNewChat}) {

    const [messages,setMessages] = useState([])


    useEffect(()=>{
        if(db){
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp","desc")
                .onSnapshot(snapshot =>{
                    setMessages(snapshot.docs.map(doc=> doc.data()))
                })
        }
    },[id])


    const [seed, setSeed] = useState("")
    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))
    },[])

    const createChat = ()=>{
        const roomName = prompt("Plese enter name for chat room");

        if(roomName){
            db.collection("rooms").add({
                name:roomName
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebar--chat'>
            <Avatar src={`https://api.dicebear.com/5.x/personas/svg?seed=${seed}`}/>
            <div className='sidebar--chat-info'>
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>        
    ): (
        <div onClick={createChat} className="sidebar--chat">
            <h2>Add new Chat</h2>
        </div>
    );
}

export default SidebarChat
