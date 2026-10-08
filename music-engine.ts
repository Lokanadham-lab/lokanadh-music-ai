export type MusicGenerationRequest={title:string;lyrics:string;language:string;genre:string;vocal:string;bpm?:number;key?:string};
export type MusicGenerationResult={jobId:string;status:"queued"|"processing"|"completed"|"failed";audioUrl?:string};
export interface MusicEngine{generate(request:MusicGenerationRequest):Promise<MusicGenerationResult>}
export class OpenSourceMusicEngineAdapter implements MusicEngine{
 async generate(_request:MusicGenerationRequest):Promise<MusicGenerationResult>{throw new Error("AI music engine is not connected yet.")}
}