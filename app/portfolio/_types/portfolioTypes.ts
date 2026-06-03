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
  rotate: string;
  y: string;
  x: string;
  z: string;
};

export type NavItem = [string, string];

export type WebAudioWindow = Window & {
  webkitAudioContext?: typeof AudioContext;
};