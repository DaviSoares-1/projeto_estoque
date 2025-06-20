import React, { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import TrashSection from "./components/TrashSection";
import FeedbackAlert from "./components/FeedbackAlert";
import { useStore } from "./store/productStore";
import { generateId } from "./utils/generateId";
import { exportProductsToPDF } from "./utils/exportPDF";

function App() {
  const { products, addProduct, updateProduct, deleteProduct, trash, clearTrash } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filterInput, setFilterInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("");

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => {
        setFeedback("");
        setFeedbackType("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleFormSubmit = (productData) => {
    if (editingProduct) {
      updateProduct({ ...productData, id: editingProduct.id });
      setFeedback("Produto atualizado com sucesso!");
      setFeedbackType("update");
    } else {
      const newProduct = { ...productData, id: generateId() };
      addProduct(newProduct);
      setFeedback("Produto cadastrado com sucesso!");
      setFeedbackType("success");
    }
    setShowModal(false);
    setEditingProduct(null);
    setFilterInput("");
    setFilteredProducts(products);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setFeedback("Produto excluído (movido para lixeira)!");
    setFeedbackType("delete");
  };

  const handleRestore = (id) => {
    useStore.getState().restoreProduct(id);
    setFeedback("Produto restaurado com sucesso!");
    setFeedbackType("restore");
  };

  const handleClearTrash = () => {
    clearTrash();
    setFeedback("Lixeira esvaziada com sucesso!");
    setFeedbackType("trashClear");
  };

  const handleExportPDF = () => {
    exportProductsToPDF(filteredProducts);
  };

  const handleFilterInputChange = (e) => {
    const value = e.target.value.toUpperCase();
    setFilterInput(value);
  };

  const handleSearch = () => {
    const search = filterInput.trim();

    // Nova validação para campo vazio
    if (search === "") {
      setFeedback("Digite um valor válido para filtrar.");
      setFeedbackType("notFound");
      return;
    }

    let results = [];

    const numericSearch = parseFloat(search.replace(",", "."));

    if (!isNaN(numericSearch)) {
      const formattedSearch = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(numericSearch);

      results = products.filter((p) => {
        const productPriceFormatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(+p.price);
        return productPriceFormatted.includes(formattedSearch);
      });
    } else {
      results = products.filter((p) => {
        return (
          p.name.includes(search) ||
          p.category.includes(search)
        );
      });
    }

    if (results.length === 0) {
      setFeedback("Nenhum item encontrado para a busca.");
      setFeedbackType("notFound");
      setFilteredProducts(products);
    } else {
      setFilteredProducts(results);
      setFeedback("");
      setFeedbackType("");
    }

    setFilterInput(""); // Limpa o campo após a busca
  };

  const handleClearFilter = () => {
    setFilteredProducts(products);
    setFilterInput("");
    setFeedback("");
    setFeedbackType("");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🍔Sistema de Estoque - JJ LAVA-JATO LANCHONETE🍔
      </h1>

      <FeedbackAlert message={feedback} type={feedbackType} />

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Adicionar Produto
        </button>

        <div className="flex flex-1 gap-2">
          <input
            type="text"
            placeholder="Filtrar por Nome, Categoria ou Preço"
            className="border p-2 rounded shadow w-full"
            value={filterInput}
            onChange={handleFilterInputChange}
          />
          <button
            onClick={handleSearch}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow"
          >
            Buscar
          </button>
          <button
            onClick={handleClearFilter}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow"
          >
            Limpar Filtro
          </button>
        </div>

        <button
          onClick={handleExportPDF}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          Baixar PDF
        </button>
      </div>

      <ProductTable products={filteredProducts} onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && (
        <ProductForm
          onSubmit={handleFormSubmit}
          onClose={() => {
            setShowModal(false);
            setEditingProduct(null);
          }}
          editingProduct={editingProduct}
        />
      )}

      <TrashSection
        trash={trash}
        onClear={handleClearTrash}
        onRestore={handleRestore}
      />
    </div>
  );
}

export default App;
