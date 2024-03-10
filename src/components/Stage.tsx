import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { task } from "./Kanban";

const StyledStage = styled.div``;

type StageProps = {
  title: string;
  tasks: task[];
};

const Stage = (props: StageProps) => {
  return (
    <StyledStage>
      <h2>{props.title}</h2>

      <ul>
        {props.tasks &&
          props.tasks
            .filter((task: task) => task.stage === props.title)
            .map((task: task, index: number) => (
              <div key={index}>
                <Task task={task} />
              </div>
            ))}
      </ul>
    </StyledStage>
  );
};

export default Stage;
