import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import toast from "react-hot-toast";

const columns = ["applied", "interview", "selected", "rejected"];

function Kanban() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.get("/applications");
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  // 📊 Count function
  const getCount = (status) => {
    return tasks.filter((t) => (t.status || "applied") === status).length;
  };

  // 🎯 Drag logic
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    const updatedTasks = tasks.map((task) =>
      task._id === draggableId
        ? { ...task, status: destination.droppableId }
        : task
    );

    setTasks(updatedTasks);

    try {
      await API.put(`/applications/${draggableId}`, {
        status: destination.droppableId,
      });
      toast.success("Status updated 🚀");
    } catch {
      toast.error("Error updating ❌");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-100 p-6 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Application Tracker</h1>

        {/* 📊 Analytics */}
        <div className="grid grid-cols-4 gap-4 mb-6">

          <div className="bg-blue-500 text-white p-4 rounded-lg shadow">
            <p className="text-sm">Applied</p>
            <h2 className="text-2xl font-bold">{getCount("applied")}</h2>
          </div>

          <div className="bg-yellow-500 text-white p-4 rounded-lg shadow">
            <p className="text-sm">Interview</p>
            <h2 className="text-2xl font-bold">{getCount("interview")}</h2>
          </div>

          <div className="bg-green-500 text-white p-4 rounded-lg shadow">
            <p className="text-sm">Selected</p>
            <h2 className="text-2xl font-bold">{getCount("selected")}</h2>
          </div>

          <div className="bg-red-500 text-white p-4 rounded-lg shadow">
            <p className="text-sm">Rejected</p>
            <h2 className="text-2xl font-bold">{getCount("rejected")}</h2>
          </div>

        </div>

        {/* 📊 Total + Success */}
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow mb-6">
          <p>Total Applications</p>
          <h2 className="text-2xl font-bold">{tasks.length}</h2>

          <p className="mt-2 text-sm text-gray-300">
            Success Rate:{" "}
            {tasks.length === 0
              ? "0%"
              : Math.round((getCount("selected") / tasks.length) * 100) + "%"}
          </p>
        </div>

        {/* 🧠 Kanban Board */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-4 gap-4">

            {columns.map((col) => (
              <Droppable key={col} droppableId={col}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-gray-200 p-4 rounded-xl min-h-[500px]"
                  >
                    <h2 className="font-bold capitalize mb-4">
                      {col} ({getCount(col)})
                    </h2>

                    {tasks.filter((t) => (t.status || "applied") === col).length === 0 ? (
                      <p className="text-gray-400 italic">No applications</p>
                    ) : (
                      tasks
                        .filter((task) => (task.status || "applied") === col)
                        .map((task, index) => (
                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-3 rounded shadow mb-3 text-white transition-all duration-200 ${
                                  task.status === "applied"
                                    ? "bg-blue-500"
                                    : task.status === "interview"
                                    ? "bg-yellow-500"
                                    : task.status === "selected"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              >
                                {task.title}
                              </div>
                            )}
                          </Draggable>
                        ))
                    )}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}

          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Kanban;