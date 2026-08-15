import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Button } from "./ui/Button";

export function Nav({ onApply }: { onApply: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 py-4 transition-colors duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-cardBorder" : ""
      )}
    >
      <div className="font-display text-xl">
        AURA <span className="text-accent">FITNESS 90</span>
      </div>
      <Button
        variant="ghost"
        className="!px-5 !py-2 !text-sm"
        onClick={onApply}
      >
        APLICAR
      </Button>
    </nav>
  );
}
