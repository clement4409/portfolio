"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export function Accordion({
  items, allowNested = false,
}: { items: { q: string; a: string; sub?: { q: string; a: string }[] }[]; allowNested?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((it, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium focus-ring"
            aria-expanded={open === i}
          >
            {it.q}
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              {open === i ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <div className="px-5 pb-5 text-muted-foreground">
                  {it.a}
                  {allowNested && it.sub && <div className="mt-4"><Accordion items={it.sub} /></div>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function Tabs({ tabs }: { tabs: { label: string; content: string }[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="rounded-2xl border border-border bg-card p-2">
      <div className="flex gap-1 rounded-xl bg-muted p-1" role="tablist">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className="relative flex-1 rounded-lg px-4 py-2 text-sm font-medium focus-ring"
          >
            {active === i && <motion.span layoutId="tab-bg" className="absolute inset-0 rounded-lg bg-card shadow-sm" />}
            <span className={`relative z-10 ${active === i ? "text-primary" : "text-muted-foreground"}`}>{t.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="p-5 text-muted-foreground" role="tabpanel">
          {tabs[active].content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
