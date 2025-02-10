export interface TextAnalysis {
  emotionalTone: {
    primary: string;
    secondary: string;
    intensity: number;
  };
  showVsTell: {
    showing: number;
    telling: number;
  };
  characterTraits: {
    name: string;
    confidence: number;
  }[];
  suggestions: string[];
  readabilityScore: number;
  paceAnalysis: {
    score: number;
    feedback: string;
  };
}

export interface Character {
  id: string;
  name: string;
  age: string;
  background: string;
  personality: string[];
  goals: string[];
  conflicts: string[];
  relationships: Record<string, string>;
  arc: string;
}

export interface Setting {
  id: string;
  timePeriod: string;
  location: string;
  environment: string;
  mood: string;
  plotPoints: string[];
}