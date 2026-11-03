import { forwardRef, type ReactNode, type SVGProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Nexora icon set. One consistent language, in the spirit of SF Symbols:
 *  - 24px grid, rounded 1.75 strokes, round caps and joins
 *  - duotone: shapes marked data-duo get a soft translucent fill in the current colour
 *  - draw-in on scroll (progressive enhancement, see globals.css) and a small hover animation per icon
 * Names match lucide-react, so they are drop-in replacements.
 */

export type IconProps = Omit<SVGProps<SVGSVGElement>, "ref"> & { size?: number | string };

// shape helpers: pathLength=1 lets CSS draw every outline on, data-duo adds the soft fill
const P = (d: string, duo = false, cls?: string) => <path d={d} pathLength={1} data-duo={duo ? "" : undefined} className={cls} />;
const R = (x: number, y: number, w: number, h: number, rx: number, duo = false, cls?: string) => (
  <rect x={x} y={y} width={w} height={h} rx={rx} pathLength={1} data-duo={duo ? "" : undefined} className={cls} />
);
const C = (cx: number, cy: number, r: number, duo = false, cls?: string) => <circle cx={cx} cy={cy} r={r} pathLength={1} data-duo={duo ? "" : undefined} className={cls} />;
const E = (cx: number, cy: number, rx: number, ry: number, duo = false, cls?: string) => <ellipse cx={cx} cy={cy} rx={rx} ry={ry} pathLength={1} data-duo={duo ? "" : undefined} className={cls} />;

function make(name: string, anim: string, body: ReactNode) {
  const Icon = forwardRef<SVGSVGElement, IconProps>(({ size = 24, strokeWidth = 1.75, className, ...rest }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("ico", anim, className)}
      {...rest}
    >
      {body}
    </svg>
  ));
  Icon.displayName = name;
  return Icon;
}

/* ---------- arrows and controls ---------- */

export const X = make("X", "ico-rot90", <>{P("M6.5 6.5l11 11")}{P("M17.5 6.5l-11 11")}</>);
export const Plus = make("Plus", "ico-rot90", <>{P("M12 5v14")}{P("M5 12h14")}</>);
export const Minus = make("Minus", "", P("M5 12h14"));
export const Check = make("Check", "ico-pop", P("M5 12.5l4.5 4.5L19 7.5"));
export const ArrowRight = make("ArrowRight", "ico-nudge", <>{P("M5 12h14")}{P("M13 6l6 6-6 6")}</>);
export const ArrowUpRight = make("ArrowUpRight", "ico-upright", <>{P("M7 17L17 7")}{P("M8.5 7H17v8.5")}</>);
export const ChevronRight = make("ChevronRight", "ico-nudge", P("M9.5 5.5l6.5 6.5-6.5 6.5"));
export const ChevronLeft = make("ChevronLeft", "ico-nudge-l", P("M14.5 5.5L8 12l6.5 6.5"));
export const RotateCcw = make("RotateCcw", "ico-spin", <>{P("M4.5 12a7.5 7.5 0 107.5-7.5 7.5 7.5 0 00-5.3 2.2L4.5 9")}{P("M4.5 4.5V9H9")}</>);
export const Menu = make("Menu", "", <>{P("M4.5 7h15")}{P("M4.5 12h15", false, "ico-mid")}{P("M4.5 17h15")}</>);
export const Play = make("Play", "ico-pop", P("M8 5.5v13l11-6.5z", true));
export const Pause = make("Pause", "ico-pop", <>{R(6.8, 5, 3.4, 14, 1.4, true)}{R(13.8, 5, 3.4, 14, 1.4, true)}</>);

/* ---------- objects ---------- */

