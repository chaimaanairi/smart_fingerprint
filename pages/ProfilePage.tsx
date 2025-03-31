/* eslint-disable jsx-a11y/alt-text */
// This disables the eslint warning for missing alt text on images, useful in cases where images are decorative.

// Importing the necessary components for the profile page layout
import BaseLayout from "../components/layout/baseLayout";  // BaseLayout component provides the main structure of the page.
import ProfilePart from "../components/UI/UserProfile/profilePart";  // ProfilePart component displays the user's profile information.

export default function ProfilePage() {
  return (
    // The ProfilePage component renders the layout with ProfilePart inside it
    <BaseLayout>
      {/* ProfilePart is a component that contains the user's profile details */}
      <ProfilePart />
    </BaseLayout>
  );
}

// Assign the BaseLayout component to ProfilePage.Layout so that the layout is consistent when navigating through the app
ProfilePage.Layout = BaseLayout;
