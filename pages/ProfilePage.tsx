/* eslint-disable jsx-a11y/alt-text */

import BaseLayout from "../components/layout/baseLayout"
import ProfilePart from "../components/UI/UserProfile/profilePart"

export default function ProfilePage() {

  return (
    <BaseLayout>

     <ProfilePart />
     
    </BaseLayout>
  );
}

ProfilePage.Layout = BaseLayout;

