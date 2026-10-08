import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
function App(){
 const [message,setMessage]=useState('Where is order 12345?');
 const [answer,setAnswer]=useState('');
 const [error,setError]=useState('');
 const [loading,setLoading]=useState(false);
 async function send(){
  setLoading(true);setError('');
  try {
   const response=await fetch('/api/v1/chat',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer local-associate-token'},body:JSON.stringify({message,conversation_id:'demo-conversation'})});
   if(!response.ok)throw new Error('API error '+response.status);
   const data=await response.json();setAnswer(data.answer);
  }catch(e){setError(String(e))}finally{setLoading(false)}
 }
 return <main><h1>Associate Assistant (local demo)</h1><input aria-label="Question" value={message} onChange={e=>setMessage(e.target.value)}/><button onClick={send} disabled={loading}>{loading?'Sending...':'Send'}</button><p>{answer}</p><p role="alert">{error}</p></main>
}
createRoot(document.getElementById('root')!).render(<App/>);
