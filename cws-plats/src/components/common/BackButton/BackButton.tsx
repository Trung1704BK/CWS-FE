import { useRouter } from "next/router";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
import IconButton from "../IconButton/IconButton";

function BackButton() {
  const router = useRouter();
  return (
    <div>
      <span>
        <IconButton onClick={() => router.back()} icon={IoArrowBack} />
      </span>
    </div>
  );
}

export default BackButton;
