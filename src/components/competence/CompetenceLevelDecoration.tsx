import './CompetenceCard.scss';
import {CompetenceLevel} from "../../model/Competence.ts";

type CompetenceLevelProps = {
    level: CompetenceLevel;
    cardRotation: number;
}

export function CompetenceLevelDecoration({level, cardRotation} : CompetenceLevelProps) {
    let color: string | null = null;
    switch (level) {
        case CompetenceLevel.BEGINNER:
            color = 'novice';
            break;
        case CompetenceLevel.INTERMEDIATE:
            color = 'intermediate';
            break;
        case CompetenceLevel.ADVANCED:
            color = 'advanced';
            break;
        case CompetenceLevel.EXPERT:
            color = 'expert';
            break;
    }


    return (
        <div className={` flex justify-center items-center
        fixed z-[-1] w-5 lg:w-5 h-16 top-[-10px]  bg-${color}
        ${cardRotation > 90 ? 'left-[15px] h-[106%]' : `right-[15px] h-16 after:block after:top-10 after:absolute after:w-8 lg:after:w-8 lg:after:h-8 after:h-8 after:rotate-45 after:bg-[#171212]`}`}>
            {cardRotation > 270 ? <div style={{fontVariant: "all-petite-caps"}} className="h-[75px] text-center rotate-[-90deg] text-4xl lg:text-4xl lg:ml-7 ml-7 after:inline-block font-bold font-[Kanit] text-[#171212]">{level}</div> : <></>}
        </div>
    );
}