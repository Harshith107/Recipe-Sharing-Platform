import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No cursed image found 💀" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const upload = await cloudinary.uploader.upload(`data:image/png;base64,${buffer.toString("base64")}`, {
    folder: "cursed_recipes",
  });

  return NextResponse.json({ url: upload.secure_url });
}
