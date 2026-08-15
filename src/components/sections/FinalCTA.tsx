import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";

export function FinalCTA({ onApply }: { onApply: () => void }) {
  return (
    <section className="px-6 py-28 max-w-3xl mx-auto text-center">
      <Reveal>
        <p className="text-accent tracking-[0.3em] text-xs font-semibold mb-4">
          EL MOMENTO ES AHORA
        </p>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
          TU VIDA PUEDE SER MUY DIFERENTE EN 90 DÍAS.
        </h2>
        <p className="text-muted max-w-xl mx-auto leading-relaxed mb-10">
          Cada día que esperas es un día más lejos de quien quieres ser. La pregunta no
          es si puedes — es si estás listo para empezar.
        </p>
        <Button onClick={onApply}>INICIAR APLICACIÓN</Button>
        <p className="text-xs text-muted/70 tracking-wider mt-6">
          PROCESO DE SELECCIÓN · PLAZAS LIMITADAS · SOLO PARA COMPROMETIDOS
        </p>
      </Reveal>
    </section>
  );
}
