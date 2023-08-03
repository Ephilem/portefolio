import React, {ForwardRefRenderFunction} from "react";
import {Experience} from "../../model/Experience.tsx";
import {Timeline} from "../../components/Timeline.tsx";
import {useExperienceData} from "../../DataHooks.tsx";


const TimelineSection: ForwardRefRenderFunction<HTMLDivElement> = (_, ref) => {

    const data: Experience[] = useExperienceData();

    return (
        <div id="exp" ref={ref} className="w-full">
            <h3 className="home__title md:text-7xl text-6xl mt-10 top-10">Expériences</h3>
            <Timeline data={data} />
        </div>
    );
}

export default React.forwardRef(TimelineSection)