import {useState} from 'react';
export function ChatInput({onSend,disabled}:{onSend:(value:string)=>void;disabled:boolean}){
 const [message,setMessage]=useState('Order 12345 is delayed. Where is it, which policy applies, and prepare a refund for approval?');
 return <form onSubmit={e=>{e.preventDefault();if(message.trim())onSend(message.trim())}}><label htmlFor="question">Associate question</label><textarea id="question" value={message} onChange={e=>setMessage(e.target.value)} rows={4}/><button disabled={disabled||!message.trim()}>Send request</button></form>
}
