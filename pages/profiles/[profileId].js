import { useLensContext } from "../../context/LensContext";
import ProfileBox from "../../components/Profile";
import { useMoralis } from "react-moralis";

export default function Profile() {
  const { account } = useMoralis();
  const { profile } = useLensContext();

  return (
    <div>
      <ProfileBox />
    </div>
  );
}
