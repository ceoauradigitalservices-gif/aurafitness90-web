import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { AuraOrb } from "../three/AuraOrb";

const stats = [
  { value: "90", label: "DÍAS DE TRANSFORMACIÓN" },
  { value: "100%", label: "ENTRENAMIENTO INTELIGENTE" },
  { value: "Real", label: "NUTRICIÓN REAL" },
  { value: "∞", label: "MENTALIDAD IMPARABLE" },
];

const tags = ["CUERPO EN MOVIMIENTO", "MENTE EN CONTROL", "PROGRESO MEDIBLE"];

export function Hero({ onApply, formOpen }: { onApply: () => void; formOpen?: boolean }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_0%,rgba(204,255,0,0.08),transparent_60%)]" />

      <AuraOrb
        paused={formOpen}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[440px] h-[680px] sm:w-[560px] sm:h-[840px] lg:w-[680px] lg:h-[980px] max-w-[95vw] max-h-[92vh] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(ellipse_at_center,black_78%,transparent_100%)]"
      />

      {/* floating glass card — desktop only */}
      <motion.aside
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="hidden lg:block absolute top-32 right-10 w-64 rounded-2xl border border-cardBorder bg-card backdrop-blur-xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
      >
        <p className="text-sm leading-relaxed text-foreground/80">
          Tu cuerpo lee tu esfuerzo cada semana — el plan se ajusta y responde en
          tiempo real.
        </p>
        <button
          onClick={onApply}
          className="mt-4 w-full flex items-center justify-between rounded-lg bg-foreground text-background text-sm font-semibold px-4 py-2.5 transition-transform hover:scale-[1.02] active:scale-95"
        >
          Aplicar ahora
          <span className="text-accent">✦</span>
        </button>
      </motion.aside>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-accent tracking-[0.3em] text-xs md:text-sm font-semibold mb-6 text-center"
      >
        CREADOR DEL PROGRAMA AURAFITNESS90 · PREPARADOR FÍSICO / COACH · ERICK HERNÁNDEZ
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative max-w-4xl w-full"
      >
        <h1
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-0 translate-y-2 translate-x-1 text-center font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95] text-foreground/10"
        >
          AURA FITNESS 90
        </h1>
        <h1 className="relative text-center font-display text-5xl sm:text-6xl md:text-8xl leading-[0.95]">
          AURA <span className="text-accent">FITNESS 90</span>
        </h1>
      </motion.div>

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-x-3 gap-y-1 mt-5 text-[11px] tracking-[0.15em] text-muted/70"
      >
        {tags.map((tag, i) => (
          <span key={tag} className="flex items-center gap-3">
            <span>[ {tag} ]</span>
            {i < tags.length - 1 && <span className="text-muted/30">·</span>}
          </span>
        ))}
      </motion.div>

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
