import { useState, useEffect } from "react";
import styled from "styled-components";
import Task from "./Task";
import { TaskObject } from "./Kanban";

const StyledStage = styled.div`
  display: flex;
  flex-direction: column;

  .heading {
    border-radius: 1rem;
    &.Backlog {
      background-color: #be515a;
    }

    &.Doing {
      background-color: #c0b515;
    }

    &.Review {
      background-color: #64c22e;
    }

    &.Done {
      background-color: #34c4f0;
    }
  }

  .stageBody {
    background-color: #dfd7d7;
    border-radius: 1rem;
  }

  h2 {
    display: flex;
    justify-content: center;
  }

  .juanTask {
    display: flex;
    justify-content: center;
    cursor: pointer;
    font-weight: 500;
    &:hover {
      color: #0314fd;
    }
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

type StageState = {
  hasElements: boolean;
};
const Stage = (props: StageProps) => {
  const [state, setState] = useState<StageState>({
    hasElements: false,
  });

  useEffect(() => {
    setState((state: StageState) => ({
      ...state,
      hasElements: props.tasks.some(
        (item: TaskObject) => props.title === item.stage
      ),
    }));
  }, [props]);

  const onStageClick = (task: TaskObject) => {
    props.selectTask(task);
  };
  return (
    <StyledStage>
      <div className={`heading ${props.title}`}>
        <h2>{props.title}</h2>
      </div>
      {state.hasElements && (
        <div className="stageBody">
          <ul>
            {props.tasks
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
      )}
    </StyledStage>
  );
};

export default Stage;
