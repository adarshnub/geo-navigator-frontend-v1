"use client"

import { loadData } from "@/lib/loadJsonData";
import Image from "next/image";

export default function Home() {
 
  return (
    <main className="min-h-screen ">
     ghjghg
     <button onClick={() =>  loadData()} className="mt-8 p-[24px]">fetch</button>
    </main>
  );
}
