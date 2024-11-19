export interface Stage {
  id: number;
  title: string;
  description: string;
  icon: string;
  subsections: Subsection[];
}

export interface Subsection {
  id: number;
  title: string;
  prompt: string;
}

export interface Reflection {
  id: string;
  stageId: number;
  subsectionId: number;
  content: string;
  date: string;
}

export interface StageProgress {
  completedSubsections: number;
  totalSubsections: number;
  percentage: number;
}