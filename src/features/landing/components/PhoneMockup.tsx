import {
  BellRing,
  CalendarCheck,
  CircleCheck,
  Megaphone,
  QrCode,
  Ticket,
} from "lucide-react";
import { LogoMark } from "@/design-system/components/LogoMark";

// A drawn (not screenshotted) home screen of the app inside a phone, with
// floating cards around it. Decorative: hidden from assistive technology.
export function PhoneMockup() {
  return (
    <div
      className="relative mx-auto w-full max-w-[19rem] text-fg sm:max-w-[21rem]"
      aria-hidden
    >
      <div className="absolute -inset-10 rounded-full bg-brand/30 blur-3xl" />

      <div className="relative animate-float rounded-[2.6rem] border border-white/15 bg-chrome-top p-2.5 shadow-pop ring-1 ring-black">
        <div className="overflow-hidden rounded-[2.1rem] bg-bg">
          {/* status bar */}
          <div className="flex items-center justify-between bg-chrome px-5 pt-3 pb-2 text-[10px] font-semibold text-chrome-fg">
            <span>9:41</span>
            <span className="h-4 w-16 rounded-full bg-black" />
            <span>100%</span>
          </div>
          {/* app header */}
          <div className="bg-chrome px-4 pt-2 pb-5">
            <div className="flex items-center gap-2">
              <LogoMark className="size-7" />
              <div>
                <p className="text-[10px] text-chrome-muted">
                  Residencial Jardins
                </p>
                <p className="text-sm font-bold text-chrome-fg">
                  Olá, Marina 👋
                </p>
              </div>
              <span className="ml-auto inline-flex size-8 items-center justify-center rounded-full bg-white/10 text-chrome-fg">
                <BellRing className="size-4" />
              </span>
            </div>
          </div>

          <div className="-mt-3 space-y-3 rounded-t-3xl bg-bg px-3.5 pt-4 pb-5">
            <div className="rounded-2xl border border-success-border bg-success-soft p-3">
              <div className="flex items-center gap-2 text-[11px] font-bold text-success">
                <CircleCheck className="size-4" /> Reserva confirmada
              </div>
              <p className="mt-1 text-sm font-bold">Salão de festas</p>
              <p className="text-[11px] text-muted">Sábado · 19:00 às 23:00</p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: CalendarCheck, label: "Reservar" },
                { icon: Ticket, label: "Eventos" },
                { icon: QrCode, label: "Convites" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-surface py-3 shadow-card"
                >
                  <span className="inline-flex size-8 items-center justify-center rounded-xl bg-brand text-brand-fg">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-[10px] font-semibold">{label}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-surface p-3 shadow-card">
              <p className="text-[10px] font-bold tracking-wide text-soft uppercase">
                Próximo evento
              </p>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex size-11 flex-col items-center justify-center rounded-xl bg-chrome text-chrome-fg">
                  <span className="text-[9px] uppercase">jun</span>
                  <span className="text-sm leading-none font-bold">22</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold">Festa junina</p>
                  <p className="text-[11px] text-muted">Ingressos via Pix</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-3 shadow-card">
              <div className="flex items-center gap-2 text-[11px] font-bold">
                <Megaphone className="size-4 text-brand-ink" /> Comunicado
              </div>
              <p className="mt-1 text-[11px] leading-snug text-muted">
                Manutenção da piscina na terça, das 8h às 12h.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* floating cards */}
      <div className="absolute top-24 -left-6 hidden animate-float-slow rounded-2xl border border-border bg-surface p-3 shadow-pop sm:-left-16 sm:block">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-chrome text-brand">
            <QrCode className="size-5" />
          </span>
          <div>
            <p className="text-xs font-bold">Convidado liberado</p>
            <p className="text-[11px] text-muted">Portaria · 19:04</p>
          </div>
        </div>
      </div>

      <div className="absolute -right-4 bottom-24 hidden animate-float rounded-2xl border border-border bg-surface p-3 shadow-pop [animation-delay:1.5s] sm:-right-14 sm:block">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand text-brand-fg">
            <BellRing className="size-5" />
          </span>
          <div>
            <p className="text-xs font-bold">Novo comunicado</p>
            <p className="text-[11px] text-muted">Enviado a 248 moradores</p>
          </div>
        </div>
      </div>
    </div>
  );
}
