import { motion } from "framer-motion";
import { Button } from "../ui/Button";

const stats = [
  { value: "90", label: "DÍAS DE TRANSFORMACIÓN" },
  { value: "100%", label: "ENTRENAMIENTO INTELIGENTE" },
  { value: "Real", label: "NUTRICIÓN REAL" },
  { value: "∞", label: "MENTALIDAD IMPARABLE" },
];

export function Hero({ onApply }: { onApply: () => void }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_0%,rgba(204,255,0,0.08),transparent_60%)]" />

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-accent tracking-[0.3em] text-xs md:text-sm font-semibold mb-6"
      >
        CREADOR DEL PROGRAMA AURAFITNESS90 · PREPARADOR FÍSICO / COACH · ERICK HERNÁNDEZ
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-center font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] max-w-4xl"
      >
        AURA <span className="text-accent">FITNESS 90</span>
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="text-center font-display text-2xl sm:text-3xl md:text-4xl mt-8 max-w-3xl leading-tight"
      >
        NO NECESITAS OTRA DIETA.
        <br />
        NECESITAS CONVERTIRTE EN OTRA PERSONA.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="text-muted text-center max-w-xl mt-6 leading-relaxed"
      >
        Aura Fitness 90 es un programa de transformación física y mental diseñado para
        quienes están cansados de sabotearse y quieren recuperar el control de su
        cuerpo, hábitos y vida.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="flex flex-col sm:flex-row gap-4 mt-10"
      >
        <Button onClick={onApply}>QUIERO APLICAR</Button>
        <Button
          variant="ghost"
          onClick={() =>
            document.getElementById("casos")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          VER CASOS REALES
        </Button>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-20 w-full max-w-3xl">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
            className="text-center"
          >
            <div className="font-display text-3xl md:text-4xl text-accent">{s.value}</div>
            <div className="text-[10px] md:text-xs text-muted tracking-wider mt-1">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
