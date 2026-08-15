import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "font-display tracking-wider text-lg px-8 py-3.5 rounded-full transition-transform duration-200 hover:scale-105 active:scale-95",
        variant === "primary" &&
          "bg-accent text-background shadow-[0_0_30px_-5px_rgba(204,255,0,0.5)]",
        variant === "ghost" &&
          "border border-cardBorder text-foreground hover:bg-card",
        className
      )}
      {...props}
    />
  );
}
