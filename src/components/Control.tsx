import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TaskObject } from "./Kanban";

const StyledControl = styled.div`
  display: flex;
  flex-direction: column;

  .createTaskControl {
    padding: 0.3rem;
  }

  .myButton {
    cursor: pointer;
    border-radius: 3rem;
    border-style: none;
    background-color: #ffffff;
    color: #3c4043;

    font-size: 14px;
    font-weight: 500;
    // height: 48px;
    justify-content: center;
    letter-spacing: 0.25px;
    text-align: center;
  }
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
      <div className="createTaskControl">
        <input
          value={state.createTask}
          onChange={onTextChange}
          placeholder="Enter New Task"
        />
        <button onClick={createTaskHandler} className="myButton">
          Create
        </button>
      </div>

      <div className="editTaskControl">
        <div>
          <input
            value={state.currentTask?.taskName ?? ""}
            placeholder={props.selectedTask?.taskName ?? "Selected Task"}
            readOnly
          />
        </div>
        <div>
          <button
            onClick={onMoveAheadHandler}
            disabled={state.currentTask?.stageId === 3}
            className="myButton"
          >
            Move Ahead
          </button>
          <button
            onClick={onMoveBehindHandler}
            disabled={state.currentTask?.stageId === 0}
            className="myButton"
          >
            Move Back
          </button>
          <button onClick={onDeleteHandler} className="myButton">
            Delete
          </button>
        </div>
      </div>
    </StyledControl>
  );
};

export default Control;
