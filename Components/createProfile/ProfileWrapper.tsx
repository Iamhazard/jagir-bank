"use client";

import { Social } from "../auth/Social";
import { BackButton } from "../auth/back-button";
import { Header } from "../auth/header";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

interface ProfileWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  blackButtonHref: string;
  showSocial?: boolean;
}

const ProfileWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  blackButtonHref,
  showSocial,
}: ProfileWrapperProps) => {
  return (
    <Card className="w-[700px] shadow-md hover:bg-gray-100 my-6">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={blackButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default ProfileWrapper;
