import { useState } from "react";
export default function useImagenPreview() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }
  return { imagePreview, handleImageChange };
}
