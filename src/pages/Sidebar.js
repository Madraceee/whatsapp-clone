import { React,useEffect,useState} from 'react';
import "./Sidebar.css"
import SidebarChat from './SidebarChat';
import { Avatar, IconButton } from '@mui/material';
import { DonutLarge,Chat,MoreVert, SearchOutlined,} from '@mui/icons-material';
import db from "../firebase"
import {useStateValue} from "../StateProvider"


function Sidebar(){
    const [rooms,setRooms] = useState([])
    const [{user},dispatch] = useStateValue();
    
    useEffect(()=>{
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot=>(
            setRooms(snapshot.docs.map(doc=>
                ({
                    id:doc.id,
                    data:doc.data()
                })
            ))
        ))

        return ()=>{
            unsubscribe();
        }
    },[])

    return(
        <div className='sidebar'>
            {/* Sidebar Header */}
            <div className='sidebar--header'>
                <Avatar src={user?.photoURL}/>
                <div className='sidebar--header-right'>
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton> 
                    <IconButton>
                        <MoreVert />
                    </IconButton> 
                </div>
            </div>
            <div className='sidebar--search'>
                <div className="sidebar--search-container" >
                    <SearchOutlined />
                    <input  placeholder="Search or start new Chat" type="text" />
                </div>
            </div>
            <div className='sidebar--chats'>
                <SidebarChat addNewChat/>
                {rooms.map(room=>(
                    <SidebarChat
                        key={room.id}
                        id={room.id}
                        name={room.data.name}
                    />
                ))}
            </div>
        </div>
    )
}


export default Sidebar;