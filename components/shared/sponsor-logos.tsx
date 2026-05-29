import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps { className?: string; dark?: boolean }

// ── Real logos ─────────────────────────────────────────────────────────────────

const JosslinLogo = ({ className }: LogoProps) => (
  <Image
    src="https://www.josslin.com/images/logo.gif"
    alt="Josslin Insurance"
    width={200} height={80}
    className={cn("object-contain", className)}
    unoptimized
  />
);

const CityWaterlooLogo = ({ className }: LogoProps) => (
  <Image
    src="https://www.waterloo.ca/media/ru3j1vya/waterloo_logo_4c.svg"
    alt="City of Waterloo"
    width={200} height={80}
    className={cn("object-contain", className)}
    unoptimized
  />
);

const CityKitchenerLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="City of Kitchener" role="img">
    <defs>
      <linearGradient id="kit-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00A9CE" />
        <stop offset="100%" stopColor="#0077A8" />
      </linearGradient>
    </defs>
    {/* Teal K badge */}
    <rect x="0" y="5" width="62" height="70" rx="10" fill="url(#kit-grad)" />
    {/* K letterform */}
    <rect x="16" y="18" width="7" height="44" rx="2" fill="white" />
    <polygon points="23,40 44,18 54,18 33,40 54,62 44,62" fill="white" />
    {/* Right text */}
    <text x="74" y="26" fontFamily="Arial,sans-serif" fontWeight="400" fontSize="11" fill="#00A9CE" letterSpacing="2">THE CITY OF</text>
    <text x="74" y="56" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="26" fill="#00A9CE" letterSpacing="0.5">Kitchener</text>
    {/* Teal underline */}
    <rect x="74" y="62" width="162" height="3" rx="1.5" fill="#00A9CE" opacity="0.4" />
  </svg>
);

// ── Full-color custom SVG logos ───────────────────────────────────────────────

const PersonalEdgeLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 260 90" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Personal Edge Training" role="img">
    <defs>
      <linearGradient id="pet-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF5500" />
        <stop offset="100%" stopColor="#FF8C00" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="82" height="90" rx="10" fill="url(#pet-bg)" />
    {/* Lightning bolt */}
    <polygon points="53,8 36,45 49,45 28,82 60,36 46,36" fill="white" />
    <text x="94" y="32" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="18" fill="#FF5500">PERSONAL</text>
    <text x="94" y="56" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="18" fill="#1A1A1A">EDGE</text>
    <rect x="94" y="62" width="158" height="3" rx="1.5" fill="#FF5500" />
    <text x="94" y="78" fontFamily="Arial,sans-serif" fontWeight="600" fontSize="11" fill="#777" letterSpacing="2.5">TRAINING</text>
  </svg>
);

const WoodHallLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 260 90" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Wood-Hall Logistics" role="img">
    <defs>
      <linearGradient id="wh-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0D2B6E" />
        <stop offset="100%" stopColor="#1A4DAF" />
      </linearGradient>
    </defs>
    <rect x="0" y="5" width="80" height="80" rx="10" fill="url(#wh-bg)" />
    {/* Stylised truck */}
    <rect x="10" y="32" width="38" height="24" rx="3" fill="white" opacity="0.95" />
    <path d="M48,36 L65,36 L72,46 L72,56 L48,56 Z" fill="white" opacity="0.95" />
    <rect x="10" y="56" width="62" height="5" rx="2" fill="#F5A623" />
    <circle cx="22" cy="63" r="5" fill="#F5A623" /><circle cx="22" cy="63" r="2.5" fill="#0D2B6E" />
    <circle cx="60" cy="63" r="5" fill="#F5A623" /><circle cx="60" cy="63" r="2.5" fill="#0D2B6E" />
    {/* Text */}
    <text x="92" y="34" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="17" fill="#0D2B6E">WOOD-HALL</text>
    <text x="92" y="54" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="12" fill="#F5A623" letterSpacing="2">LOGISTICS INC.</text>
    <text x="92" y="72" fontFamily="Arial,sans-serif" fontSize="10" fill="#888" letterSpacing="1.5">WATERLOO REGION, ON</text>
  </svg>
);

const FallsRoadLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 260 90" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Fall's Road Pub" role="img">
    <defs>
      <linearGradient id="fr-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1B5E20" />
        <stop offset="100%" stopColor="#388E3C" />
      </linearGradient>
    </defs>
    {/* Green tile */}
    <rect x="0" y="0" width="88" height="90" rx="12" fill="url(#fr-bg)" />
    <rect x="5" y="5" width="78" height="80" rx="9" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.8" />
    {/* Shamrock */}
    <circle cx="44" cy="30" r="10" fill="#66BB6A" />
    <circle cx="33" cy="38" r="10" fill="#66BB6A" />
    <circle cx="55" cy="38" r="10" fill="#66BB6A" />
    <circle cx="44" cy="30" r="7" fill="#81C784" />
    <circle cx="33" cy="38" r="7" fill="#81C784" />
    <circle cx="55" cy="38" r="7" fill="#81C784" />
    <rect x="42" y="46" width="4" height="14" rx="2" fill="#66BB6A" />
    {/* Gold name bar */}
    <rect x="6" y="62" width="76" height="22" rx="5" fill="#D4AF37" />
    <text x="44" y="77" fontFamily="Georgia,serif" fontWeight="700" fontSize="10" fill="#1B5E20" textAnchor="middle" letterSpacing="0.8">FALL&apos;S ROAD PUB</text>
    {/* Right text */}
    <text x="102" y="35" fontFamily="Georgia,serif" fontWeight="700" fontSize="24" fill="#1B5E20">FALL&apos;S</text>
    <text x="102" y="62" fontFamily="Georgia,serif" fontWeight="700" fontSize="24" fill="#1B5E20">ROAD</text>
    <rect x="102" y="68" width="148" height="3" rx="1.5" fill="#D4AF37" />
    <text x="102" y="84" fontFamily="Georgia,serif" fontSize="15" fill="#D4AF37" letterSpacing="6">PUB</text>
  </svg>
);

const ImpactCanopyLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 260 90" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Impact Canopy" role="img">
    <defs>
      <linearGradient id="ic-sky" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0277BD" />
        <stop offset="100%" stopColor="#0288D1" />
      </linearGradient>
      <linearGradient id="ic-orange" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#E65100" />
        <stop offset="100%" stopColor="#FF6D00" />
      </linearGradient>
    </defs>
    {/* Canopy / tent icon */}
    <rect x="0" y="0" width="88" height="90" rx="10" fill="url(#ic-sky)" />
    {/* Tent shape */}
    <path d="M44,12 L80,58 L8,58 Z" fill="url(#ic-orange)" />
    <path d="M44,12 L62,58 L26,58 Z" fill="#FF8A50" opacity="0.7" />
    {/* Tent legs */}
    <rect x="14" y="58" width="4" height="22" rx="2" fill="white" opacity="0.8" />
    <rect x="70" y="58" width="4" height="22" rx="2" fill="white" opacity="0.8" />
    <rect x="8" y="58" width="72" height="4" rx="2" fill="#FF8A50" />
    {/* Ground line */}
    <rect x="4" y="80" width="80" height="2" rx="1" fill="white" opacity="0.3" />
    {/* Right text */}
    <text x="100" y="30" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="19" fill="#0277BD">IMPACT</text>
    <rect x="100" y="36" width="152" height="4" rx="2" fill="url(#ic-orange)" />
    <text x="100" y="58" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="19" fill="#E65100">CANOPY</text>
    <text x="100" y="76" fontFamily="Arial,sans-serif" fontSize="10" fill="#888" letterSpacing="1.5">CUSTOM EVENT CANOPIES</text>
  </svg>
);

const KidspiredLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 260 90" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Kidspired" role="img">
    <defs>
      <linearGradient id="ki-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0277BD" />
        <stop offset="100%" stopColor="#01579B" />
      </linearGradient>
      <linearGradient id="ki-star" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD600" />
        <stop offset="100%" stopColor="#FF9800" />
      </linearGradient>
    </defs>
    {/* Blue circle */}
    <circle cx="44" cy="45" r="43" fill="url(#ki-bg)" />
    {/* Star */}
    <polygon points="44,6 48,28 68,20 56,36 76,44 56,52 68,68 48,60 44,82 40,60 20,68 32,52 12,44 32,36 20,20 40,28" fill="url(#ki-star)" />
    {/* K letter */}
    <text x="44" y="55" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="26" fill="white" textAnchor="middle">K</text>
    {/* Text */}
    <text x="98" y="38" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="26" fill="#0277BD">KIDS</text>
    <text x="160" y="38" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="26" fill="#FF9800">pired</text>
    <line x1="98" y1="46" x2="252" y2="46" stroke="#0277BD" strokeWidth="2" opacity="0.25" />
    <text x="98" y="64" fontFamily="Arial,sans-serif" fontWeight="600" fontSize="11" fill="#555" letterSpacing="2">MINOR SPORTS MEDIA</text>
    {/* Coloured dots */}
    <circle cx="100" cy="78" r="4.5" fill="#FF9800" />
    <circle cx="115" cy="78" r="4.5" fill="#0277BD" />
    <circle cx="130" cy="78" r="4.5" fill="#4CAF50" />
    <circle cx="145" cy="78" r="4.5" fill="#E91E63" />
    <circle cx="160" cy="78" r="4.5" fill="#9C27B0" />
  </svg>
);

const BarbarianLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 260 90" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Barbarian Rugby" role="img">
    <defs>
      <linearGradient id="barb-bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1A1A2E" />
        <stop offset="100%" stopColor="#16213E" />
      </linearGradient>
      <linearGradient id="barb-red" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C62828" />
        <stop offset="100%" stopColor="#E53935" />
      </linearGradient>
    </defs>
    {/* Dark shield */}
    <path d="M44,4 L82,4 L82,52 Q82,78 44,88 Q6,78 6,52 L6,4 Z" fill="url(#barb-bg)" />
    {/* Red diagonal stripe */}
    <path d="M6,28 L82,28 L82,44 L6,44 Z" fill="url(#barb-red)" clipPath="url(#shield-clip)" />
    <clipPath id="shield-clip">
      <path d="M44,4 L82,4 L82,52 Q82,78 44,88 Q6,78 6,52 L6,4 Z" />
    </clipPath>
    {/* B monogram */}
    <text x="44" y="60" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="32" fill="white" textAnchor="middle" opacity="0.15">B</text>
    <text x="44" y="58" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="24" fill="white" textAnchor="middle">BAR</text>
    {/* Right text */}
    <text x="96" y="30" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="22" fill="#1A1A2E">BARBARIAN</text>
    <rect x="96" y="36" width="156" height="4" rx="2" fill="url(#barb-red)" />
    <text x="96" y="58" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="15" fill="#C62828" letterSpacing="4">RUGBY</text>
    <text x="96" y="76" fontFamily="Arial,sans-serif" fontSize="10" fill="#888" letterSpacing="2">OFFICIAL KIT SPONSOR</text>
  </svg>
);

const DominosLogo = ({ className }: LogoProps) => (
  <svg viewBox="0 0 240 90" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Domino's Pizza" role="img">
    <defs>
      <linearGradient id="dom-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#006491" />
        <stop offset="100%" stopColor="#004B6E" />
      </linearGradient>
    </defs>
    {/* Domino tile */}
    <rect x="2" y="5" width="52" height="82" rx="8" fill="url(#dom-blue)" />
    <line x1="2" y1="46" x2="54" y2="46" stroke="white" strokeWidth="2" opacity="0.45" />
    {/* Top: 2 dots */}
    <circle cx="17" cy="26" r="6" fill="white" />
    <circle cx="39" cy="26" r="6" fill="white" />
    {/* Bottom: 1 dot */}
    <circle cx="28" cy="66" r="6" fill="white" />
    {/* DOMINO'S */}
    <text x="66" y="36" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="21" fill="#006491">DOMINO&apos;S</text>
    {/* Red stripe */}
    <rect x="66" y="42" width="168" height="5" rx="2.5" fill="#E31837" />
    {/* PIZZA */}
    <text x="66" y="68" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="16" fill="#E31837" letterSpacing="5">PIZZA</text>
    <text x="66" y="84" fontFamily="Arial,sans-serif" fontSize="9" fill="#aaa" letterSpacing="1.5">EST. 1960</text>
  </svg>
);

// ── Lookup map ─────────────────────────────────────────────────────────────────

type LogoComponent = React.ComponentType<LogoProps>;

const LOGO_MAP: Record<string, LogoComponent> = {
  "Josslin Insurance":      JosslinLogo,
  "Personal Edge Training": PersonalEdgeLogo,
  "Wood-Hall Logistics":    WoodHallLogo,
  "Fall's Road Pub":        FallsRoadLogo,
  "Impact Canopy":          ImpactCanopyLogo,
  "Kidspired":              KidspiredLogo,
  "Barbarian Rugby":        BarbarianLogo,
  "Domino's":               DominosLogo,
  "City of Waterloo":       CityWaterlooLogo,
  "City of Kitchener":      CityKitchenerLogo,
};

export function SponsorLogo({ name, className, dark }: { name: string; className?: string; dark?: boolean }) {
  const Logo = LOGO_MAP[name];
  if (Logo) {
    return <Logo className={cn("h-12 w-auto max-w-50", className)} dark={dark} />;
  }
  return (
    <div className={cn("flex items-center justify-center px-4 py-2 rounded font-bold text-sm bg-linear-to-r from-navy to-navy-mid text-gold", className)}>
      {name}
    </div>
  );
}
