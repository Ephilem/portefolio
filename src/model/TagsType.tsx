import {cloneElement, ReactElement} from "react";
import {Tags} from "../components/Tags.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faJava, faReact, faPython, faDocker} from "@fortawesome/free-brands-svg-icons";
import {faCube, faHammer, faServer} from "@fortawesome/free-solid-svg-icons";


export enum TagsType {
    JAVA = "JAVA",
    SPIGOT = "SPIGOT",
    REACTJS = "REACTJS",
    WIP = "WIP",
    PYTHON = "PYTHON",
    DOCKER = "DOCKER",
    SYSADMIN = "SYSADMIN",
}

const tagsMaps = new Map<TagsType, ReactElement<any, any>> ([
    [TagsType.JAVA, <Tags tag="Java" color="#F87272" icon={<FontAwesomeIcon icon={faJava} size="lg"  />} />],
    [TagsType.REACTJS, <Tags tag="ReactJs" color="#61DAFB" icon={<FontAwesomeIcon icon={faReact} size="sm" />} />],
    [TagsType.PYTHON, <Tags tag="Python" color="#FFD63A" icon={<FontAwesomeIcon icon={faPython} size="sm" />} />],
    [TagsType.SPIGOT, <Tags tag="Spigot" color="#D47D1B" icon={<FontAwesomeIcon icon={faCube} size="sm" />} />],
    [TagsType.WIP, <Tags tag="W.I.P" color="lightgray" icon={<FontAwesomeIcon icon={faHammer} size="sm" />} />],
    [TagsType.DOCKER, <Tags tag="Docker" color="#0DB7ED" icon={<FontAwesomeIcon icon={faDocker} size="sm" />} />],
    [TagsType.SYSADMIN, <Tags tag="SysAdmin" color="#F85252" icon={<FontAwesomeIcon icon={faServer} size="sm" />} />],
])


export const getHTMLTag = (tag: TagsType, key: number) => {
    const tagElement = tagsMaps.get(tag);
    if (tagElement) return cloneElement(tagElement, { key: key });
}


