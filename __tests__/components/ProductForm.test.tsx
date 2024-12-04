import { render, screen, fireEvent } from "@testing-library/react";
import { vi, Mock } from "vitest";
import ProductForm from "@/components/custom-ui/reuseables/Modals/productForm";




describe("ProductForm Component", () => {
  const mockProps = {
    productData: {
      id: "product-1",
      image: "/image/good-image.png",
      name: "Good Product",
      costPrice: 0,
      markupPercentage: 0,
      sellingPrice: 100,
      stock: 5,
      slug: "good-product",
      category: {
        id: "1",
        name: "category 1",
      },
      description: "Very good product",
      status: "published",
    },
    setProductData: vi.fn(),
    onSubmit: vi.fn(),
    isLoading: false,
    imageName: "test-image.jpg",
    handleImage: vi.fn(),
    isUploading: false,
    imageError: null,
    generalError: null,
    status: "draft",
    setStatus: vi.fn(),
    formMode: "Add",
    categories: [
      { id: "1", name: "Category 1" },
      { id: "2", name: "Category 2" },
    ],
  };



  it("should renders the ProductForm Component", async () => {
    render(<ProductForm {...mockProps} />);


    expect(screen.getByLabelText("Product Name *")).toBeInTheDocument();
    expect(screen.getByLabelText("Cost Price *")).toBeInTheDocument();
    expect(screen.getByLabelText("Markup Percentage *")).toBeInTheDocument();
    expect(screen.getByLabelText("Stock *")).toBeInTheDocument();
    expect(screen.getByLabelText("description")).toBeInTheDocument();


    const mockCategories = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ];

    const mockStatuses = [
      { id: 1, name: "Draft" },
      { id: 2, name: "Publushed" },
    ];

    vi.mock("api/fatch-categories}", () => ({
      fetchCategories: vi.fn(() => Promise.resolve(mockCategories)),
      fetchStatuses: vi.fn(() => Promise.resolve(mockStatuses)),
    }));

    const selectCategory = screen.getByRole("combobox", { name: /select category/i });
    expect(selectCategory).toBeInTheDocument();
    fireEvent.click(selectCategory);

    // const categoryOption = await screen.findByText(/category 1/i);
    // expect(categoryOption).toBeInTheDocument();
    // fireEvent.click(categoryOption);



    // const selectStatus = screen.getByRole("combobox", { name: /draft/i });
    // expect(selectStatus).toBeInTheDocument();
    // fireEvent.click(selectStatus);


    // const statusOption = await screen.findByText(/active/i);
    // expect(statusOption).toBeInTheDocument();
    // fireEvent.click(statusOption);

  });

  it("should calls onSubmit when the form is submitted", () => {
    render(<ProductForm {...mockProps} />);
    const submitButton = screen.getByRole("button", { name: /add product/i });

    fireEvent.click(submitButton);

    expect(mockProps.onSubmit).toHaveBeenCalled();
  });
});
