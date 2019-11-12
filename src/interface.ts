export interface Skill {
  level: number;
  name: string;
  name_uppercase: string;
  video: string;
  video_embed: string;
  resources: [string, string][];
  foundation: string[];
  track: string[];
  _id: string;
}

export interface SlimSkill {
  level: Skill["level"];
  name: Skill["name"];
  _id: Skill["_id"];
}

export enum Update {
  DOWNGRADE = 0,
  UPGRADE = 1
}
