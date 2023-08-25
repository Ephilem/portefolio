import './Home.scss';
import {CompetenceCard} from "../../components/competence/CompetenceCard.tsx";
import {Competence} from "../../model/Competence.ts";
import {useSortedCompetences} from "../../hooks/useSortedCompetences.tsx";
import {useInView} from "@react-spring/web";
import {useEffect} from "react";
import ProjectSection from "./ProjectSection.tsx";
import TimelineSection from "./TimelineSection.tsx";
import ContactSection from "./ContactSection.tsx";
import {useCompetenceData} from "../../DataHooks.tsx";

type HomeProps = {
    onSectionChange: (sectionIndex: number) => void;
}

export function Home({ onSectionChange}: HomeProps) {

    const allCompetences: Competence[] = useCompetenceData();
    const sortedCompetences : Competence[] = useSortedCompetences(allCompetences, true);


    // Décaler la zone de détection de 100px
    const [headerSection, headerSectionInView] = useInView();
    const [competenceSection, competenceSectionInView] = useInView({rootMargin: "0px 0px -50% 0px"});
    const [projectSection, projectSectionInView] = useInView({rootMargin: "0px 0px -50% 0px"});
    const [timelineSection, timelineSectionInView] = useInView({rootMargin: "0px 0px -50% 0px"});
    const [contactSection, contactSectionInView] = useInView({rootMargin: "0px 0px -20% 0px"});

    // Pour mettre a jour le onSectionChange
    useEffect(() => {
        if (contactSectionInView) onSectionChange(3);
        else if (timelineSectionInView) onSectionChange(2);
        else if (projectSectionInView) onSectionChange(1);
        else if (competenceSectionInView) onSectionChange(0);
        else if (headerSectionInView) onSectionChange(-1);
    }, [headerSectionInView, competenceSectionInView, projectSectionInView, timelineSectionInView, contactSectionInView]);


    return (
        <>
            <section ref={headerSection} className="h-screen home__header-section">
                <div className="container mx-auto pt-[35vh]">
                    <div className="grid grid-cols-1 1xl:grid-cols-2 grid-rows-1">
                        <div className="ml-10 gap-2">
                            <h3 className="ml-0 home__header-subtitle text-3xl md:text-5xl ">Bonjour, je suis</h3>
                            <h1 className="lg:ml-12 home__header-title text-5xl md:text-7xl text-primary">Raphaël AIMÉ</h1>
                            <h3 className="lg:ml-36 home__header-subtitle home__heaader-subtitle_2 text-3xl md:text-5xl">Développeur passionné</h3>
                        </div>
                    </div>
                </div>
            </section>
            <section ref={competenceSection} id="competence" className="home__competence-section pb-12">
                <div className="container mx-auto">
                    <h3 className="home__title md:text-7xl text-6xl">Compétences</h3>
                    {/*className="flex flex-wrap justify-center lg:gap-28 gap-2 gap-y-4"*/}
                    <div className='mx-auto place-items-center'>
                        <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:gap-20 gap-4 w-[]'>
                            {sortedCompetences.map((comp, index) => {
                                return <div className='flex justify-center'><CompetenceCard comp={comp} key={index} isFirst={index === 0} /></div>
                            })}
                        </div>
                    </div>
                </div>
            </section>
            <div className="home__transition-1 h-[20rem]" />
            <ProjectSection ref={projectSection} />
            <TimelineSection ref={timelineSection} />
            <ContactSection ref={contactSection} />
            <footer className="w-full block ">
                <div className="bg-[rgb(5,5,5)] h-[2rem] flex items-center justify-center text-white text-[10px]">
                    Fait avec <span className="text-red-500 ml-1 mr-1"> ♥ </span> par Raphaël AIME
                </div>
            </footer>
        </>
    );
}
