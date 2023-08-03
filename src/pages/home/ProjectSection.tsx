import React, { ForwardRefRenderFunction } from 'react';
import {ProjectCard} from "../../components/ProjectCard.tsx";
import {Project} from "../../model/Project.tsx";

import {useProjectData} from "../../DataHooks.tsx";

const ProjectSection: ForwardRefRenderFunction<HTMLDivElement> = (_, ref) => {

    const allProjects: Project[] = useProjectData();

    return (
        <section id="projects">
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