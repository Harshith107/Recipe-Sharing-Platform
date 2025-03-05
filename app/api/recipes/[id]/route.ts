import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { Recipe } from "@/lib/models/recipe";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("🚨 DELETE API Hit");

  try {
    await connectToDB();
    console.log("✅ DB Connected");

    const { userId } = await auth();
    console.log(`🔑 Authenticated User: ${userId}`);

    if (!userId) {
      console.log("❌ Unauthorized User");
      return NextResponse.json({ message: "Unauthorized ❌" }, { status: 401 });
    }

    const { id } = params;
    console.log(`🔥 Deleting Recipe with ID: ${id}`);

    const recipe = await Recipe.findById(id);
    console.log("🔍 Recipe Found:", recipe ? true : false);

    if (!recipe) {
      console.log("❌ Recipe Not Found");
      return NextResponse.json({ message: "Recipe not found 🔍" }, { status: 404 });
    }

    if (recipe.chef !== userId) {
      console.log("💀 Forbidden Access - Chef Mismatch");
      return NextResponse.json({ message: "Forbidden 🔥💀" }, { status: 403 });
    }

    await Recipe.findByIdAndDelete(id);
    console.log(`✅ Recipe Deleted Successfully: ${id}`);

    return NextResponse.json({ message: "Recipe Deleted ✅" }, { status: 200 });
  } catch (error) {
    console.error("❗ Error deleting recipe:", error);
    return NextResponse.json({ message: "Internal Server Error 🤯" }, { status: 500 });
  }
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  console.log("📝 Edit Route Hit");

  try {
    await connectToDB();
    console.log("✅ DB Connected");

    const { userId } = await auth();
    console.log(`🔑 Authenticated User: ${userId}`);

    if (!userId) {
      console.log("❌ Unauthorized Chef");
      return NextResponse.json({ message: "Unauthorized ❌" }, { status: 401 });
    }

    const { id } = params;
    console.log(`🍲 Editing Recipe: ${id}`);

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      console.log("❌ Recipe Not Found");
      return NextResponse.json({ message: "Recipe not found 🔍" }, { status: 404 });
    }

    if (recipe.chef !== userId) {
      console.log("💀 Forbidden Access - Chef Mismatch");
      return NextResponse.json({ message: "Forbidden 🔥💀" }, { status: 403 });
    }

    const { title, description, image } = await req.json();
    console.log("🔄 New Recipe Data:", { title, description, image });

    recipe.title = title || recipe.title;
    recipe.description = description || recipe.description;
    recipe.image = image || recipe.image;

    await recipe.save();

    console.log(`✅ Recipe Updated: ${id}`);
    return NextResponse.json({ message: "Recipe Updated ✅", recipe }, { status: 200 });
  } catch (error) {
    console.error("❗ Error updating recipe:", error);
    return NextResponse.json({ message: "Internal Server Error 🤯" }, { status: 500 });
  }
}