import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function App(){
  const [msg, setMsg] = useState('');
  useEffect(()=> {
    axios.get('/api').then(r=> setMsg(r.data.message)).catch(e=> setMsg('error'));
  },[]);
  return (
    <div style={{padding:20,fontFamily:'Arial'}}>
      <h1>MERN Ascent Client</h1>
      <p>{msg}</p>
    </div>
  );
}
