import React from "react";
import { formatPrice } from "../utils/formatPrice";

function ProductTable({ products, onEdit, onDelete }) {
  return (
    <table className="w-full border-collapse shadow-md">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2 text-left">ID</th>
          <th className="border px-4 py-2 text-left">Nome</th>
          <th className="border px-4 py-2 text-left">Categoria</th>
          <th className="border px-4 py-2 text-left">Preço</th>
          <th className="border px-4 py-2 text-left">Quantidade</th>
          <th className="border px-4 py-2 text-left">Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{product.id}</td>
            <td className="border px-4 py-2">{product.name}</td>
            <td className="border px-4 py-2">{product.category}</td>
            <td className="border px-4 py-2">{formatPrice(product.price)}</td>
            <td className="border px-4 py-2">{product.quantity}</td>
            <td className="border px-4 py-2 space-x-2">
              <button
                onClick={() => onEdit(product)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-sm"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
