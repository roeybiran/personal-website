import type { ImageMetadata } from "astro";

export interface ProjectItem {
  id: string;
  type: string;
  title: string;
  isoDate?: string;
  dateString?: string;
  stack?: string[];
  subtitle?: string;
  links?: string[];
  responsibilities?: string[];
  press?: { name: string; url: string }[];
  badgeLabel?: string;
  badgeTone?: "gray" | "yellow" | "plum" | "red";
  video?: {
    poster: ImageMetadata;
    src: string;
  };
  image?: ImageMetadata;
}
