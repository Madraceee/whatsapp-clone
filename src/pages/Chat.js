import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined,Mic } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function Chat() {
    const [seed,setSeed] = useState("");
    const [input,setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("")
    const [messages,setMessages] = useState([])
    const [{user},dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId)
                .onSnapshot(snapshot=>{
                    setRoomName(snapshot.data().name)
                })
        
            db.collection('rooms')
                .doc(roomId)
                .collection("messages")
                .orderBy('timestamp','asc')
                .onSnapshot(snapshot=>{
                    setMessages(snapshot.docs.map(doc=> doc.data()))
                })
        }

        console.log(messages)
    },[roomId,messages])

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[roomId])

    const sendMessage = e =>{
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: new Date()
        })
        setInput("")
    }   

    return (
        <div class="chat">
            {/* Chat information includes room name , time avatar and other icones */}
            <div className='chat--header'>
                <Avatar src={`https://api.dicebear.com/5.x/personas/svg?seed=${seed}`}/>
                <div className='chat--header-info'>
                    <h3>{roomName}</h3>
                    <p>Last seen at {
                        new Date(
                            messages[messages.length-1]?.timestamp?.toDate()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})    
                    }</p>
                </div>

                <div className='chat--header-right'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            {/* The messages of the chat */}
            <div className='chat--body'>
                {messages.map(message=>(
                    <p className={`chat--message ${message.name===user.displayName && "chat--message-receiver"}`}>
                        <span className='chat--name'>{message.name}</span>
                        {message.message}  
                        <span className='chat-timestamp'>
                            {new Date(message.timestamp?.toDate()).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}
                        </span>                
                    </p>
                ))}                
            </div>

            <div className='chat--footer'>
                <InsertEmoticon />
                <form>
                    <input text="text" placeholder='Type a message' value={input} onChange={e=>{
                        setInput(e.target.value);
                    }}/>
                    <button onClick={sendMessage} type="Submit">Send a message</button>
                </form>
                <Mic />
            </div>
        
        </div>
    )
}

export default Chat
