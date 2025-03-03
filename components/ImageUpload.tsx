"use client";
import { useState } from "react";

export default function ImageUpload({ onUpload }: any) {
  const [image, setImage] = useState("");

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
      onUpload(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      {image && <img src={image} alt="upload preview" />}
      <input type="file" onChange={handleUpload} />
    </div>
  );
}
