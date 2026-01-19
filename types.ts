import { LucideIcon } from "lucide-react";

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
}