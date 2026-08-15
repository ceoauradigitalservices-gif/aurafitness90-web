import { Reveal } from "../ui/Reveal";

const pillars = [
  {
    icon: "💪",
    title: "CUERPO",
    items: ["Más fuerte", "Más atlético", "Más saludable"],
  },
  {
    icon: "🧠",
    title: "MENTE",
    items: ["Más disciplinado", "Más seguro", "Más enfocado"],
  },
  {
    icon: "🚀",
    title: "VIDA",
    items: ["Mejores hábitos", "Mayor energía", "Más confianza"],
  },
];

export function Identity() {
  return (
    <section className="px-6 py-24 max-w-6xl mx-auto">
      <Reveal className="text-center mb-16">
        <p className="text-accent tracking-[0.3em] text-xs font-semibold mb-4">
          TU NUEVA IDENTIDAD
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
          QUIÉN TE CONVIERTES EN 90 DÍAS
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <div className="bg-card border border-cardBorder rounded-2xl p-8 text-center h-full">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="font-display text-2xl mb-4 text-accent">{p.title}</h3>
              <ul className="space-y-2 text-muted">
                {p.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
