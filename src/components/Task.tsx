import React from 'react';
import styled from 'styled-components';

const StyledTask = styled.div`
`

const Task = (props: any) => {
  return (
    <StyledTask>
        <li>{props.task.taskName}</li>
    </StyledTask>
  )
}

export default Task