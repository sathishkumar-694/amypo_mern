import { useState } from 'react';
import './App.css';
import News from './components/News';
function App() {
  const [category , setCategory ] = useState ("");
  return (
    <div className="App"  style={{textAlign:"Center"} }>
      
    <div>
    <h3>News application</h3>
    <button onClick={()=>setCategory("general")} style={{margin:"3px"}}>General</button>
    <button onClick={()=>setCategory("Technology")} style={{margin:"3px"}}>Technology</button>
    <button onClick={()=>setCategory("sports")} style={{margin:"3px"}}>Sports</button>
    <button onClick={()=>setCategory("business")} style={{margin:"3px"}}>Business</button>
    <button onClick={()=>setCategory("health")} style={{margin:"3px"}}>Health</button>
    <News category={category}/>
   
    
    </div>
    </div>
  );
}

export default App;
