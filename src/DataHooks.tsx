import { Competence, CompetenceLevel } from "./model/Competence.ts";
import { TagsType } from "./model/TagsType.tsx";
import { Project } from "./model/Project.tsx";
import {useEffect, useState} from "react";

async function fetchDataFile() {
    const response = await fetch('/data.json');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export function useCompetenceData() {
    const [competences, setCompetences] = useState<Competence[]>([]);
    useEffect(() => {
        fetchDataFile().then(dataFile => {
            const mappedCompetences = (dataFile.competences as Competence[]).map(competence => ({
                ...competence,
                icon_path: "./competencesIcon/" + competence.icon_path,
                level: CompetenceLevel[(competence.level as unknown) as keyof typeof CompetenceLevel],
            }));
            setCompetences(mappedCompetences);
        });
    }, []);
    return competences;
}

export function useExperienceData() {
    const [experiences, setExperiences] = useState([]);
    useEffect(() => {
        fetchDataFile().then(dataFile => {
            setExperiences(dataFile.experiences);
        });
    }, []);
    return experiences;
}

export function useProjectData() {
    const [projects, setProjects] = useState<Project[]>([]);
    useEffect(() => {
        fetchDataFile().then(dataFile => {
            const mappedProjects = (dataFile.projects as Project[]).map(project => ({
                ...project,
                image: project.image != null ? "./projectsImg/" + project.image : null,
                tags: project.tags.map(tag => TagsType[tag as keyof typeof TagsType]),
                for: project.for ? {...project.for, image: "./projectsImg/" + project.for.image} : null
            }));
            setProjects(mappedProjects);
        });
    }, []);
    return projects;
}