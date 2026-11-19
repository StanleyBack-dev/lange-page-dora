import {
  BellRing,
  Building2,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  FileText,
  HandCoins,
  Landmark,
  LayoutDashboard,
  Lock,
  Megaphone,
  Package,
  Plug,
  QrCode,
  Receipt,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Ticket,
  UserCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

// Texts of the landing page. Only what the app really does today goes in
// FEATURES; what is planned goes in ROADMAP.

export const NAV_LINKS = [
  { id: "recursos", label: "Recursos" },
  { id: "demonstracao", label: "Demonstração" },
  { id: "como-funciona", label: "Como funciona" },
  { id: "em-breve", label: "Em breve" },
  { id: "perguntas", label: "Dúvidas" },
] as const;

export const MARQUEE_ITEMS = [
  "Reserva de áreas comuns",
  "Portaria com QR code",
  "Eventos com ingressos",
  "Comunicados com push",
  "Pix do condomínio",
  "Convites para visitantes",
  "Cadastro por link",
  "Gestão de moradores",
  "Funciona no celular",
];

export const PAINS = [
  "Reservas anotadas em caderno e conflitos de horário no salão de festas",
  "Grupos de WhatsApp lotados, onde o comunicado importante se perde",
  "Portaria sem saber quem é convidado de quem",
  "Planilhas, papéis e cobranças de taxa de uso feitas à mão",
];

export const GAINS = [
  "Agenda online com regras, aprovação e bloqueios por espaço",
  "Comunicados oficiais com notificação no celular de cada morador",
  "Convites com QR code conferidos pela portaria em segundos",
  "Tudo registrado, com histórico e acesso por perfil",
];

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
};

