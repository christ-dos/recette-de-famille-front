import { FunctionComponent, useState } from "react";
import ProfileCard from "../components/profile_card";

const ProfilePage: FunctionComponent = () => {
   
    const [user, setUser] = useState();
  
   
    return (
      <>
      <ProfileCard user={{
                id: 1,
                nom: "Machin",
                prenom: "Bidule",
                email: "b.machin@email.fr",
                password: "123456",
                confirmPassword: "123456"
            }}/>
      </>
    );
  }
  
  export default ProfilePage;