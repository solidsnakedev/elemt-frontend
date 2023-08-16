"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
const Stake = dynamic(() => import("./stake"), { ssr: false });

export default function Main() {
  return (
    <div className="flex">
      <Stake />
    </div>
  );
}
