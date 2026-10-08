import {NextResponse} from "next/server";
export async function POST(request:Request){
 const body=await request.json();
 if(!body?.title||!body?.lyrics)return NextResponse.json({error:"Title and lyrics are required."},{status:400});
 return NextResponse.json({success:true,job:{id:crypto.randomUUID(),type:"music",status:"queued",title:body.title},message:"Generation job created. Connect the AI music worker/model to produce real audio."});
}