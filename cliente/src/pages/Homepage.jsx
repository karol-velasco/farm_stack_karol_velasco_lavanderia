import { useEffect, useState } from "react";
import { fetchEncargos } from "../api/encargos";
import TaskList from "../components/TaskList";

function Homepage() {
  const [encargos, setEncargos] = useState([]);

  useEffect(() => {
    fetchEncargos()
      .then((res) => {
        setEncargos(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <TaskList encargos={encargos} />;
}

export default Homepage;