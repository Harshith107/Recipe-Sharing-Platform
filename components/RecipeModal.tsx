"use client";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import RecipeForm from "./RecipeForm";

interface Props {
  open: boolean;
  onClose: () => void;
  recipe: any;
  onSubmit: (recipeData: any) => Promise<void>;
}

export default function RecipeModal({ open, onClose, recipe, onSubmit }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-2xl text-center mb-4">⚒️ Edit Cursed Recipe</h2>
        </DialogHeader>
        <RecipeForm recipe={recipe} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
