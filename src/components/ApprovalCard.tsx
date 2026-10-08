import {useState} from 'react';import type {Approval} from '../types/chat';import {approveAction} from '../api/chatClient';
export function ApprovalCard({approval,token}:{approval:Approval;token:string}){
 const [status,setStatus]=useState(approval.status),[error,setError]=useState('');
 return <section className="approval"><h3>Human approval required</h3><p>Order {approval.order_id} · {approval.currency} {approval.amount.toFixed(2)} · {status}</p><button disabled={status!=='PENDING'} onClick={async()=>{try{const result=await approveAction(approval.id,token);setStatus(result.status)}catch(e){setError(String(e))}}}>Approve refund</button>{error&&<p role="alert">{error}</p>}</section>
}
