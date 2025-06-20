import React from "react";
import { useStore } from "../store/productStore";

function TrashSection({ trash, onClear, onRestore }) {
  return (
    <div className="mt-6">
      <h2 className="font-bold text-lg mb-2">Lixeira ({trash.length})</h2>
      {trash.length === 0 ? (
        <p className="text-gray-500">Nenhum item na lixeira.</p>
      ) : (
        <>
          <ul className="list-disc ml-5 space-y-2">
            {trash.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <span>
                  {item.name} - {item.category}
                </span>
                <button
                  onClick={() => onRestore(item.id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                >
                  Restaurar
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={onClear}
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 mt-4 rounded"
          >
            Esvaziar Lixeira
          </button>
        </>
      )}
    </div>
  );
}

export default TrashSection;
