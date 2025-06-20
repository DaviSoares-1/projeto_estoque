import React, { useState, useEffect } from "react"

const ProductForm = ({ onSubmit, onClose, editingProduct }) => {
	const [name, setName] = useState("")
	const [category, setCategory] = useState("")
	const [price, setPrice] = useState("")
	const [quantity, setQuantity] = useState("")
	const [error, setError] = useState("")

	useEffect(() => {
		if (editingProduct) {
			setName(editingProduct.name)
			setCategory(editingProduct.category)
			setPrice(editingProduct.price)
			setQuantity(editingProduct.quantity)
			setError("")
		} else {
			setName("")
			setCategory("")
			setPrice("")
			setQuantity("")
			setError("")
		}
	}, [editingProduct])

	// Função para formatar preço como moeda BRL com vírgula
	const formatPrice = (value) => {
		// Permite só números, vírgula e ponto para digitação
		let v = value.replace(/[^\d,\.]/g, "")

		// Substituir ponto por vírgula para padrão BR
		v = v.replace(/\./g, ",")

		return v
	}

	const handleSubmit = (e) => {
		e.preventDefault()

		// Remover espaços antes/depois e converter para maiúsculas
		const trimmedName = name.trim().toUpperCase()
		const trimmedCategory = category.trim().toUpperCase()

		if (!trimmedName || !trimmedCategory || !price || !quantity) {
			setError("Preencha todos os campos obrigatórios.")
			return
		}

		// Validar preço negativo e inválido
		const numericPrice = parseFloat(price.replace(",", "."))
		if (isNaN(numericPrice) || numericPrice < 0) {
			setError("O preço unitário não pode ser negativo ou inválido.")
			return
		}

		// Validar quantidade negativa e inválida
		const numericQuantity = parseInt(quantity)
		if (isNaN(numericQuantity) || numericQuantity < 0) {
			setError("A quantidade não pode ser negativa ou inválida.")
			return
		}

		onSubmit({
			name: trimmedName,
			category: trimmedCategory,
			price: numericPrice.toFixed(2),
			quantity: numericQuantity
		})

		// Resetar campos após envio
		setName("")
		setCategory("")
		setPrice("")
		setQuantity("")
		setError("")
	}

	return (
		<>
			{/* Modal com fundo escuro e transparente */}
			<div
				className="fixed inset-0 flex justify-center items-center z-50"
				style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
			>
				<div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
					<h2 className="text-xl font-bold mb-4">
						{editingProduct ? "Editar Produto" : "Adicionar Produto"}
					</h2>

					{error && (
						<div className="bg-red-500 text-white p-2 mb-4 rounded">
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block font-semibold mb-1">
								Nome do Produto
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="border rounded p-2 w-full"
								placeholder="Ex: Halls Melancia"
								autoFocus
							/>
						</div>

						<div>
							<label className="block font-semibold mb-1">Categoria</label>
							<input
								type="text"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								className="border rounded p-2 w-full"
								placeholder="Ex: DOCES"
							/>
						</div>

						<div>
							<label className="block font-semibold mb-1">
								Preço Unitário (R$)
							</label>
							<input
								type="text"
								value={price}
								onChange={(e) => setPrice(formatPrice(e.target.value))}
								className="border rounded p-2 w-full"
								placeholder="Ex: 2,50"
							/>
						</div>

						<div>
							<label className="block font-semibold mb-1">Quantidade</label>
							<input
								type="number"
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
								className="border rounded p-2 w-full"
								min="0"
								step="1"
								placeholder="Ex: 10"
							/>
						</div>

						<div className="flex justify-end gap-3 mt-6">
							<button
								type="button"
								onClick={onClose}
								className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
							>
								Cancelar
							</button>
							<button
								type="submit"
								className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
							>
								{editingProduct ? "Atualizar" : "Adicionar"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default ProductForm
