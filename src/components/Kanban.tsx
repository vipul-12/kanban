import React, { useState } from 'react';
import styled from 'styled-components';
import Control from './Control';
import Stage from './Stage';

const StyledKanban = styled.div`
    .grid{
        display: flex;
        justify-content: center;
    }

    .column{
        flex: 1;
        padding: 1rem;        
    }
`;

export type task = {
    taskName: string,
    stage: "Backlog" | "Doing" | "Review" | "Done",
}

const stages: string[] = ['Backlog', 'Doing', 'Review', 'Done'];

type KanbanState = {
    tasks: task[],
}

const Kanban = () => {

    const [state, setState] = useState<KanbanState>({
        tasks: [
            // { taskName: "one", stage: "Backlog" },
            // { taskName: "two", stage: "Doing" },
            // { taskName: "three", stage: "Done" },
            // { taskName: "four", stage: "Review" },
        ],
    });

    const addTask = (title: string) => {
        const taskObject: task = {
            taskName: title,
            stage: "Backlog"
        };

        let newTasks: task[] = state.tasks.concat(taskObject);

        setState((state: KanbanState) => ({
            ...state,
            tasks: newTasks,
        }))
    }

    return (
        <StyledKanban>
            <h1>Kanban Board</h1>
            <Control addTask={addTask}/>
            <div className='grid'>
                {
                    stages.map((item: string, index: number) => (
                        <div className='column' key={index}><Stage title={item} tasks={state.tasks} /></div>
                    ))
                }
            </div>
        </StyledKanban>
    )
}

export default Kanban