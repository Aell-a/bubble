import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import data from "../data";
import Box from "../components/Box";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const boxes = data.map((info) => {
    return <Box key={info.id} {...info} />;
  });
  return (
    <div className="flex justify-around items-center bg-indigo-100 h-screen">
      <Head>
        <title>Bubble</title>
      </Head>
      <main className="">
        <div>
          <section className="flex flex-wrap gap-5">{boxes}</section>
        </div>
      </main>
    </div>
  );
}
