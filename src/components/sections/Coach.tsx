import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";

export function Coach({ onApply }: { onApply: () => void }) {
  return (
    <section className="px-6 py-24 max-w-5xl mx-auto text-center">
      <Reveal>
        <p className="text-accent tracking-[0.3em] text-xs font-semibold mb-4">
          CONOCE A TU COACH
        </p>
        <h2 className="font-display text-4xl sm:text-5xl mb-6">ERICK HNDZ</h2>
        <p className="text-muted max-w-xl mx-auto leading-relaxed mb-2">
          No es solo un programa. Es un compromiso contigo mismo. Escúchalo de primera
          mano.
        </p>
        <p className="text-sm text-muted/80 tracking-wide mb-10">
          PREPARADOR FÍSICO · COACH DE TRANSFORMACIÓN
        </p>
        <Button onClick={onApply}>QUIERO ENTRENAR CON ÉL</Button>
      </Reveal>
    </section>
  );
}
