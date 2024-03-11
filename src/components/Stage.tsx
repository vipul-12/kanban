import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { TaskObject } from "./Kanban";

const StyledStage = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    display: flex;
    justify-content: center;
  }

  .juanTask {
    display: flex;
    justify-content: center;
    cursor: pointer;
  }

  ul {
    list-style-type: none;
  }
`;

type StageProps = {
  title: string;
  tasks: TaskObject[];
  selectTask: (task: TaskObject) => void;
};

const Stage = (props: StageProps) => {
  const onStageClick = (task: TaskObject) => {
    props.selectTask(task);
  };
  return (
    <StyledStage>
      <h2>{props.title}</h2>

      <ul>
        {props.tasks &&
          props.tasks
            .filter((task: TaskObject) => task.stage === props.title)
            .map((task: TaskObject, index: number) => (
              <div
                key={index}
                className="juanTask"
                onClick={() => {
                  onStageClick(task);
                }}
              >
                <li>
                  <Task task={task} />
                </li>
              </div>
            ))}
      </ul>
    </StyledStage>
  );
};

export default Stage;
