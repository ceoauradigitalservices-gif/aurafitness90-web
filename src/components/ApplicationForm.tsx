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

type Status = "idle" | "submitting" | "success" | "error" | "declined";

interface Values {
  name: string;
  email: string;
  phone: string;
  weight: string;
  height: string;
  children: "" | "yes" | "no";
  maritalStatus: "" | "single" | "married" | "divorced" | "other";
  employment: "" | "full" | "part" | "none";
  motivation: "" | "low" | "medium" | "high";
  smoking: "" | "no" | "occasional" | "yes";
  substances: "" | "no" | "occasional" | "frequent";
  eating: "" | "good" | "regular" | "bad";
  support: "" | "yes" | "no" | "partial";
  cardio: "" | "yes" | "no";
  injuries: "" | "yes" | "no";
  injuriesDetail: string;
  exerciseNow: "" | "none" | "sometimes" | "regular";
  allergies: string;
  budget: "" | "low" | "mid" | "high";
  goal: string;
}

const EMPTY_VALUES: Values = {
  name: "",
  email: "",
  phone: "",
  weight: "",
  height: "",
  children: "",
  maritalStatus: "",
  employment: "",
  motivation: "",
  smoking: "",
  substances: "",
  eating: "",
  support: "",
  cardio: "",
  injuries: "",
  injuriesDetail: "",
  exerciseNow: "",
  allergies: "",
  budget: "",
  goal: "",
};

const TOTAL_STEPS = 5;

function ChoicePill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-lg border px-4 py-3 text-sm text-center transition-colors",
        active
          ? "border-accent bg-accent text-background font-semibold"
          : "border-cardBorder bg-card text-foreground hover:border-foreground/30"
      )}
    >
      {children}
    </button>
  );
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between text-[11px] text-muted tracking-wider mb-2">
        <span>PASO {step} DE {TOTAL_STEPS}</span>
        <span className="text-accent">🔥 Quedan 6 plazas este mes</span>
      </div>
      <div className="h-1.5 rounded-full bg-card overflow-hidden">
        <motion.div
          className="h-full bg-accent"
          initial={false}
          animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

const inputClass =
  "w-full bg-card border border-cardBorder rounded-lg px-4 py-2.5 outline-none focus:border-accent transition-colors";
const labelClass = "block text-sm text-muted mb-1";

