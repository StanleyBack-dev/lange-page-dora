import {
  CalendarCheck,
  CalendarDays,
  House,
  QrCode,
  Ticket,
  TicketCheck,
  Trees,
  Users,
  type LucideIcon,
} from "lucide-react";

// Real screens of the app (public/demo, demo data of a sample condominium;
// personal documents blurred) shown in the interactive demo.

export type DemoScreen = {
  /** Analytics name: "demo_step:<profile>:<id>". */
  id: string;
  icon: LucideIcon;
  label: string;
  caption: string;
  image: string;
  alt: string;
};

export type DemoProfile = {
  id: "gestao" | "morador";
  label: string;
  screens: DemoScreen[];
};

export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: "gestao",
    label: "Síndico e gestão",
    screens: [
      {
        id: "inicio",
        icon: House,
        label: "Visão geral",
        caption:
          "O síndico vê o condomínio de relance: o que precisa de atenção, reservas para aprovar e cadastros.",
        image: "/demo/gestao-inicio.webp",
        alt: "Tela inicial do Dora para o gestor do condomínio",
      },
      {
        id: "reservas",
        icon: CalendarCheck,
        label: "Aprovar reservas",
        caption:
          "Todas as reservas do condomínio em uma lista, com filtros, taxa de uso e aprovação em um toque.",
        image: "/demo/gestao-reservas.webp",
        alt: "Lista de reservas do condomínio aguardando aprovação",
      },
      {
        id: "portaria",
        icon: QrCode,
        label: "Portaria",
        caption:
          "Os convidados do dia em uma lista. A portaria confere o código ou o QR e libera a entrada.",
        image: "/demo/gestao-portaria.webp",
        alt: "Tela da portaria com os convidados do dia",
      },
      {
        id: "espacos",
        icon: Trees,
        label: "Espaços",
        caption:
          "Cada espaço com fotos, horários e regras de reserva: churrasqueira, salão, quadras e mais.",
        image: "/demo/gestao-espacos.webp",
        alt: "Cadastro dos espaços do condomínio com fotos",
      },
      {
        id: "eventos",
        icon: Ticket,
        label: "Eventos",
        caption:
          "Eventos com vagas, inscrições e ingressos, e os pedidos acompanhados pela gestão.",
        image: "/demo/gestao-eventos.webp",
        alt: "Evento do condomínio com ingressos e pedidos",
      },
      {
        id: "moradores",
        icon: Users,
        label: "Moradores",
        caption:
          "Moradores por unidade, com contato e acesso, além da equipe com cargo e permissões.",
        image: "/demo/gestao-moradores.webp",
        alt: "Lista de moradores do condomínio por unidade",
      },
    ],
  },
  {
    id: "morador",
    label: "Morador",
    screens: [
      {
        id: "reservar",
        icon: CalendarDays,
        label: "Reservar",
        caption:
          "O morador escolhe o dia e o horário livre. A reserva é confirmada na hora, seguindo as regras.",
        image: "/demo/morador-reservar.webp",
        alt: "Calendário de reserva de um espaço com horários livres e reservados",
      },
      {
        id: "reservas",
        icon: CalendarCheck,
        label: "Minhas reservas",
        caption:
          "Reservas próximas e passadas, com os convidados de cada uma e cancelamento pelo app.",
        image: "/demo/morador-reservas.webp",
        alt: "Reservas do morador com convidados e opção de cancelar",
      },
      {
        id: "eventos",
        icon: Ticket,
        label: "Eventos",
        caption:
          "Os eventos do condomínio em um só lugar: festas, torneios e encontros.",
        image: "/demo/morador-eventos.webp",
        alt: "Lista de eventos do condomínio",
      },
      {
        id: "ingressos",
        icon: TicketCheck,
        label: "Ingressos",
        caption:
          "Pagamento conferido, cada pessoa recebe o próprio ingresso com QR para mostrar na portaria.",
        image: "/demo/morador-ingressos.webp",
        alt: "Pedido confirmado com um ingresso para cada pessoa",
      },
    ],
  },
];
