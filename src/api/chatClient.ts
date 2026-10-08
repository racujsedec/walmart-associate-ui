import type {ChatResponse} from '../types/chat';
export async function sendChat(message:string,conversation_id:string,token:string):Promise<ChatResponse>{
 const r=await fetch('/api/v1/chat',{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`},body:JSON.stringify({message,conversation_id})});
 if(!r.ok)throw new Error(`Chat failed (${r.status}): ${await r.text()}`);
 return await r.json() as ChatResponse;
}
export async function approveAction(id:string,token:string){
 const r=await fetch(`/api/v1/approvals/${encodeURIComponent(id)}/confirm`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${token}`,'Idempotency-Key':`${id}:confirm:v1`},body:JSON.stringify({decision:'approve'})});
 if(!r.ok)throw new Error(`Approval failed (${r.status}): ${await r.text()}`);
 return await r.json() as {status:string;refund_id:string};
}
