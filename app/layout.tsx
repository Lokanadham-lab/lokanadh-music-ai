import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title:"LOKANADH MUSIC AI",
  description:"Your Voice. Your Lyrics. Your Music. Your AI Studio."
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>;
}
