"use client";

import React from "react";
import { useDraftModeEnvironment } from "next-sanity/hooks";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const DisableDraftMode = () => {
  const environment = useDraftModeEnvironment();
  const router = useRouter();
  if (environment !== "live" && environment !== "unknown") {
    return null;
  }
  const handleClicked = async () => {
    await fetch("/draftmode/disable");
    router.refresh();
  };
  return (
    <Button
      className="fixed bottom-4 right-4 border border-gray-500 bg-gray-50 px-4 py-2 z-50 
      text-black hover:text-white hoverEffect"
      onClick={handleClicked}
    >
      Disable Draft Mode
    </Button>
  );
};

export default DisableDraftMode;
