export function Footer() {
  return (
    <footer className="px-6 py-14 border-t border-cardBorder text-center">
      <div className="font-display text-2xl mb-2">
        AURA <span className="text-accent">FITNESS 90</span>
      </div>
      <p className="text-xs text-muted tracking-widest mb-4">
        TRANSFORMA TU CUERPO. ELEVA TU MENTE.
      </p>
      <p className="text-xs text-muted/70">
        Barcelona, España · Erick Hndz · © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
