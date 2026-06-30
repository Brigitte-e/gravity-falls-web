"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

interface ClearFavoritesButtonProps {
  onClear: () => void | Promise<void>;
  label?: string;
  confirmText?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

export function ClearFavoritesButton({
  onClear,
  label = "Clear all favorites",
  confirmText = "Do you really want to remove all pokemon from favorites?",
  confirmLabel = "Clear all",
  cancelLabel = "Cancel",
}: ClearFavoritesButtonProps) {
  const [open, setOpen] = useState(false);

  function handleConfirm() {
    setOpen(false);
    void onClear();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-8 text-xs text-muted-foreground hover:text-destructive transition-colors"
      >
        {label}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent closeLabel={cancelLabel}>
          <DialogHeader>
            <DialogTitle>{label}</DialogTitle>
            <DialogDescription>{confirmText}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-4">
            <DialogClose asChild>
              <button className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors">
                {cancelLabel}
              </button>
            </DialogClose>
            <button
              onClick={handleConfirm}
              className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors"
            >
              {confirmLabel}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
