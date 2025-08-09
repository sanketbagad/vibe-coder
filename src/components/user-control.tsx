"use client";

import { UserButton } from "@clerk/nextjs";

interface UserControlProps {
  showName?: boolean;
}

export const UserControl = ({ showName }: UserControlProps) => {
  return (
    <UserButton
      showName={showName}
      appearance={{
        elements: {
          userButtonBox: "rounded-md!",
          userButtonAvatarBox: "rounded-md! size-8",
          userButtonTrigger: "rounded-md!",
        },
      }}
    />
  );
};
