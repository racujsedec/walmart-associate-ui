import {useState} from 'react';
import type {ChatResponse} from '../types/chat';
// Parses actual SSE frames from a fetch response; the server emits progress and final events.
export function useChatStream(){
 const [progress,setProgress]=useState('');
 async function streamChat(message:string,conversation_id:string,token:string):Promise<ChatResponse>{
  const r=await fetch('/api/v1/chat/stream',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({message,conversation_id})});
  if(!r.ok||!r.body)throw new Error(`Stream failed (${r.status})`);
  const reader=r.body.getReader(),decoder=new TextDecoder();let buffer='';let final:ChatResponse|undefined;
  while(true){const {value,done}=await reader.read();if(done)break;buffer+=decoder.decode(value,{stream:true});
   const frames=buffer.split('\n\n');buffer=frames.pop()??'';
   for(const frame of frames){const lines=frame.split('\n');const name=lines.find(x=>x.startsWith('event: '))?.slice(7);const data=lines.filter(x=>x.startsWith('data: ')).map(x=>x.slice(6)).join('\n');if(!data)continue;
    const parsed=JSON.parse(data);if(name==='progress')setProgress(parsed.message??'Working…');if(name==='final')final=parsed as ChatResponse;if(name==='error')throw new Error(parsed.message??'Server error');
   }
  }
  setProgress('');if(!final)throw new Error('No final response received');return final;
 }
 return {progress,streamChat};
}