export const FEATURES: Feature[] = [
  {
    icon: CalendarCheck,
    title: "Reservas de áreas comuns",
    description:
      "Salão de festas, churrasqueira, quadra e academia com agenda online e regras claras.",
    points: [
      "Horários, antecedência e limites por espaço",
      "Aprovação pela administração quando precisar",
      "Taxa de uso e bloqueios para manutenção",
    ],
  },
  {
    icon: QrCode,
    title: "Portaria digital",
    description:
      "Convidados chegam com QR code e a portaria confere tudo em um só lugar.",
    points: [
      "Lista de convidados do dia",
      "Leitura do QR code pela câmera",
      "Registro de entrada com horário",
    ],
  },
  {
    icon: Ticket,
    title: "Eventos e ingressos",
    description:
      "Festas juninas, confraternizações e eventos com venda de ingressos via Pix.",
    points: [
      "Ingressos por faixa de idade e meia-entrada",
      "Comprovante de Pix revisado pela gestão",
      "Ingresso com QR code na entrada",
    ],
  },
  {
    icon: Megaphone,
    title: "Comunicados e avisos",
    description:
      "Comunicados oficiais que chegam de verdade, sem se perder em grupos.",
    points: [
      "Notificações push no celular",
      "Envio para todo o condomínio ou por bloco",
      "Histórico sempre disponível",
    ],
  },
  {
    icon: Users,
    title: "Moradores e unidades",
    description:
      "Cadastro de moradores, dependentes e equipe com permissões por perfil.",
    points: [
      "Cadastro por link de convite",
      "Aprovação pela administração",
      "Blocos, unidades e dependentes",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Painel do síndico",
    description:
      "Uma visão do condomínio para decidir rápido: reservas, eventos e pendências.",
    points: [
      "Pendências em destaque",
      "Histórico e trilha de auditoria",
      "Vários condomínios em uma conta",
    ],
  },
];

export const STEPS = [
  {
    title: "Fale com a gente",
    description:
      "Conte como funciona o seu condomínio. Mostramos o Dora e tiramos todas as dúvidas.",
  },
  {
    title: "Configuramos juntos",
    description:
      "Cadastramos espaços, regras e blocos, e geramos o link de cadastro dos moradores.",
  },
  {
    title: "Moradores entram pelo link",
    description:
      "Cada morador se cadastra pelo celular e a administração aprova em um clique.",
  },
  {
    title: "Condomínio organizado",
    description:
      "Reservas, portaria, eventos e comunicados funcionando no mesmo app.",
  },
];

export const AUDIENCES = [
  {
    icon: Building2,
    title: "Síndicos e administradoras",
    description:
      "Menos planilha e menos mensagem fora de hora. Regras aplicadas automaticamente e tudo registrado.",
  },
  {
    icon: Smartphone,
    title: "Moradores",
    description:
      "Reserve, convide, compre ingressos e receba avisos do condomínio direto no celular.",
  },
  {
    icon: UserCheck,
    title: "Portaria e equipe",
    description:
      "Lista de convidados do dia e leitura de QR code. Entrada mais rápida e mais segura.",
  },
];

export const ROADMAP = [
  {
    icon: ShoppingCart,
    title: "Compras",
    description: "Pedidos, cotações e aprovações de compras do condomínio.",
  },
  {
    icon: Landmark,
    title: "Financeiro",
    description:
      "Visão financeira completa, fluxo de caixa e prestação de contas.",
  },
  {
    icon: Package,
    title: "Encomendas",
    description:
      "Registro na portaria e aviso ao morador quando a entrega chega.",
  },
  {
    icon: Receipt,
    title: "Contas a pagar e receber",
    description: "Controle de fornecedores, vencimentos e recebimentos.",
  },
  {
    icon: HandCoins,
    title: "Mensalidades do condomínio",
    description:
      "Cobrança das taxas condominiais com acompanhamento de pagamentos.",
  },
  {
    icon: Plug,
    title: "Integrações",
    description:
      "Bancos, Pix, controle de acesso e os sistemas que você já usa.",
  },
  {
    icon: ClipboardList,
    title: "Assembleias e enquetes",
    description: "Votações e enquetes online com resultado registrado.",
  },
  {
    icon: FileText,
    title: "Documentos",
    description: "Regimento, atas e documentos sempre à mão dos moradores.",
  },
];

export const TRUST_POINTS = [
  {
    icon: Smartphone,
    title: "Instala como app",
    description: "Funciona no Android, iPhone e computador, sem loja de apps.",
  },
  {
    icon: ShieldCheck,
    title: "Privacidade (LGPD)",
    description: "Cada pessoa vê só o que o seu perfil permite.",
  },
  {
    icon: Lock,
    title: "Seguro",
    description: "Acesso protegido, sessões controladas e histórico de ações.",
  },
  {
    icon: BellRing,
    title: "Notificações",
    description: "Avisos no celular para reservas, eventos e comunicados.",
  },
  {
    icon: CreditCard,
    title: "Pix do condomínio",
    description:
      "Pagamentos de ingressos e taxas direto na conta do condomínio.",
  },
  {
    icon: Zap,
    title: "Rápido de implantar",
    description: "Em poucos dias o condomínio já está usando.",
  },
];

export const FAQ = [
  {
    question: "O que é o Dora?",
    answer:
      "O Dora é um aplicativo de gestão de condomínio que reúne reserva de áreas comuns, portaria digital com QR code, eventos com ingressos, comunicados com notificação no celular e o cadastro de moradores, em um só lugar.",
  },
  {
    question: "Precisa baixar na loja de aplicativos?",
    answer:
      "Não. O Dora funciona pelo navegador e pode ser instalado na tela inicial do celular (Android e iPhone) como um app, sem passar pela loja.",
  },
  {
    question: "Como os moradores são cadastrados?",
    answer:
      "A administração gera um link de cadastro e envia aos moradores, por exemplo pelo WhatsApp. Cada morador preenche os dados pelo celular e a administração aprova.",
  },
  {
    question: "Dá para cobrar taxa de uso das áreas comuns?",
    answer:
      "Sim. Cada espaço pode ter sua taxa de uso, e eventos podem vender ingressos com pagamento via Pix para a conta do condomínio.",
  },
  {
    question: "Quanto custa?",
    answer:
      "O valor depende do tamanho do condomínio e dos módulos usados. Fale com a gente pelo formulário ou pelo WhatsApp para receber uma proposta.",
  },
  {
    question: "O Dora atende administradoras com vários condomínios?",
    answer:
      "Sim. Uma mesma conta pode gerenciar vários condomínios, cada um com seus espaços, regras, moradores e equipe.",
  },
  {
    question: "Os dados ficam seguros?",
    answer:
      "Sim. O acesso é por perfil (síndico, morador, portaria), as ações ficam registradas e seguimos a LGPD no tratamento de dados pessoais.",
  },
  {
    question: "Quais módulos estão chegando?",
    answer:
      "Estamos desenvolvendo compras, financeiro, encomendas, contas a pagar e receber, mensalidades do condomínio e integrações com bancos, Pix e controle de acesso.",
  },
];
