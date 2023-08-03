import fightForChristmas from '../assets/fight_for_christmas.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faUser} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {getHTMLTag} from "../model/TagsType.tsx";
import {Project} from "../model/Project.tsx";
import {FakeImage} from "./FakeImage.tsx";

type ProjectCardProps = {
    project: Project;
}

export function ProjectCard({project}: ProjectCardProps) {

    return (
        <div className="bg-[#373232] rounded  p-4 relative h-[250px]
                        grid grid-rows-[1fr_10fr_2fr] grid-cols-[33%_66%] gap-4">
            <div className="row-span-2 h-full w-full xl:w-[220px]  items-center justify-center flex place-items-center" >
                {project.image ?
                    <img src={fightForChristmas} /> :
                    <FakeImage text={project.title} />
                }
            </div>
            <span className="flex items-center gap-2 absolute bg-secondary text-[#171212] right-[20px] top-[-28px] font-bold p-2 text-xl" style={{fontVariant: "all-petite-caps"}}>
                {project.for ? <img src={project.for.image} className="w-6 h-6" /> : <FontAwesomeIcon icon={faUser} size="xl" />}
                {project.for ? project.for.name : "Personnel"}
            </span>
            <div className="row-span-2">
                <span className="font-bold font-[Kanit] text-2xl lg:text-3xl">{project.title}</span>
                <p className="text-sm lg:text-lg">
                    {project.description}
                </p>
            </div>
            <div className="align-center flex items-center">
                {project.repo_url ? (
                    <a className="btn btn-square" href={project.repo_url}>
                        <FontAwesomeIcon icon={faGithub} size="2xl" />
                    </a>
                ) : <div className="tooltip tooltip-error" data-tip="Le repo est privé. Il sera peut être disponible au public un jour">
                        <div className="btn btn-square btn-error after:block after:w-1 after:h-12 after:rotate-45 after:absolute after:bg-[#470000]">
                            <FontAwesomeIcon icon={faGithub} size="2xl" />
                        </div>
                    </div>}
                {project.demo_url ? (
                    <a className="ml-4 btn btn-primary btn-square">
                        <FontAwesomeIcon icon={faPlay} size="xl" />
                    </a>
                ) : null}
            </div>
            <div className="flex items-center justify-end text-black gap-x-2 flex-wrap gap-y-2">
                {project.tags.map((tag, index) => (
                    getHTMLTag(tag, index)
                ))}
            </div>
        </div>
    );
}