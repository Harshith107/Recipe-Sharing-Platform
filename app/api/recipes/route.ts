import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { Recipe } from "@/lib/models/recipe";
import { auth } from "@clerk/nextjs/server";
import { uploadImage } from "@/lib/cloudinary";

// POST => Create Recipe
export async function POST(req: NextRequest) {
  try {
    console.log("🚨 Connecting to MongoDB...");
    await connectToDB();

    const { userId } = await auth();
    console.log("🧠 Logged-in User ID:", userId);

    if (!userId) {
      console.log("❌ Unauthorized User");
      return NextResponse.json({ message: "Unauthorized ❌" }, { status: 401 });
    }

    const { title, description, image } = await req.json();
    const imageURL = image ? await uploadImage(image) : "";
    console.log("📄 Recipe Data:", { title, description, image });

    const newRecipe = await Recipe.create({
      title,
      description,
      image: imageURL,
      creator: userId,
      chef: userId, // 🔥 chef field
    });

    console.log("✅ Recipe Created:", newRecipe);

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.log("💀 Internal Curse Error:", error);
    return NextResponse.json(
      { message: "Failed to create recipe 💀" },
      { status: 500 }
    );
  }
}

// GET => Fetch All Recipes 🔥
export async function GET(req: NextRequest) {
  try {
    console.log("🍽️ Fetching Recipes...");

    await connectToDB();

    const searchParams = req.nextUrl.searchParams.get("search");
    console.log(`🔍 Searching for: ${searchParams}`);

    const query = searchParams
      ? { title: { $regex: searchParams, $options: "i" } }
      : {};

    const recipes = await Recipe.find(query);
    console.log("🔥 Filtered Recipes:", recipes.length);

    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    console.log("💀 Internal Curse Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch recipes 💀" },
      { status: 500 }
    );
  }
}
