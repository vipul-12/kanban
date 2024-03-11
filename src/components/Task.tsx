import React from "react";
import styled from "styled-components";
import { task } from "./Kanban";

const StyledTask = styled.div``;

type TaskProps = {
  task: task;
};

const Task = (props: TaskProps) => {
  return (
    <StyledTask>
      <div>{props.task.taskName}</div>
    </StyledTask>
  );
};

export default Task;
