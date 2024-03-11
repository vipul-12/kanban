import React, { useState } from "react";
import styled from "styled-components";
import Control from "./Control";
import Stage from "./Stage";

const StyledKanban = styled.div`
  h1 {
    display: flex;
    justify-content: center;
  }
  .grid {
    display: flex;
    justify-content: center;
  }

  .column {
    flex: 1;
    padding: 1rem;
  }
`;

export type TaskObject = {
  taskName: string;
  stage: "Backlog" | "Doing" | "Review" | "Done";
  stageId: 0 | 1 | 2 | 3;
};

const stages: string[] = ["Backlog", "Doing", "Review", "Done"];

type KanbanState = {
  tasks: TaskObject[];
  selectedTask: TaskObject | undefined;
};

const Kanban = () => {
  const [state, setState] = useState<KanbanState>({
    tasks: [],
    selectedTask: undefined,
  });

  const addTask = (title: string) => {
    const newTaskObject: TaskObject = {
      taskName: title,
      stage: "Backlog",
      stageId: 0,
    };

    let newTasks: TaskObject[] = state.tasks.concat(newTaskObject);

    setState((state: KanbanState) => ({
      ...state,
      tasks: newTasks,
    }));
  };

  const selectTask = (task: TaskObject) => {
    // console.log("stage clicked inside Kanban", task);
    setState((state: KanbanState) => ({
      ...state,
      selectedTask: task,
    }));
  };

  const incrementStage = (task: TaskObject): TaskObject => {
    let nextStageId: 0 | 1 | 2 | 3 = ((task.stageId + 1) % 4) as 0 | 1 | 2 | 3;
    let nextStage: "Backlog" | "Doing" | "Review" | "Done";
    switch (nextStageId) {
      case 0:
        nextStage = "Backlog";
        break;
      case 1:
        nextStage = "Doing";
        break;
      case 2:
        nextStage = "Review";
        break;
      case 3:
        nextStage = "Done";
        break;
    }

    return {
      ...task,
      stageId: nextStageId,
      stage: nextStage,
    };
  };

  const decrementStage = (task: TaskObject): TaskObject => {
    let nextStageId: 0 | 1 | 2 | 3 = ((task.stageId - 1) % 4) as 0 | 1 | 2 | 3;
    let nextStage: "Backlog" | "Doing" | "Review" | "Done";
    switch (nextStageId) {
      case 0:
        nextStage = "Backlog";
        break;
      case 1:
        nextStage = "Doing";
        break;
      case 2:
        nextStage = "Review";
        break;
      case 3:
        nextStage = "Done";
        break;
    }

    return {
      ...task,
      stageId: nextStageId,
      stage: nextStage,
    };
  };

  const taskStageChangeHandler = (
    task: TaskObject | undefined,
    action: string
  ) => {
    if (task) {
      var updatedTask: TaskObject;
      switch (action) {
        case "moveAhead":
          if (task.stageId < 3) {
            let findIncrementTask = state.tasks.find(
              (item: TaskObject) => item.taskName === task.taskName
            );

            if (findIncrementTask) {
              updatedTask = incrementStage(findIncrementTask);
            }
          }
          break;
        case "moveBehind":
          if (task.stageId >= 0) {
            let findDecrementTask = state.tasks.find(
              (item: TaskObject) => item.taskName === task.taskName
            );

            if (findDecrementTask) {
              updatedTask = decrementStage(findDecrementTask);
            }
          }
          break;

        default:
          break;
      }

      let newTasks: TaskObject[] = state.tasks.map((item: TaskObject) => {
        if (item.taskName === updatedTask.taskName) {
          return updatedTask;
        } else {
          return item;
        }
      });

      setState((state: KanbanState) => ({
        ...state,
        tasks: newTasks,
      }));
    }
  };

  return (
    <StyledKanban>
      <h1>Kanban Board</h1>
      <Control
        addTask={addTask}
        selectedTask={state.selectedTask}
        taskStageChangeHandler={taskStageChangeHandler}
      />
      <div className="grid">
        {stages.map((item: string, index: number) => (
          <div className="column" key={index}>
            <Stage title={item} tasks={state.tasks} selectTask={selectTask} />
          </div>
        ))}
      </div>
    </StyledKanban>
  );
};

export default Kanban;
