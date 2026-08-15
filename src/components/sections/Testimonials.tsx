import { Reveal } from "../ui/Reveal";

const testimonials = [
  {
    title: "−18KG EN 90 DÍAS",
    quote:
      "En 90 días perdí 18kg y recuperé la confianza que había perdido hacía años. No es un programa de ejercicio, es un cambio de vida.",
    name: "Carlos M.",
    meta: "32 años · Barcelona",
    initial: "C",
  },
  {
    title: "TRANSFORMACIÓN COMPLETA",
    quote:
      "Venía de años de ansiedad y malos hábitos. Aura Fitness 90 me dio estructura, disciplina y resultados reales. Erick es brutal.",
    name: "María G.",
    meta: "28 años · Madrid",
    initial: "M",
  },
  {
    title: "+12KG MÚSCULO",
    quote:
      "Probé mil programas antes. Este es el único que va al fondo del problema: la mentalidad. Los resultados físicos son consecuencia.",
    name: "David R.",
    meta: "41 años · Valencia",
    initial: "D",
  },
];

export function Testimonials() {
  return (
    <section id="casos" className="px-6 py-24 max-w-6xl mx-auto">
      <Reveal className="text-center mb-16">
        <p className="text-accent tracking-[0.3em] text-xs font-semibold mb-4">
          RESULTADOS REALES
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
          CASOS DE TRANSFORMACIÓN
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <div className="bg-card border border-cardBorder rounded-2xl p-7 h-full flex flex-col">
              <div className="font-display text-accent text-xl mb-3">{t.title}</div>
              <p className="text-muted leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full bg-accent text-background font-display flex items-center justify-center text-lg">
                  {t.initial}
                </div>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted">{t.meta}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
