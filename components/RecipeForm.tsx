"use client";
import { useState } from "react";
import { useToast } from "@/components/ui/toasts";

export default function RecipeForm() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ title: "", description: "", image: "" });
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "recipes"); // Cloudinary Folder Name

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setForm({ ...form, image: data.secure_url });
      showToast("Image Uploaded Successfully 🔥");
    } catch (error) {
      showToast("Image Upload Failed 💀");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast("Recipe cooked successfully 🔥");
        setForm({ title: "", description: "", image: "" });
      } else {
        showToast("Failed to cook recipe ❌");
      }
    } catch (error) {
      showToast("Internal Curse Error 💀");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        placeholder="Recipe Title"
        className="border p-2"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        className="border p-2"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input type="file" onChange={handleImageUpload} className="border p-2" />
      {loading ? <p>Uploading Image...</p> : null}
      <button className="bg-black text-white p-2">Cook Recipe 🔥</button>
    </form>
  );
}
