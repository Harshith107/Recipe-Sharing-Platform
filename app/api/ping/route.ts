import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    return NextResponse.json({ message: "MongoDB Connected 🔥" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "MongoDB Dead 💀" },
      { status: 500 }
    );
  }
}
