import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TaskObject } from "./Kanban";

const StyledControl = styled.div`
  display: flex;
  flex-direction: column;
`;

type ControlProps = {
  addTask: (title: string) => void;
  deleteTask: (task: TaskObject) => void;
  taskStageChangeHandler: (task: TaskObject, action: string) => void;
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
    state.currentTask &&
      props.taskStageChangeHandler(state.currentTask, "moveAhead");

    setState((state: ControlState) => ({
      ...state,
      currentTask: undefined,
    }));
  };

  const onMoveBehindHandler = () => {
    state.currentTask &&
      props.taskStageChangeHandler(state.currentTask, "moveBehind");

    setState((state: ControlState) => ({
      ...state,
      currentTask: undefined,
    }));
  };

  const onDeleteHandler = () => {
    state.currentTask && props.deleteTask(state.currentTask);

    setState((state: ControlState) => ({
      ...state,
      currentTask: undefined,
    }));
  };

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
        <button
          onClick={onMoveAheadHandler}
          disabled={state.currentTask?.stageId === 3}
        >
          Move Ahead
        </button>
        <button
          onClick={onMoveBehindHandler}
          disabled={state.currentTask?.stageId === 0}
        >
          Move Back
        </button>
        <button onClick={onDeleteHandler}>Delete</button>
      </div>
    </StyledControl>
  );
};

export default Control;
