import React, { useState } from 'react';
import styled from 'styled-components';

const StyledControl = styled.div`
  display: flex;
  flex-direction: column;
`

type ControlState = {
  createTask: string,
  selectedTask: string,
}

const Control = (props: any) => {

  const [state, setState] = useState<ControlState>({
    createTask: '',
    selectedTask: '',
  });

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state: ControlState) => ({
      ...state,
      createTask: e.target.value,
    }))
  };

  const createTaskHandler = () => {

    props.addTask(state.createTask);

    setState((state: ControlState) => ({
      ...state,
      createTask: '',
    }))
  }

  return (
    <StyledControl>
      <div>
        <input value={state.createTask} onChange={onTextChange} placeholder='Enter New Task' />
        <button onClick={createTaskHandler}>Create</button>
      </div>

      <div>
        <input value={state.selectedTask} placeholder='Selected Task' readOnly />
        <button>Move Ahead</button>
        <button>Move Back</button>
        <button>Delete</button>
      </div>
    </StyledControl>
  )
}

export default Control