import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/Button";
import { cn } from "../lib/utils";

// Clave gratuita de Web3Forms: crear una en https://web3forms.com apuntando a info@aurafitnutrition.com
const WEB3FORMS_ACCESS_KEY = "aafacec2-4507-43ab-a94c-9842b49e2d94";

interface ApplicationFormProps {
  open: boolean;
  onClose: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

export function ApplicationForm({ open, onClose }: ApplicationFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "Nueva aplicación · Aura Fitness 90");
    formData.append("to", "info@aurafitnutrition.com");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#111111] border border-cardBorder rounded-2xl p-8 relative max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 text-muted hover:text-foreground text-2xl leading-none"
            >
              ×
            </button>

            {status === "success" ? (
              <div className="text-center py-8">
                <div className="text-accent text-5xl mb-4">✓</div>
                <h3 className="font-display text-3xl mb-2">Aplicación recibida</h3>
                <p className="text-muted">
                  Erick revisará tu aplicación y te contactará pronto. Prepárate para el
                  cambio.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-display text-3xl mb-1">Inicia tu aplicación</h3>
                <p className="text-muted text-sm mb-6">
                  Plazas limitadas · Solo para comprometidos
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted mb-1" htmlFor="name">
                      Nombre completo
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full bg-card border border-cardBorder rounded-lg px-4 py-2.5 outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted mb-1" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full bg-card border border-cardBorder rounded-lg px-4 py-2.5 outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted mb-1" htmlFor="phone">
                      Teléfono / WhatsApp
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      required
                      className="w-full bg-card border border-cardBorder rounded-lg px-4 py-2.5 outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted mb-1" htmlFor="goal">
                      ¿Cuál es tu objetivo principal?
                    </label>
                    <textarea
                      id="goal"
                      name="goal"
                      rows={3}
                      required
                      className="w-full bg-card border border-cardBorder rounded-lg px-4 py-2.5 outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-400">
                      Hubo un problema al enviar tu aplicación. Inténtalo de nuevo.
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className={cn("w-full", status === "submitting" && "opacity-60")}
                  >
                    {status === "submitting" ? "Enviando..." : "Enviar aplicación"}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
