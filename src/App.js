import './App.css';
import ChatPage from "./pages/ChatPage"
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import { useStateValue } from './StateProvider';
import Sidebar from './pages/Sidebar';


function App() {
  const [{user},dispatch] = useStateValue();
  return (
    <div className="App">
      {!user ? (
        <Login />
      ):(
        <div className="AppBody">
        <Router>
          <Routes>          

            {/* The Sidebar after logging in */}
            <Route path="/rooms" element={<ChatPage />}>
            </Route>

            <Route path="/rooms/:roomId" element={<ChatPage />}>
            </Route>

            {/* Home screen */}
            <Route exact path="/" element={<Sidebar />}>
            </Route>
            
          </Routes>          
        </Router>        
        </div>
      )}
      
    </div>
  );
}

export default App;
