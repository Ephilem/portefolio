import {useState, useEffect, useMemo} from 'react';
import { Competence, CompetenceLevel } from '../model/Competence';

type UseSortedCompetencesInput = Competence[];
type UseSortedCompetencesOutput = Competence[];

const levelOrder: { [key in CompetenceLevel]: number } = {
    [CompetenceLevel.BEGINNER]: 1,
    [CompetenceLevel.INTERMEDIATE]: 2,
    [CompetenceLevel.ADVANCED]: 3,
    [CompetenceLevel.EXPERT]: 4,
};

export function useSortedCompetences(input: UseSortedCompetencesInput, reverse: boolean): UseSortedCompetencesOutput {

    return useMemo(() => {
        const sorted = [...input].sort((a, b) => levelOrder[a.level] - levelOrder[b.level]);
        if (reverse) sorted.reverse();
        return sorted;
    }, [input]);
}