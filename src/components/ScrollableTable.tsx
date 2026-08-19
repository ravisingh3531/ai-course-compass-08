import * as React from "react";

/**
 * ScrollableTable
 * Wraps wide tables so they scroll horizontally on small screens.
 * Shows a right-edge fade + "swipe →" hint that appears only when the
 * table overflows and disappears once the user has scrolled to the end.
 */
export function ScrollableTable({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = React.useState(false);
  const [atEnd, setAtEnd] = React.useState(false);

  const check = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isOverflowing = el.scrollWidth - el.clientWidth > 8;
    setOverflows(isOverflowing);
    setAtEnd(isOverflowing && el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  React.useEffect(() => {
    check();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    ro.observe(el.querySelector("table") ?? el);
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [check]);

  return (
    <div className={`mt-6 -mx-1 ${className}`}>
      <div className="relative">
        <div
          ref={scrollRef}
          className="overflow-x-auto pb-2"
          onScroll={check}
        >
          {children}
        </div>
        {/* Right-edge fade */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 w-10 transition-opacity duration-300 ${
            overflows && !atEnd
              ? "opacity-100"
              : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to left, var(--color-card, #ffffff) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>
      {/* Swipe hint */}
      {overflows && !atEnd && (
        <div className="mt-1 flex items-center justify-end gap-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground md:hidden">
          <span>swipe</span>
          <span aria-hidden="true">→</span>
        </div>
      )}
    </div>
  );
}
