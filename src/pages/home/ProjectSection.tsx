import React, { ForwardRefRenderFunction } from 'react';
import {ProjectCard} from "../../components/ProjectCard.tsx";
import {Project} from "../../model/Project.tsx";
import {TagsType} from "../../model/TagsType.tsx";

import fightForChristmasImg from "../../assets/fight_for_christmas.png";
import minecraftfrImg from "../../assets/minecraft.fr.png";

const ProjectSection: ForwardRefRenderFunction<HTMLDivElement> = (props, ref) => {

    const allProjects: Project[] = [
        {
            title: "Fight for Christmas",
            description: "Projet fait pour Minecraft.fr bénévolement, c'était une des premières mission que j'ai fait avec eux.",
            tags: [TagsType.JAVA, TagsType.SPIGOT],
            image: fightForChristmasImg,
            repo_url: null,
            demo_url: null,
            for: {name: "Minecraft.fr", image: minecraftfrImg}
        },
        {
            title: "Portfolio",
            description: "Site que vous êtes en train de visiter, il est fait en ReactJs et TailwindCSS. J'ai projet de l'améliorer pour m'améliorer dans le domaine du développement Web.",
            tags: [TagsType.REACTJS, TagsType.WIP],
            image: null,
            repo_url: null,
            demo_url: null,
            for: null
        },
        {
            title: "Overcrafted",
            description: "Mini-jeu en cours de développement. C'est le deuxième projet que j'effectue avec Minecraft.fr",
            tags: [TagsType.JAVA, TagsType.SPIGOT, TagsType.WIP],
            image: null,
            repo_url: null,
            demo_url: null,
            for: {name: "Minecraft.fr", image: minecraftfrImg}
        },
        {
            title: "PacMac",
            description: "Petit jeu fait en Python avec Pygames. C'était un projet a faire en NSI.",
            tags: [TagsType.PYTHON],
            image: null,
            repo_url: null,
            demo_url: null,
            for: null
        }
    ];

    return (
        <section>
            <div ref={ref} className="container mx-auto">
                <h3 className="home__title md:text-7xl text-6xl">Projets</h3>
                <div className="grid grid-cols-1 xl:grid-cols-[6fr_6fr] md:grid-flow-row gap-10">
                    {allProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default React.forwardRef(ProjectSection);