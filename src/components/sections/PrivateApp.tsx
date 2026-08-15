import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";

const features = [
  "Dietas celiacas, diabéticas y tradicionales",
  "Scanner de comidas",
  "Calculadora de macros",
  "Entrenamientos guiados",
  "…entre muchas otras sorpresas dentro de la plataforma.",
];

export function PrivateApp({ onApply }: { onApply: () => void }) {
  return (
    <section className="px-6 py-24 max-w-4xl mx-auto text-center">
      <Reveal>
        <p className="text-accent tracking-[0.3em] text-xs font-semibold mb-4">
          ACCESO PERMANENTE
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight">
          APP WEB PRIVADA DE AURAFITNESS90
        </h2>
        <p className="text-muted max-w-2xl mx-auto leading-relaxed mb-10">
          Acceso permanente a nuestra app web privada, con una herramienta completa y
          muchas sorpresas que te ayudarán a completar tu programa y mantener tus
          resultados para siempre.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-10 text-left">
          {features.map((f) => (
            <div
              key={f}
              className="flex items-center gap-2 bg-card border border-cardBorder rounded-lg px-4 py-3 text-sm text-muted"
            >
              <span className="text-accent">✓</span>
              {f}
            </div>
          ))}
        </div>

        <Button onClick={onApply}>QUIERO ACCEDER AL PROGRAMA</Button>
      </Reveal>
    </section>
  );
}
