import {
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPython,
  SiFastapi,
  SiSqlite,
} from "react-icons/si";

import type { NavItem, Project, Skill } from "../_types/portfolioTypes";

export const TYPE_INTERVAL_MS = 74;

export const RESUME_URL =
  "https://drive.google.com/file/d/1ZMJAM3dZ4wVNtHVqgl9QcKV5IoXsLz85/view";

export const projects: Project[] = [
  {
    number: "01",
    name: "BinaryPot",
    type: "SSH Honeypot",
    description:
      "A multi-model LLM based SSH honeypot for attacker interaction and session analysis.",
    stack: ["React", "FastAPI", "Python", "SQLite", "Security"],
    image: "/projects/binarypot.png",
    liveUrl: "https://bpot-frontend.vercel.app/",
    githubUrl: "https://github.com/not-official/BinaryPot",
  },
  {
    number: "02",
    name: "Not-Chess",
    type: "C++ Chess",
    description: "A unicode-enabled, console-based chess game.",
    stack: ["C++", "OOP", "Game Logic"],
    image: "/projects/notchess.png",
    githubUrl: "https://github.com/not-official/Not-Chess",
  },
  {
    number: "03",
    name: "SavorNepal",
    type: "Recipe Platform",
    description: "A web project around Nepali food and recipes.",
    stack: ["Express", "Next.js", "PostgreSQL"],
    image: "/projects/savornepal.png",
    liveUrl: "https://sn-frontend-mocha.vercel.app/",
    githubUrl: "https://github.com/samrat-dotel/SavorNepal",
  },
];

export const skills: Skill[] = [
  {
    name: "C++",
    icon: SiCplusplus,
    rotate: "-6deg",
    y: "top-0",
    x: "left-1/2 -translate-x-[50%]",
    z: "z-[11]",
  },
  {
    name: "HTML",
    icon: SiHtml5,
    rotate: "4deg",
    y: "top-[46px]",
    x: "left-1/2 -translate-x-[42%]",
    z: "z-[10]",
  },
  {
    name: "CSS",
    icon: SiCss,
    rotate: "-3deg",
    y: "top-[92px]",
    x: "left-1/2 -translate-x-[58%]",
    z: "z-[9]",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    rotate: "5deg",
    y: "top-[138px]",
    x: "left-1/2 -translate-x-[43%]",
    z: "z-[8]",
  },
  {
    name: "React",
    icon: SiReact,
    rotate: "-4deg",
    y: "top-[184px]",
    x: "left-1/2 -translate-x-[57%]",
    z: "z-[7]",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    rotate: "3deg",
    y: "top-[230px]",
    x: "left-1/2 -translate-x-[44%]",
    z: "z-[6]",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    rotate: "-4deg",
    y: "top-[276px]",
    x: "left-1/2 -translate-x-[56%]",
    z: "z-[5]",
  },
  {
    name: "Express",
    icon: SiExpress,
    rotate: "4deg",
    y: "top-[322px]",
    x: "left-1/2 -translate-x-[45%]",
    z: "z-[4]",
  },
  {
    name: "Python",
    icon: SiPython,
    rotate: "-3deg",
    y: "top-[368px]",
    x: "left-1/2 -translate-x-[55%]",
    z: "z-[3]",
  },
  {
    name: "FastAPI",
    icon: SiFastapi,
    rotate: "4deg",
    y: "top-[414px]",
    x: "left-1/2 -translate-x-[46%]",
    z: "z-[2]",
  },
  {
    name: "SQL",
    icon: SiSqlite,
    rotate: "-3deg",
    y: "top-[460px]",
    x: "left-1/2 -translate-x-[54%]",
    z: "z-[1]",
  },
];

export const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

export const phrases: Record<string, string> = {
  A: "Aman builds systems with intent.",
  B: "BinaryPot is my final year project.",
  C: "Chess is fun only when I win.",
  D: "Damn COVID still feels like 3 years ago.",
  E: "Engineering wasn't half bad.",
  F: "Freedom is what I seek.",
  G: "Gently bullying bugs into submission.",
  H: "How fast the time flies.",
  I: "I still love her.",
  J: "Just kidding, I don't.",
  K: "Kinda genius when Wi-Fi works.",
  L: "Life happens, regardless.",
  M: "Music has my heart, code just borrows my brain.",
  N: "Not-Chess has stockfish in it.",
  O: "On my way to become great.",
  P: "Purple, my favourite color.",
  Q: "Quality over quantity, always.",
  R: "Ratatouille, also one of my favourites.",
  S: "SavorNepal is my minor project.",
  T: "True freedom is an illusion, yeah yeah.",
  U: "Umbrella by Ember Island, another favourite.",
  V: "Very calm as long as the code runs.",
  W: "Web interfaces are my playground.",
  X: "X = curiosity + code + caffeine.",
  Y: "You entered through a puzzle.",
  Z: "Zero templates. Just built work.",
};

export const navItems: NavItem[] = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Resume", RESUME_URL],
  ["Contact", "#contact"],
];