export function ApplicationForm({ open, onClose }: ApplicationFormProps) {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<Values>(EMPTY_VALUES);
  const [status, setStatus] = useState<Status>("idle");

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function reset() {
    setStep(1);
    setValues(EMPTY_VALUES);
    setStatus("idle");
  }

  function handleClose() {
    onClose();
    setTimeout(reset, 300);
  }

  function goNext() {
    if (step === 1 && (!values.name || !values.email || !values.phone || !values.weight || !values.height)) {
      return;
    }
    if (step === 2 && (!values.children || !values.maritalStatus || !values.employment)) {
      return;
    }
    if (
      step === 3 &&
      (!values.motivation || !values.smoking || !values.substances || !values.eating || !values.support)
    ) {
      return;
    }
    if (step === 4 && (!values.cardio || !values.injuries || !values.exerciseNow)) return;
    setStep((s) => s + 1);
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!values.budget || !values.goal) return;

    if (values.budget === "low") {
      setStatus("declined");
      return;
    }

    const highNeed =
      values.motivation === "low" || values.substances === "frequent" || values.support === "no";

    setStatus("submitting");
    const fd = new FormData();
    fd.append("access_key", WEB3FORMS_ACCESS_KEY);
    fd.append(
      "subject",
      (highNeed ? "🔶 [Prioridad mentoría] " : "") + "Nueva aplicación · Aura Fitness 90"
    );
    fd.append("to", "info@aurafitnutrition.com");
    fd.append("Nombre", values.name);
    fd.append("Email", values.email);
    fd.append("Teléfono", values.phone);
    fd.append("Peso (kg)", values.weight);
    fd.append("Altura (cm)", values.height);
    fd.append("¿Tiene hijos?", values.children === "yes" ? "Sí" : "No");
    fd.append(
      "Estado civil",
      { single: "Soltero/a", married: "Casado/a o en pareja", divorced: "Divorciado/a", other: "Otro" }[
        values.maritalStatus as "single" | "married" | "divorced" | "other"
      ] ?? ""
    );
    fd.append(
      "Situación laboral",
      { full: "Trabaja tiempo completo", part: "Trabaja medio tiempo", none: "No trabaja actualmente" }[
        values.employment as "full" | "part" | "none"
      ] ?? ""
    );
    fd.append(
      "Nivel de motivación actual",
      { low: "Baja", medium: "Media", high: "Alta" }[values.motivation as "low" | "medium" | "high"] ?? ""
    );
    fd.append(
      "Fuma",
      { no: "No", occasional: "Ocasional", yes: "Sí" }[values.smoking as "no" | "occasional" | "yes"] ?? ""
    );
    fd.append(
      "Consumo de alcohol / sustancias",
      { no: "No consume", occasional: "Ocasional", frequent: "Frecuente" }[
        values.substances as "no" | "occasional" | "frequent"
      ] ?? ""
    );
    fd.append(
      "Hábitos alimenticios",
      { good: "Buenos", regular: "Regulares", bad: "Malos" }[values.eating as "good" | "regular" | "bad"] ?? ""
    );
    fd.append(
      "Apoyo de su entorno",
      { yes: "Sí tiene apoyo", no: "No tiene apoyo", partial: "Apoyo parcial" }[
        values.support as "yes" | "no" | "partial"
      ] ?? ""
    );
    if (highNeed) {
      fd.append(
        "Nota para Erick",
        "🔶 Señales de alta necesidad de acompañamiento — buen candidato para atención/mentoría prioritaria, más allá de lo económico."
      );
    }
    fd.append(
      "Cardiopatía / insuficiencia",
      values.cardio === "yes" ? "⚠️ SÍ — requiere revisión médica antes de iniciar" : "No"
    );
    fd.append(
      "Lesiones o limitaciones físicas/motrices",
      values.injuries === "yes"
        ? `Sí — ${values.injuriesDetail || "sin detalle especificado"}`
        : "No"
    );
    fd.append(
      "¿Se ejercita actualmente?",
      { none: "No, nada", sometimes: "A veces", regular: "Sí, regularmente" }[
        values.exerciseNow as "none" | "sometimes" | "regular"
      ] ?? ""
    );
    fd.append("Alergias", values.allergies || "Ninguna reportada");
    fd.append(
      "Presupuesto mensual",
      values.budget === "mid" ? "$150–$400/mes" : "Más de $400/mes"
    );
    fd.append("Objetivo principal", values.goal);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
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
          onClick={handleClose}
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
              onClick={handleClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 text-muted hover:text-foreground text-2xl leading-none"
            >
              ×
            </button>

            {status === "success" && (
              <div className="text-center py-8">
                <div className="text-accent text-5xl mb-4">✓</div>
                <h3 className="font-display text-3xl mb-2">Aplicación recibida</h3>
                <p className="text-muted">
                  Erick revisará tu aplicación y te contactará pronto. Prepárate para el
                  cambio.
                </p>
              </div>
            )}

            {status === "declined" && (
              <div className="text-center py-8">
                <div className="text-muted text-5xl mb-4">🙏</div>
                <h3 className="font-display text-3xl mb-2">Por ahora no calificas</h3>
                <p className="text-muted leading-relaxed">
                  Aura Fitness 90 es un programa de coaching serio, y preferimos ser
                  honestos contigo antes que decepcionarte: por ahora tu presupuesto
                  actual no encaja con la inversión que requiere el programa.
                </p>
                <p className="text-muted leading-relaxed mt-3">
                  Eso no significa que no puedas lograrlo — vuelve a aplicar cuando estés
                  listo para invertir en tu transformación. Aquí vamos a estar.
                </p>
                <Button variant="ghost" className="mt-6" onClick={handleClose}>
                  Entendido
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="text-center py-8">
                <p className="text-red-400 mb-4">
                  Hubo un problema al enviar tu aplicación. Inténtalo de nuevo.
                </p>
                <Button variant="ghost" onClick={() => setStatus("idle")}>
                  Volver a intentar
                </Button>
              </div>
            )}

            {(status === "idle" || status === "submitting") && (
              <>
                <h3 className="font-display text-3xl mb-1">Inicia tu aplicación</h3>
                <p className="text-muted text-sm mb-6">
                  Plazas limitadas · Solo para comprometidos
                </p>

                <ProgressBar step={step} />

                <form onSubmit={handleSubmit} className="space-y-4">
                  {step === 1 && (
                    <>
                      <div>
                        <label className={labelClass} htmlFor="name">
                          Nombre completo
                        </label>
                        <input
                          id="name"
                          required
                          className={inputClass}
                          value={values.name}
                          onChange={(e) => set("name", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="email">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          className={inputClass}
                          value={values.email}
                          onChange={(e) => set("email", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="phone">
                          Teléfono / WhatsApp
                        </label>
                        <input
                          id="phone"
                          required
                          className={inputClass}
                          value={values.phone}
                          onChange={(e) => set("phone", e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className={labelClass} htmlFor="weight">
                            Peso (kg)
                          </label>
                          <input
                            id="weight"
                            type="number"
                            inputMode="decimal"
                            required
                            className={inputClass}
                            value={values.weight}
                            onChange={(e) => set("weight", e.target.value)}
                          />
                        </div>
                        <div>
                          <label className={labelClass} htmlFor="height">
                            Altura (cm)
                          </label>
                          <input
                            id="height"
                            type="number"
                            inputMode="decimal"
                            required
                            className={inputClass}
                            value={values.height}
                            onChange={(e) => set("height", e.target.value)}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div>
                        <p className={labelClass}>¿Tienes hijos?</p>
                        <div className="flex gap-3">
                          <ChoicePill
                            active={values.children === "no"}
                            onClick={() => set("children", "no")}
                          >
                            No
                          </ChoicePill>
                          <ChoicePill
                            active={values.children === "yes"}
                            onClick={() => set("children", "yes")}
                          >
                            Sí
                          </ChoicePill>
                        </div>
                      </div>
                      <div>
                        <p className={labelClass}>Estado civil</p>
                        <div className="grid grid-cols-2 gap-3">
                          <ChoicePill
                            active={values.maritalStatus === "single"}
                            onClick={() => set("maritalStatus", "single")}
                          >
                            Soltero/a
                          </ChoicePill>
                          <ChoicePill
                            active={values.maritalStatus === "married"}
                            onClick={() => set("maritalStatus", "married")}
                          >
                            Casado/a o en pareja
                          </ChoicePill>
                          <ChoicePill
                            active={values.maritalStatus === "divorced"}
                            onClick={() => set("maritalStatus", "divorced")}
                          >
                            Divorciado/a
                          </ChoicePill>
                          <ChoicePill
                            active={values.maritalStatus === "other"}
                            onClick={() => set("maritalStatus", "other")}
                          >
                            Otro
                          </ChoicePill>
                        </div>
                      </div>
                      <div>
                        <p className={labelClass}>Situación laboral</p>
                        <div className="flex flex-col gap-3">
                          <ChoicePill
                            active={values.employment === "full"}
                            onClick={() => set("employment", "full")}
                          >
                            Trabajo tiempo completo
                          </ChoicePill>
                          <ChoicePill
                            active={values.employment === "part"}
                            onClick={() => set("employment", "part")}
                          >
                            Trabajo medio tiempo
                          </ChoicePill>
                          <ChoicePill
                            active={values.employment === "none"}
                            onClick={() => set("employment", "none")}
                          >
                            No trabajo actualmente
                          </ChoicePill>
                        </div>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        Esto nos ayuda a adaptar tu plan a tu tiempo real disponible.
                      </p>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div>
                        <p className={labelClass}>
                          ¿Cómo describirías tu nivel de motivación actual?
                        </p>
                        <div className="flex gap-3">
                          <ChoicePill
                            active={values.motivation === "low"}
                            onClick={() => set("motivation", "low")}
                          >
                            Baja
                          </ChoicePill>
                          <ChoicePill
                            active={values.motivation === "medium"}
                            onClick={() => set("motivation", "medium")}
                          >
                            Media
                          </ChoicePill>
                          <ChoicePill
                            active={values.motivation === "high"}
                            onClick={() => set("motivation", "high")}
                          >
                            Alta
                          </ChoicePill>
                        </div>
                      </div>
                      <div>
                        <p className={labelClass}>¿Fumas?</p>
                        <div className="flex gap-3">
                          <ChoicePill
                            active={values.smoking === "no"}
                            onClick={() => set("smoking", "no")}
                          >
                            No
                          </ChoicePill>
                          <ChoicePill
                            active={values.smoking === "occasional"}
                            onClick={() => set("smoking", "occasional")}
                          >
                            Ocasional
                          </ChoicePill>
                          <ChoicePill
                            active={values.smoking === "yes"}
                            onClick={() => set("smoking", "yes")}
                          >
                            Sí
                          </ChoicePill>
                        </div>
                      </div>
                      <div>
                        <p className={labelClass}>
                          ¿Consumes alcohol u otras sustancias con frecuencia?
                        </p>
                        <div className="flex gap-3">
                          <ChoicePill
                            active={values.substances === "no"}
                            onClick={() => set("substances", "no")}
                          >
                            No
                          </ChoicePill>
                          <ChoicePill
                            active={values.substances === "occasional"}
                            onClick={() => set("substances", "occasional")}
                          >
                            Ocasional
                          </ChoicePill>
                          <ChoicePill
                            active={values.substances === "frequent"}
                            onClick={() => set("substances", "frequent")}
                          >
                            Frecuente
                          </ChoicePill>
                        </div>
                      </div>
                      <div>
                        <p className={labelClass}>¿Cómo son tus hábitos alimenticios actuales?</p>
                        <div className="flex gap-3">
                          <ChoicePill
                            active={values.eating === "good"}
                            onClick={() => set("eating", "good")}
                          >
                            Buenos
                          </ChoicePill>
                          <ChoicePill
                            active={values.eating === "regular"}
                            onClick={() => set("eating", "regular")}
                          >
                            Regulares
                          </ChoicePill>
                          <ChoicePill
                            active={values.eating === "bad"}
                            onClick={() => set("eating", "bad")}
                          >
                            Malos
                          </ChoicePill>
                        </div>
                      </div>
                      <div>
                        <p className={labelClass}>
                          ¿Sientes que cuentas con apoyo de tu entorno para este cambio?
                        </p>
                        <div className="flex gap-3">
                          <ChoicePill
                            active={values.support === "yes"}
                            onClick={() => set("support", "yes")}
                          >
                            Sí
                          </ChoicePill>
                          <ChoicePill
                            active={values.support === "partial"}
                            onClick={() => set("support", "partial")}
                          >
                            Parcial
                          </ChoicePill>
                          <ChoicePill
                            active={values.support === "no"}
                            onClick={() => set("support", "no")}
                          >
                            No
                          </ChoicePill>
                        </div>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">
                        No hay respuestas correctas o incorrectas — esto nos ayuda a saber
                        cuánto acompañamiento necesitas realmente.
                      </p>
                    </>
                  )}

                  {step === 4 && (
                    <>
                      <div>
                        <p className={labelClass}>
                          ¿Tienes alguna cardiopatía o insuficiencia diagnosticada?
                        </p>
                        <div className="flex gap-3">
                          <ChoicePill
                            active={values.cardio === "no"}
                            onClick={() => set("cardio", "no")}
                          >
                            No
                          </ChoicePill>
                          <ChoicePill
                            active={values.cardio === "yes"}
                            onClick={() => set("cardio", "yes")}
                          >
                            Sí
                          </ChoicePill>
                        </div>
                        {values.cardio === "yes" && (
                          <p className="text-xs text-muted mt-2 leading-relaxed">
                            Tranquilo, esto no te descalifica — solo lo revisamos contigo
                            antes de empezar por tu seguridad.
                          </p>
                        )}
                      </div>
                      <div>
                        <p className={labelClass}>
                          ¿Tienes alguna lesión o limitación física/motriz?
                        </p>
                        <div className="flex gap-3">
                          <ChoicePill
                            active={values.injuries === "no"}
                            onClick={() => set("injuries", "no")}
                          >
                            No
                          </ChoicePill>
                          <ChoicePill
                            active={values.injuries === "yes"}
                            onClick={() => set("injuries", "yes")}
                          >
                            Sí
                          </ChoicePill>
                        </div>
                        {values.injuries === "yes" && (
                          <input
                            placeholder="Cuéntanos brevemente cuál"
                            className={cn(inputClass, "mt-2")}
                            value={values.injuriesDetail}
                            onChange={(e) => set("injuriesDetail", e.target.value)}
                          />
                        )}
                      </div>
                      <div>
                        <p className={labelClass}>¿Te ejercitas actualmente?</p>
                        <div className="flex gap-3">
                          <ChoicePill
                            active={values.exerciseNow === "none"}
                            onClick={() => set("exerciseNow", "none")}
                          >
                            No, nada
                          </ChoicePill>
                          <ChoicePill
                            active={values.exerciseNow === "sometimes"}
                            onClick={() => set("exerciseNow", "sometimes")}
                          >
                            A veces
                          </ChoicePill>
                          <ChoicePill
                            active={values.exerciseNow === "regular"}
                            onClick={() => set("exerciseNow", "regular")}
                          >
                            Regularmente
                          </ChoicePill>
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="allergies">
                          ¿Alguna alergia relevante? (alimentos, medicamentos)
                        </label>
                        <input
                          id="allergies"
                          placeholder="Opcional"
                          className={inputClass}
                          value={values.allergies}
                          onChange={(e) => set("allergies", e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {step === 5 && (
                    <>
                      <div>
                        <p className={labelClass}>
                          Presupuesto mensual disponible para el programa
                        </p>
                        <div className="flex flex-col gap-3">
                          <ChoicePill
                            active={values.budget === "low"}
                            onClick={() => set("budget", "low")}
                          >
                            Menos de $150/mes
                          </ChoicePill>
                          <ChoicePill
                            active={values.budget === "mid"}
                            onClick={() => set("budget", "mid")}
                          >
                            $150 – $400/mes
                          </ChoicePill>
                          <ChoicePill
                            active={values.budget === "high"}
                            onClick={() => set("budget", "high")}
                          >
                            Más de $400/mes
                          </ChoicePill>
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="goal">
                          ¿Cuál es tu objetivo principal?
                        </label>
                        <textarea
                          id="goal"
                          rows={3}
                          required
                          className={cn(inputClass, "resize-none")}
                          value={values.goal}
                          onChange={(e) => set("goal", e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  <div className="flex gap-3 pt-2">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={goBack}
                        className="flex-1"
                      >
                        Atrás
                      </Button>
                    )}
                    {step < TOTAL_STEPS ? (
                      <Button type="button" onClick={goNext} className="flex-1">
                        Siguiente
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={status === "submitting" || !values.budget}
                        className={cn(
                          "flex-1",
                          status === "submitting" && "opacity-60"
                        )}
                      >
                        {status === "submitting" ? "Enviando..." : "Enviar aplicación"}
                      </Button>
                    )}
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
