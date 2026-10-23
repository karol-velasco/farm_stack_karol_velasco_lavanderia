import { useNavigate } from "react-router-dom";
import { updateEncargo } from "../api/encargos";

function TaskCard({ encargo }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-zinc-950 p-4 hover:cursor-pointer hover:bg-gray-950 rounded"
      onClick={() => navigate(`/encargos/${encargo._id}`)}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-2xl">{encargo.cliente}</h2>
        <button
          onClick={async (e) => {
            e.stopPropagation();
            const res = await updateEncargo(encargo._id, {
              listo_para_entrega: !encargo.listo_para_entrega,
            });
            if (res.status === 200) {
              window.location.reload();
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${
              encargo.listo_para_entrega ? "text-green-500" : "text-gray-500"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </button>
      </div>

      <p className="text-slate-300">{encargo.tipo_prenda_lavado}</p>
      <p className="text-slate-400 font-semibold mt-2">${encargo.costo}</p>
    </div>
  );
}
export default TaskCard;