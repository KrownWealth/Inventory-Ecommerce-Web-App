
import { render, screen, fireEvent, act } from "@testing-library/react";

import { ProductsType } from "@/types";
import { vi, Mock } from "vitest"
import { ModalManager } from "@/components/custom-ui/reuseables";
import userEvent from "@testing-library/user-event";


global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, name: 'Category 1' }]),
  })
) as Mock;


const mockSetIsModalOpen = vi.fn();
const mockSetProductInfo = vi.fn();
const mockHandleAddProductOpen = vi.fn();
const mockHandleCategoryChange = vi.fn();


const mockProduct: ProductsType = {
  id: "1",
  name: "Sample Product",
  costPrice: 100,
  markupPercentage: 20,
  sellingPrice: 120,
  stock: 10,
  category: { id: "cat1", name: "Category 1" },
  image: "sample.jpg",
  status: "Active",
  description: "Sample description",
};

const defaultProps = {
  isModalOpen: false,
  setIsModalOpen: mockSetIsModalOpen,
  selectedProduct: null,
  activeModal: null,
  handleAddProductOpen: mockHandleAddProductOpen,
  setProductInfo: mockSetProductInfo,
  handleCategoryChange: mockHandleCategoryChange,
  selectedCategory: "all",
};

// vi.mock("/api/fetch-categories", () => ({
//   fetchCategories: vi.fn(() => Promise.resolve(mockCategories)),
// }));

vi.spyOn(defaultProps, 'handleAddProductOpen');

vi.mock("/api/fetch-categories", () => ({
  fetchCategories: vi.fn(() =>
    Promise.resolve([
      { id: "1", name: "Category 1" },
      { id: "2", name: "Category 2" },
      { id: "3", name: "Category 3" },
    ])
  ),
}));



describe("ModalManager Component", () => {

  it("should render Add Product button and call setIsModalOpen(true) on click", async () => {
    await act(async () => {
      render(<ModalManager {...defaultProps} />);
    });

    const addProductButton = screen.getByRole("button", { name: /add product/i });
    expect(addProductButton).toBeInTheDocument();

    fireEvent.click(addProductButton);
    expect(mockHandleAddProductOpen).toHaveBeenCalledTimes(1);

  });

  it("should renders AddProductModal when isModalOpen is true and activeModal is 'add'", () => {
    render(
      <ModalManager
        {...defaultProps}
        isModalOpen={true}
        activeModal="add"
      />
    );

    const addProductButton = screen.getByRole("button", { name: /add product/i });
    expect(addProductButton).toBeInTheDocument();


  });

  it("renders EditProductModal when isModalOpen is true, activeModal is 'edit', and selectedProduct is valid", () => {
    render(
      <ModalManager
        {...defaultProps}
        isModalOpen={true}
        activeModal="edit"
        selectedProduct={mockProduct}
      />
    );
    const addProductButton = screen.getByRole("heading", { name: /edit product/i });
    expect(addProductButton).toBeInTheDocument();
  });

  // it("should handle category change via handleCategoryChange function", async () => {
  //   await act(async () => {
  //     render(<ModalManager {...defaultProps} />);
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByRole("listbox", { name: /filter by category/i })).toBeInTheDocument();
  //   });

  //   const selectElement = screen.getByRole("listbox", { name: /filter by category/i });

  //   await act(async () => {
  //     fireEvent.change(selectElement, { target: { value: "Category 1" } });
  //   });

  //   expect(mockHandleCategoryChange).toHaveBeenCalledWith("Category 1");
  // });


  it("should not render any modal when isModalOpen is false", () => {
    render(<ModalManager {...defaultProps} />);

    expect(screen.queryByText("Add Product Modal")).not.toBeInTheDocument();
    expect(screen.queryByText(mockProduct.name)).not.toBeInTheDocument();
  });


});







