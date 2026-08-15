import { Reveal } from "../ui/Reveal";

const items = [
  { icon: "🏋️", title: "Entrenamiento Personalizado", desc: "Rutinas diseñadas exactamente para tu cuerpo, nivel y objetivos." },
  { icon: "🥗", title: "Nutrición Adaptada", desc: "No dietas genéricas. Un plan nutricional que encaja en tu vida real." },
  { icon: "🧠", title: "Mentalidad y Hábitos", desc: "Trabajamos tu psicología del cambio para que los resultados sean permanentes." },
  { icon: "📊", title: "Seguimiento Constante", desc: "No estás solo. Tienes soporte real durante los 90 días completos." },
  { icon: "✅", title: "Check-ins Semanales", desc: "Revisamos tu progreso, ajustamos el plan y resolvemos bloqueos." },
  { icon: "🔄", title: "Ajustes Semanales", desc: "El plan evoluciona contigo para maximizar tus resultados en cada etapa." },
  { icon: "📚", title: "Guías Prácticas", desc: "Material exclusivo de entrenamiento, nutrición y hábitos de alto rendimiento." },
  { icon: "💬", title: "Acceso Directo al Coach", desc: "Línea directa con Erick para consultas, dudas y motivación cuando más lo necesitas." },
];

export function Includes() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <Reveal className="text-center mb-16">
        <p className="text-accent tracking-[0.3em] text-xs font-semibold mb-4">
          TODO INCLUIDO
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
          QUÉ INCLUYE EL PROGRAMA
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.06}>
            <div className="bg-card border border-cardBorder rounded-xl p-6 h-full hover:border-accent/40 transition-colors">
              <div className="text-3xl mb-3">{it.icon}</div>
              <h3 className="font-display text-lg mb-2 tracking-wide">{it.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{it.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
