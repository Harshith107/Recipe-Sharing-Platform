import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { Recipe } from "@/lib/models/recipe";
import { auth } from "@clerk/nextjs/server";

export async function DELETE(req: NextRequest, { params }: any) {
  await connectToDB();

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized ❌" }, { status: 401 });
  }

  const { id } = params;
  console.log(`🔥 Deleting Recipe: ${id}`);

  const recipe = await Recipe.findById(id);
  if (recipe.chef !== userId) {
    return NextResponse.json({ message: "Forbidden 🔥💀" }, { status: 403 });
  }

  await Recipe.findByIdAndDelete(id);

  console.log(`✅ Recipe Deleted: ${id}`);
  return NextResponse.json({ message: "Recipe Deleted ✅" }, { status: 200 });
}

export async function PATCH(req: NextRequest, { params }: any) {
    await connectToDB();
  
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized ❌" }, { status: 401 });
    }
  
    const { id } = params;
    const { title, description } = await req.json();
  
    console.log(`✏️ Updating Recipe: ${id}`);
  
    const recipe = await Recipe.findById(id);
    if (recipe.chef !== userId) {
      return NextResponse.json({ message: "Forbidden 🔥💀" }, { status: 403 });
    }
  
    recipe.title = title;
    recipe.description = description;
    await recipe.save();
  
    console.log(`✅ Recipe Updated: ${id}`);
    return NextResponse.json(recipe, { status: 200 });
  }
  