export const Sparkles = make(
  "Sparkles",
  "ico-twinkle",
  <>
    {P("M10 4l1.9 5.1L17 11l-5.1 1.9L10 18l-1.9-5.1L3 11l5.1-1.9z", true, "sp-a")}
    {P("M18.2 3l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z", true, "sp-b")}
    {P("M18.2 15.5l.55 1.45 1.45.55-1.45.55-.55 1.45-.55-1.45-1.45-.55 1.45-.55z", true, "sp-b")}
  </>,
);
export const Mail = make("Mail", "ico-float", <>{R(3.5, 5.5, 17, 13, 3.2, true)}{P("M4.5 8.2l7.5 5.4 7.5-5.4")}</>);
export const Send = make("Send", "ico-fly", <>{P("M20.5 3.5L3.5 10.2l6.6 2.6 2.7 6.7z", true)}{P("M20.5 3.5L10.1 12.8")}</>);
export const Bell = make("Bell", "ico-swing", <>{P("M6 16.5V11a6 6 0 1112 0v5.5l1.6 1.7H4.4z", true)}{P("M10 20.8a2.2 2.2 0 004 0")}</>);
export const Phone = make("Phone", "ico-ring", P("M6 3.8h2.7l1.5 3.9-1.9 1.4a11.2 11.2 0 005.6 5.6l1.4-1.9 3.9 1.5V17a2.2 2.2 0 01-2.4 2.2A15.6 15.6 0 013.8 6.2 2.2 2.2 0 016 3.8z", true));
export const MapPin = make("MapPin", "ico-drop", <>{P("M12 21s6.8-5.3 6.8-10.8a6.8 6.8 0 10-13.6 0C5.2 15.7 12 21 12 21z", true)}{C(12, 10.2, 2.4)}</>);
export const Globe = make("Globe", "ico-globe", <>{C(12, 12, 9, true)}{P("M3 12h18")}{E(12, 12, 4, 9, false, "g-m")}</>);
export const Hand = make("Hand", "ico-wave", <>{P("M7.3 12V7a1.5 1.5 0 013 0v4")}{P("M10.3 10.5V5.5a1.5 1.5 0 013 0V10.5")}{P("M13.3 10.5V6.5a1.5 1.5 0 013 0V12")}{P("M16.3 10.8V9.5a1.5 1.5 0 013 0V15a6.5 6.5 0 01-6.5 6.5h-.4a6.2 6.2 0 01-4.8-2.3L4.6 15.6a1.6 1.6 0 012.4-2L7.3 14", true)}</>);
export const MousePointer2 = make("MousePointer2", "ico-float", P("M5 3.5l14 6.4-6 2.1-2.1 6z", true));
export const ImageIcon = make("ImageIcon", "ico-pop", <>{R(3.5, 4.5, 17, 15, 3.2, true)}{C(9, 10, 1.6)}{P("M4 17l5-4.4 3.6 3 3-2.5L20 17")}</>);
export const FileText = make("FileText", "ico-float", <>{P("M7 3h7l5 5v11a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z", true)}{P("M14 3v5h5")}{P("M8.5 13h7")}{P("M8.5 17h4.5")}</>);
export const Database = make("Database", "ico-float", <>{E(12, 6, 7.5, 3, true)}{P("M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6")}{P("M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3")}</>);
export const Layers = make("Layers", "ico-layers", <>{P("M12 3.5l8.5 4.5-8.5 4.5L3.5 8z", true, "ly-t")}{P("M3.5 12.2L12 16.7l8.5-4.5", false, "ly-m")}{P("M3.5 16.2L12 20.7l8.5-4.5", false, "ly-b")}</>);
export const LayoutDashboard = make(
  "LayoutDashboard",
  "ico-pop",
  <>{R(3.5, 3.5, 7, 9, 2.2, true)}{R(13.5, 3.5, 7, 5, 2.2)}{R(13.5, 11.5, 7, 9, 2.2, true)}{R(3.5, 15.5, 7, 5, 2.2)}</>,
);
export const Users = make(
  "Users",
  "ico-float",
  <>{C(9, 8.2, 3.2, true)}{P("M3.2 19.5c0-3.2 2.6-5.3 5.8-5.3s5.8 2.1 5.8 5.3")}{P("M15.5 5.2a3.2 3.2 0 010 6")}{P("M17.2 14.5c2 .6 3.6 2.2 3.6 5")}</>,
);
export const Settings = make(
  "Settings",
  "ico-pop",
  <>{P("M4 7h9")}{P("M17 7h3")}{C(15, 7, 2, true)}{P("M4 17h3")}{P("M11 17h9")}{C(9, 17, 2, true)}</>,
);
export const Plug = make("Plug", "ico-float", <>{P("M9 3v5")}{P("M15 3v5")}{P("M6.5 8h11v3.4a5.5 5.5 0 01-11 0z", true)}{P("M12 17v4")}</>);
export const Workflow = make(
  "Workflow",
  "ico-pop",
  <>{R(3.5, 3.5, 6.5, 6.5, 2, true)}{R(14, 14, 6.5, 6.5, 2, true)}{P("M10 6.8h2.5a2.5 2.5 0 012.5 2.5V14")}</>,
);
export const Code2 = make("Code2", "ico-code", <>{P("M8.5 7L3.5 12l5 5", false, "cd-l")}{P("M15.5 7l5 5-5 5", false, "cd-r")}{P("M13.4 5.5l-2.8 13")}</>);
export const Bot = make(
  "Bot",
  "ico-blink",
  <>{R(4.5, 8, 15, 11, 4, true)}{P("M12 8V5.2")}{C(12, 4.2, 1.1)}{C(9.2, 13.2, 1, false, "bot-eye")}{C(14.8, 13.2, 1, false, "bot-eye")}{P("M2.5 12.8v2.4")}{P("M21.5 12.8v2.4")}</>,
);
// AI chip: a processor with a spark inside
export const BrainCircuit = make(
  "BrainCircuit",
  "ico-pulse",
  <>
    {R(6, 6, 12, 12, 3.4, true)}
    {P("M9.5 3v3")}{P("M14.5 3v3")}{P("M9.5 18v3")}{P("M14.5 18v3")}
    {P("M3 9.5h3")}{P("M3 14.5h3")}{P("M18 9.5h3")}{P("M18 14.5h3")}
    {P("M12 8.9l.95 2.15 2.15.95-2.15.95-.95 2.15-.95-2.15L8.9 12l2.15-.95z", false, "ai-spark")}
  </>,
);
export const Smartphone = make("Smartphone", "ico-float", <>{R(6.8, 2.5, 10.4, 19, 3, true)}{P("M10.5 5.6h3")}{P("M10.8 18.4h2.4")}</>);
