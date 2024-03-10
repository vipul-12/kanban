import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { task } from './Kanban';

const StyledStage = styled.div`
`

const Stage = (props: any) => {
    return (
        <StyledStage>
            <h2>
                {props.title}
            </h2>

            <ul>
                {
                  props.tasks && props.tasks
                  .filter((task: task) => task.stage === props.title)
                  .map((task: task, index: number)=>(
                    <Task key={index} task={task} />
                  ))
                }
            </ul>
        </StyledStage>
    )
}

export default Stage