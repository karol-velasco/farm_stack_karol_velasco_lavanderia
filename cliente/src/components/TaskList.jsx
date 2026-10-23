import TaskCard from "./TaskCard";

function TaskList({ encargos }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {encargos.map((encargo) => (
        <TaskCard encargo={encargo} key={encargo._id} />
      ))}
    </div>
  );
}

export default TaskList;