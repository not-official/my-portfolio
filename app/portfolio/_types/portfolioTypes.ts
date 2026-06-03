import type { IconType } from "react-icons";

export type Project = {
  number: string;
  name: string;
  type: string;
  description: string;
  stack: string[];
  image: string;
  liveUrl?: string;
  githubUrl: string;
};

export type Skill = {
  name: string;
  icon: IconType;
  rotate: string;
  y: string;
  x: string;
  z: string;
};

export type NavItem = [string, string];

export type WebAudioWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};