import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { TaskObject } from "./Kanban";

const StyledStage = styled.div`
  display: flex;
  flex-direction: column;

  border: 0.1rem solid;
  border-radius: 1rem;

  .heading {
    border-radius: 1rem;
    &.Backlog {
      background-color: pink;
    }

    &.Doing {
      background-color: yellow;
    }

    &.Review {
      background-color: green;
    }

    &.Done {
      background-color: blue;
    }
  }

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
      <div className={`heading ${props.title}`}>
        <h2>{props.title}</h2>
      </div>
      <div>
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
      </div>
    </StyledStage>
  );
};

export default Stage;
