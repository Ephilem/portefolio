
export enum CompetenceLevel {
    "BEGINNER" = "Novice",
    "INTERMEDIATE" = "Intermédiaire",
    "ADVANCED" = "Avancé",
    "EXPERT" = "Expert"
}

export type Competence = {
    name: string,
    description: string,
    level: CompetenceLevel,
    icon_path: string
}