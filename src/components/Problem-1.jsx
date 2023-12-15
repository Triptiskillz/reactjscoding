import React, { useState } from "react";

const Problem1 = () => {
  // State variables for managing form input and tasks
  const [show, setShow] = useState("all");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [tasks, setTasks] = useState([]);

  // Handle click on tab buttons to filter tasks
  const handleClick = (val) => {
    setShow(val);
  };

  // Handle form submission to add a new task
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new task object
    const newTask = { name, status };

    // Add the new task to the tasks array
    setTasks([...tasks, newTask]);

    // Clear the form fields
    setName("");
    setStatus("");
  };

  // Filter tasks based on the selected filter (all, active, completed)
  const filterTasks = () => {
    if (show === "all") {
      // Sort tasks to display active tasks first, followed by completed tasks
      return tasks.sort((a, b) =>
        a.status === "Active" ? -1 : a.status === "Completed" ? 1 : 0
      );
    } else {
      // Filter tasks based on the selected status (active or completed)
      return tasks.filter((task) => task.status.toLowerCase() === show);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {/* Problem title */}
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>

        {/* Form for adding new tasks */}
        <div className="col-6">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            {/* Input for task name */}
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Input for task status */}
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>

            {/* Submit button */}
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Task filter tabs */}
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            {/* All tasks tab */}
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>

            {/* Active tasks tab */}
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>

            {/* Completed tasks tab */}
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>

          {/* Task list table */}
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Display filtered tasks in the table */}
              {filterTasks().map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
