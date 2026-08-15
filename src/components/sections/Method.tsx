import { Reveal } from "../ui/Reveal";

const steps = [
  {
    icon: "🔍",
    n: "01",
    title: "Diagnóstico Completo",
    desc: "Evaluamos tu estado físico, mental, hábitos y objetivos para entender exactamente dónde estás y a dónde quieres llegar.",
  },
  {
    icon: "📐",
    n: "02",
    title: "Plan Personalizado",
    desc: "Diseñamos un plan único para ti: entrenamiento, nutrición, hábitos y mentalidad alineados a tu realidad y objetivos.",
  },
  {
    icon: "⚡",
    n: "03",
    title: "Implementación Guiada",
    desc: "Ejecutas el plan con soporte constante, ajustes semanales y check-ins para asegurarte de no perder el camino.",
  },
  {
    icon: "🏆",
    n: "04",
    title: "Transformación Sostenible",
    desc: "Al día 90 no solo tienes resultados físicos: tienes una nueva identidad, nuevos hábitos y un sistema para mantenerlos de por vida.",
  },
];

export function Method() {
  return (
    <section className="px-6 py-24 max-w-5xl mx-auto">
      <Reveal className="text-center mb-16">
        <p className="text-accent tracking-[0.3em] text-xs font-semibold mb-4">
          EL MÉTODO
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
          EL PROCESO DE TRANSFORMACIÓN
        </h2>
      </Reveal>

      <div className="space-y-4">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className="flex items-start gap-6 bg-card border border-cardBorder rounded-2xl p-6 md:p-8">
              <div className="flex flex-col items-center shrink-0">
                <span className="text-3xl">{s.icon}</span>
                <span className="font-display text-accent text-xl mt-1">{s.n}</span>
              </div>
              <div>
                <h3 className="font-display text-xl md:text-2xl mb-2 tracking-wide">
                  {s.title}
                </h3>
                <p className="text-muted leading-relaxed">{s.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
