import './Home.scss';
import reactLogo from "../../assets/react_logo.svg";
import javaLogo from "../../assets/java_logo.svg";
import databaseLogo from "../../assets/database_editor_logo.svg";
import mysqlOracleLogo from "../../assets/oracle_mysql_logo.svg";
import {Parallax, ParallaxLayer} from '@react-spring/parallax';
import {CompetenceCard} from "../../components/competence/CompetenceCard.tsx";
import {Competence, CompetenceLevel} from "../../model/Competence.ts";
import {useSortedCompetences} from "../../hooks/useSortedCompetences.tsx";
import {useInView} from "@react-spring/web";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect} from "react";
import ProjectSection from "./ProjectSection.tsx";
import {TimelineSection} from "./TimelineSection.tsx";


export function Home({ onSectionChange }) {

    const allCompetences : Competence[] = [
        {
            name: "ReactJs",
            level: CompetenceLevel.BEGINNER,
            description: "Appris en auto-didacte, je peut créer des sites simple et dynamique",
            icon_path: reactLogo
        },
        {
            name: "Java",
            level: CompetenceLevel.ADVANCED,
            description: "Commencer en auto-didacte à l'âge de 14 ans à l'aide de Minecraft et appronfondie à l'IUT, j'ai pu m'habituer au paradigme de la programmation orienté objet",
            icon_path: javaLogo
        },
        {
            name: "Conception de base de données",
            level: CompetenceLevel.INTERMEDIATE,
            description: "Appris à l'IUT, j'ai pu apprendre à concevoir des bases de données relationnelles à partir d'un cahier des charges",
            icon_path: databaseLogo
        },
        {
            name: "MySQL & Oracle",
            level: CompetenceLevel.INTERMEDIATE,
            description: "Appris à l'IUT, j'ai pu apprendre à utiliser les bases de données MySQL et Oracle",
            icon_path: mysqlOracleLogo
        }
    ]

    const sortedCompetences : Competence[] = useSortedCompetences(allCompetences, true)

    // Décaler la zone de détection de 100px
    const [headerSection, headerSectionInView] = useInView();
    const [competenceSection, competenceSectionInView] = useInView({rootMargin: "0px 0px -50% 0px"});
    const [projectSection, projectSectionInView] = useInView({rootMargin: "0px 0px -50% 0px"});

    // Pour mettre a jour le onSectionChange
    useEffect(() => {
        console.log(headerSectionInView, competenceSectionInView, projectSectionInView);
        if (projectSectionInView) onSectionChange(1);
        else if (competenceSectionInView) onSectionChange(0);
        else if (headerSectionInView) onSectionChange(-1);
    }, [headerSectionInView, competenceSectionInView, projectSectionInView]);


    return (
        <>
            {/*<Parallax pages={3} >*/}
            <section ref={headerSection} className="h-screen home__header-section">
                <div className="container mx-auto pt-[35vh]">
                {/*<ParallaxLayer offset={0} speed={0.5}  className="container mx-auto mt-[35vh]">*/}
                    <div className="grid grid-cols-1 2xl:grid-cols-2 grid-rows-1">
                        <div className="ml-10 gap-2">
                            <h3 className="ml-0 home__header-subtitle text-3xl md:text-5xl ">Bonjour, je suis</h3>
                            <h1 className="lg:ml-12 home__header-title text-5xl md:text-7xl text-primary">Raphaël AIME</h1>
                            <h3 className="lg:ml-36 home__header-subtitle home__heaader-subtitle_2 text-3xl md:text-5xl">Développeur passionné</h3>
                        </div>
                    </div>
                {/*</ParallaxLayer> */}
                </div>
            </section>
            {/*<ParallaxLayer offset={0} speed={-0.1} className="z-[-1]">
                <button className="btn btn-square btn-primary fixed left-1/2 top-[60vh] ">
                    <FontAwesomeIcon icon={faAngleDown} size="xl" />
                </button>
            </ParallaxLayer>
            </Parallax>*/}
            <section ref={competenceSection} className="home__competence-section pb-48">
                <div className="container mx-auto">
                    <h3 className="home__title md:text-7xl text-6xl">Compétences</h3>
                    <div className="flex flex-wrap justify-evenly lg:gap-28 gap-2 gap-y-4">
                        {sortedCompetences.map((comp, index) => {
                            return <CompetenceCard comp={comp} key={index} />
                        })}
                    </div>
                </div>
            </section>
            <div className="home__transition-1 h-[20rem]" />
            <ProjectSection ref={projectSection} />
            <TimelineSection />
            <footer className="w-full h-[20rem] block">
                <div className="bg-primary h-[20rem]">
                </div>
            </footer>
        </>
    );
}
