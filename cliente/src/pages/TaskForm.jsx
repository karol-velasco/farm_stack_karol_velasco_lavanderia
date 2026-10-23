import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchEncargo,
  createEncargo,
  updateEncargo,
  deleteEncargo,
} from "../api/encargos";

function TaskForm() {
  const [cliente, setCliente] = useState("");
  const [tipoPrendaLavado, setTipoPrendaLavado] = useState("");
  const [costo, setCosto] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  // Si hay un ID en la URL, consultamos y precargamos los datos
  useEffect(() => {
    if (params.id) {
      fetchEncargo(params.id)
        .then((res) => {
          setCliente(res.data.cliente);
          setTipoPrendaLavado(res.data.tipo_prenda_lavado);
          setCosto(res.data.costo);
        })
        .catch((err) => console.log(err));
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!params.id) {
        // Modo Crear
        await createEncargo({
          cliente,
          tipo_prenda_lavado: tipoPrendaLavado,
          costo: parseFloat(costo),
          listo_para_entrega: false,
        });
      } else {
        // Modo Actualizar
        await updateEncargo(params.id, {
          cliente,
          tipo_prenda_lavado: tipoPrendaLavado,
          costo: parseFloat(costo),
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response?.data?.detail) {
        alert(error.response.data.detail);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div>
        <form className="bg-zinc-950 p-10 rounded shadow-lg w-96" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold my-4 text-white">
            {params.id ? "Actualizar Encargo" : "Crear Encargo"}
          </h1>

          <input
            type="text"
            placeholder="Nombre del cliente"
            className="block py-2 px-3 mb-4 w-full text-black rounded"
            onChange={(e) => setCliente(e.target.value)}
            value={cliente}
            autoFocus
            required
          />

          <textarea
            placeholder="Tipo de prenda y lavado (ej. Traje formal - Lavado en seco)"
            className="block py-2 px-3 mb-4 w-full text-black rounded"
            rows="3"
            onChange={(e) => setTipoPrendaLavado(e.target.value)}
            value={tipoPrendaLavado}
            required
          ></textarea>

          <input
            type="number"
            placeholder="Costo (ej. 25000)"
            className="block py-2 px-3 mb-4 w-full text-black rounded"
            onChange={(e) => setCosto(e.target.value)}
            value={costo}
            required
          />

          <button className="bg-white hover:bg-slate-800 hover:text-white text-slate-800 font-bold py-2 px-4 rounded w-full transition duration-150">
            {params.id ? "Actualizar Encargo" : "Crear Encargo"}
          </button>
        </form>

        {/* Botón condicional de Borrar: Solo aparece si estamos editando un encargo existente */}
        {params.id && (
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mt-5 transition duration-150"
            onClick={async () => {
              try {
                await deleteEncargo(params.id);
                navigate("/");
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Borrar
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskForm;