import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TaskObject } from "./Kanban";

const StyledControl = styled.div`
  display: flex;
  flex-direction: column;
`;

type ControlProps = {
  addTask: (title: string) => void;
  taskStageChangeHandler: (
    task: TaskObject | undefined,
    action: string
  ) => void;
  selectedTask: TaskObject | undefined;
};

type ControlState = {
  createTask: string;
  currentTask: TaskObject | undefined;
};

const Control = (props: ControlProps) => {
  const [state, setState] = useState<ControlState>({
    createTask: "",
    currentTask: undefined,
  });

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((state: ControlState) => ({
      ...state,
      createTask: e.target.value,
    }));
  };

  const createTaskHandler = () => {
    props.addTask(state.createTask);

    setState((state: ControlState) => ({
      ...state,
      createTask: "",
    }));
  };

  const onMoveAheadHandler = () => {
    console.log("inside onmove ahead")
    props.taskStageChangeHandler(state.currentTask, "moveAhead");

    setState((state: ControlState) => ({
      ...state,
      currentTask: undefined,
    }));
  };

  const onMoveBehindHandler = () => {
    props.taskStageChangeHandler(state.currentTask, "moveBehind");

    setState((state: ControlState) => ({
      ...state,
      currentTask: undefined,
    }));
  };

  const onDeleteHandler = () => {};

  useEffect(() => {
    setState((state: ControlState) => ({
      ...state,
      currentTask: props.selectedTask,
    }));
  }, [props.selectedTask]);

  return (
    <StyledControl>
      <div>
        <input
          value={state.createTask}
          onChange={onTextChange}
          placeholder="Enter New Task"
        />
        <button onClick={createTaskHandler}>Create</button>
      </div>

      <div>
        <input
          value={state.currentTask?.taskName ?? ""}
          placeholder={props.selectedTask?.taskName ?? "Selected Task"}
          readOnly
        />
        <button onClick={onMoveAheadHandler}>Move Ahead</button>
        <button onClick={onMoveBehindHandler}>Move Back</button>
        <button onClick={onDeleteHandler}>Delete</button>
      </div>
    </StyledControl>
  );
};

export default Control;
