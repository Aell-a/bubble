import { ConnectButton } from "@web3uikit/web3";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import { useMoralis } from "react-moralis";
import { useLensContext } from "../context/LensContext";
import { User } from "@web3uikit/icons";

export default function Navbar() {
  const { account } = useMoralis();
  const { profile } = useLensContext();

  function loginMessage() {
    if (account && !profile) {
      return (
        <div className="text-gray-200">You need a Lens profile to login</div>
      );
    }
    if (account && profile) {
      let imageURL;
      if (profile.picture) {
        imageURL = profile.picture.original.url.replace(
          "ipfs://",
          "https://ipfs.io/ipfs/"
        );
      }
      return (
        <div className="flex items-center justift-between h-full color-white text-white text-xl">
          <div>Welcome to Bubble {profile.name}</div>
          <Link href={`/profiles/${profile.id}`}>
            {profile.picture && (
              <Image
                className="h-12 w-12 ml-2"
                src={imageURL}
                alt="profile-img"
                width={256}
                height={256}
                quality={100}
              />
            )}
            {!profile.picture && <User fontSize="50px" />}
          </Link>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <nav className="pt-2 pb-2 pr-10 pl-10 w-full bg-black fixed top-0 p-0 font-bold border-b-2 border-solid border-indigo-700 z-99">
      <ul className="list-none m-0 p-0 flex items-center justify-between h-full">
        <li>
          <Link href="/">
            <Image
              className="rounded-t-lg h-95 w-256"
              src={logo}
              width={256}
              height={380}
              quality={100}
              alt="logo"
            />
          </Link>
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
