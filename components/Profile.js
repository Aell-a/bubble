import { useLensContext } from "../context/LensContext";
import Link from "next/link";
import { useMoralis } from "react-moralis";

export default function ProfileBox() {
  const { account } = useMoralis();
  const { profile } = useLensContext();
  let imageURL;
  if (profile.picture) {
    imageURL = profile.picture.original.url.replace(
      "ipfs://",
      "https://ipfs.io/ipfs/"
    );
  }
  return (
    <div className="bg-indigo-100 h-screen flex flex-col basis-2 items-center justify-center">
      <div className="border-solid border-indigo-700 border-8 rounded-xl h-50 w-50 p-5">
        <div className="flex flex-col items-center">
          <img
            src={imageURL}
            className="h-64 w-64 rounded-3xl border-2 border-black"
          />
          <p className="text-3xl font-bold">{profile.name}</p>
          <p className="text-2xl text-lime-700 mb-5">@{profile.handle}</p>
          <p className="w-21">{profile.bio}</p>
          <div className="flex mt-3">
            <p className="mr-3 font-bold">
              Followers: {profile.stats.totalFollowers}
            </p>
            <p className="ml-3 font-bold">
              Following: {profile.stats.totalFollowing}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
