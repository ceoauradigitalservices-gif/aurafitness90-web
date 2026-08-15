import { Reveal } from "../ui/Reveal";

const problems = [
  { icon: "⚖️", label: "Sobrepeso" },
  { icon: "🧠", label: "Ansiedad" },
  { icon: "🍺", label: "Alcohol frecuente" },
  { icon: "🔥", label: "Falta de disciplina" },
  { icon: "💔", label: "Autoestima baja" },
  { icon: "⚡", label: "Falta de energía" },
  { icon: "🍔", label: "Comida basura" },
  { icon: "😞", label: "Falta de confianza" },
  { icon: "🛋️", label: "Sedentarismo" },
  { icon: "📋", label: "Desorganización" },
  { icon: "📱", label: "Exceso de redes sociales" },
  { icon: "💣", label: "Hábitos destructivos" },
];

export function Problem() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <Reveal className="text-center mb-16">
        <p className="text-accent tracking-[0.3em] text-xs font-semibold mb-4">
          EL PROBLEMA REAL
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl max-w-3xl mx-auto leading-tight">
          LA MAYORÍA NO NECESITA MÁS INFORMACIÓN.
          <br />
          NECESITA MÁS ACCIÓN.
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {problems.map((p, i) => (
          <Reveal key={p.label} delay={i * 0.04}>
            <div className="bg-card border border-cardBorder rounded-xl p-5 text-center hover:border-accent/40 transition-colors h-full">
              <div className="text-3xl mb-2">{p.icon}</div>
              <div className="text-sm text-muted">{p.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
