import { Reveal } from "../ui/Reveal";

const not = [
  "Personas que buscan milagros.",
  "Personas que no quieren esforzarse.",
  "Personas que buscan resultados rápidos sin cambiar hábitos.",
  "Personas que buscan excusas para no actuar.",
];

const yes = [
  "Personas comprometidas con su transformación.",
  "Personas responsables y con actitud.",
  "Personas dispuestas a invertir en sí mismas.",
  "Personas listas para actuar hoy.",
];

export function Filter() {
  return (
    <section className="px-6 py-24 max-w-5xl mx-auto">
      <Reveal className="text-center mb-16">
        <p className="text-accent tracking-[0.3em] text-xs font-semibold mb-4">
          FILTRO DE EXCLUSIVIDAD
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl">
          ESTE PROGRAMA NO ES PARA TODOS
        </h2>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-6">
        <Reveal>
          <div className="bg-card border border-cardBorder rounded-2xl p-8 h-full">
            <h3 className="font-display text-2xl mb-5 text-muted">NO es para ti si...</h3>
            <ul className="space-y-3">
              {not.map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <span className="text-red-400/70">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="bg-card border border-accent/30 rounded-2xl p-8 h-full">
            <h3 className="font-display text-2xl mb-5 text-accent">SÍ es para ti si...</h3>
            <ul className="space-y-3">
              {yes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-accent">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
