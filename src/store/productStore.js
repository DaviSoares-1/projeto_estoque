import { create } from "zustand"

export const useStore = create((set) => ({
	products: JSON.parse(localStorage.getItem("products")) || [],
	trash: JSON.parse(localStorage.getItem("trash")) || [],
	addProduct: (product) =>
		set((state) => {
			const updated = [...state.products, product]
			localStorage.setItem("products", JSON.stringify(updated))
			return { products: updated }
		}),
	updateProduct: (updatedProduct) =>
		set((state) => {
			const updated = state.products.map((p) =>
				p.id === updatedProduct.id ? updatedProduct : p
			)
			localStorage.setItem("products", JSON.stringify(updated))
			return { products: updated }
		}),
	deleteProduct: (id) =>
		set((state) => {
			const productToTrash = state.products.find((p) => p.id === id)
			const updatedProducts = state.products.filter((p) => p.id !== id)
			const updatedTrash = [...state.trash, productToTrash]
			localStorage.setItem("products", JSON.stringify(updatedProducts))
			localStorage.setItem("trash", JSON.stringify(updatedTrash))
			return { products: updatedProducts, trash: updatedTrash }
		}),
	restoreProduct: (id) =>
		set((state) => {
			const itemToRestore = state.trash.find((item) => item.id === id)
			const updatedTrash = state.trash.filter((item) => item.id !== id)
			const updatedProducts = [...state.products, itemToRestore]
			localStorage.setItem("products", JSON.stringify(updatedProducts))
			localStorage.setItem("trash", JSON.stringify(updatedTrash))
			return { products: updatedProducts, trash: updatedTrash }
		}),
	clearTrash: () =>
		set(() => {
			localStorage.setItem("trash", JSON.stringify([]))
			return { trash: [] }
		})
}))
