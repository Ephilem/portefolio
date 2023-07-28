import {TagsType} from "./TagsType.tsx";
import {Entreprise} from "./Entreprise.tsx";

export type Project = {
    title: string;
    description: string;
    tags: TagsType[];
    for: Entreprise | null;
    image: string | null;
    repo_url: string | null;
    demo_url: string | null;
}