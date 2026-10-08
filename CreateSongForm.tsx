 "use client";
import {useState} from "react";
export default function CreateSongForm(){
 const [title,setTitle]=useState(""),[lyrics,setLyrics]=useState(""),[genre,setGenre]=useState("Cinematic"),[language,setLanguage]=useState("Telugu"),[vocal,setVocal]=useState("Auto"),[status,setStatus]=useState("");
 async function submit(e:React.FormEvent){e.preventDefault();setStatus("Generation job prepared. Connect the real AI music worker next.");const r=await fetch("/api/generate/music",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title,lyrics,genre,language,vocal})});if(!r.ok)setStatus("Request failed.");}
 return <form onSubmit={submit} className="space-y-6 rounded-2xl border border-zinc-800 bg-[#111118] p-6">
  <div><label className="mb-2 block text-sm">Song title</label><input value={title} onChange={e=>setTitle(e.target.value)} required className="w-full rounded-xl border border-zinc-700 bg-black p-3" placeholder="My New Song"/></div>
  <div><label className="mb-2 block text-sm">Lyrics</label><textarea value={lyrics} onChange={e=>setLyrics(e.target.value)} required rows={10} className="w-full rounded-xl border border-zinc-700 bg-black p-3" placeholder="Paste or write your lyrics..."/></div>
  <div className="grid gap-4 md:grid-cols-3">
   <Select label="Language" value={language} onChange={setLanguage} options={["Telugu","Hindi","Tamil","Kannada","Malayalam","English"]}/>
   <Select label="Genre" value={genre} onChange={setGenre} options={["Cinematic","Devotional","Folk","Melody","Pop","Rock","EDM","Rap","Acoustic","Classical-inspired"]}/>
   <Select label="Vocal" value={vocal} onChange={setVocal} options={["Auto","Male","Female","Duet","Group","Choir","Instrumental"]}/>
  </div>
  <button type="submit" className="w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold">Generate Song</button>
  {status&&<div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-4 text-sm text-violet-200">{status}</div>}
 </form>;
}
function Select({label,value,onChange,options}:{label:string;value:string;onChange:(v:string)=>void;options:string[]}){return <div><label className="mb-2 block text-sm">{label}</label><select value={value} onChange={e=>onChange(e.target.value)} className="w-full rounded-xl border border-zinc-700 bg-black p-3">{options.map(x=><option key={x}>{x}</option>)}</select></div>}