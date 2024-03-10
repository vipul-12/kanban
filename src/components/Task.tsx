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
      <li>{props.task.taskName}</li>
    </StyledTask>
  );
};

export default Task;
