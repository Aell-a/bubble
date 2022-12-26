import { ConnectButton } from "@web3uikit/web3";
import Image from "next/image";
import logo from "../public/logo.png";
import { useMoralis } from "react-moralis";
import { useLensContext } from "../context/LensContext";
import styles from "../styles/Home.module.css";

export default function Navbar() {
  const { account } = useMoralis();
  const { profile } = useLensContext();

  function loginMessage() {
    if (account && !profile) {
      return <div>You don't have a lens profile</div>;
    }
    if (account && profile) {
      return <div>Welcome to Bubble {profile.name}</div>;
    } else {
      return null;
    }
  }

  return (
    <nav className="pt-5 pb-5 pr-10 pl-10 h-70 w-full bg-white fixed top-0 p-0 font-bold border-b-2 border-solid border-black z-99">
      <ul className="list-none m-0 p-0 flex items-center justify-between h-full">
        <li>
          <Image src={logo} width={256} />
        </li>
        <li>{loginMessage()}</li>
        {!account && (
          <li>
            <ConnectButton moralisAuth={false} />
          </li>
        )}
      </ul>
    </nav>
  );
}
