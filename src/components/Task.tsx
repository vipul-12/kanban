import styled from "styled-components";
import { TaskObject } from "./Kanban";

const StyledTask = styled.div`
  padding: 0.5rem;
`;

type TaskProps = {
  task: TaskObject;
};

const Task = (props: TaskProps) => {
  return (
    <StyledTask>
      <div>{props.task.taskName}</div>
    </StyledTask>
  );
};

export default Task;
