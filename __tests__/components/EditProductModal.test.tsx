import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductsType } from "@/types";
import EditProductModal from "@/components/custom-ui/reuseables/Modals/editProductModal";
import { vi, Mock } from "vitest";
import { CostPriceSchema, DescriptionSchema, MarkupPercentageSchema, StockSchema, uploadImageToCloudinary } from "@/lib";


vi.mock("@/lib", () => ({
  toastNotification: vi.fn(),
  uploadImageToCloudinary: vi.fn().mockResolvedValue("mock-uploaded-image-url"),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));


vi.mock("@/lib", () => {
  const fields = {
    name: { value: "Sample Product", error: "", handleChange: vi.fn() },
    description: { value: "Sample description", error: "", handleChange: vi.fn() },
    costPrice: { value: 100, error: "", handleChange: vi.fn() },
    markupPercentage: { value: 20, error: "", handleChange: vi.fn() },
    sellingPrice: { value: 120, error: "", handleChange: vi.fn() },
    stock: { value: 10, error: "", handleChange: vi.fn() },
    category: { value: "Category 1", error: "", handleChange: vi.fn() },
    status: { value: "published", error: "", handleChange: vi.fn() },
  };

  return {
    toastNotification: vi.fn(),
    uploadImageToCloudinary: vi.fn(),
    useFormField: vi.fn((fieldName: keyof typeof fields) => {
      return fields[fieldName as keyof typeof fields] || { value: "", error: "", handleChange: vi.fn() };
    }),
    ProductNameSchema: vi.fn(),
    CostPriceSchema: vi.fn(),
    MarkupPercentageSchema: vi.fn(),
    StockSchema: vi.fn(),
    DescriptionSchema: vi.fn()
  };
});


const mockSetIsModalOpen = vi.fn();
const mockSetProductInfo = vi.fn();


const mockProductData = {
  isModalOpen: true,
  setIsModalOpen: mockSetIsModalOpen,
  setProductInfo: mockSetProductInfo,
  id: "1",
  name: "Sample Product",
  costPrice: 100,
  markupPercentage: 20,
  sellingPrice: 120,
  stock: 10,
  category: "Category 1",
  image: "sample.jpg",
  status: "published",
  description: "Sample description",
  slug: "sample-product",
  createdAt: new Date(),
  updatedAt: new Date(),
};


describe("EditProductModal Component", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });


  it("should renders the modal when open and displays the correct product data", () => {
    render(<EditProductModal {...mockProductData} />);

    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Edit Product/i);

    const editButton = screen.getByRole("button", { name: /Update Product/i });
    expect(editButton).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /Close/i });
    expect(closeButton).toBeInTheDocument();

    expect(screen.getByDisplayValue("Sample Product")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Sample description")).toBeInTheDocument();
  });


  it("should calls handleEditProduct with correct data on form submission", async () => {
    const { id, ...productProps } = mockProductData;

    global.fetch = vi.fn((url: any, options: any) => {
      if (url.includes("/api/fetch-categories")) {
        return Promise.resolve(
          new Response(
            JSON.stringify({ categories: [{ id: "1", name: "Category 1" }] }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          )
        );
      }

      if (url.includes("/api/products") && options?.method === "PATCH") {
        return Promise.resolve(
          new Response(
            JSON.stringify(mockProductData),
            { status: 200, headers: { "Content-Type": "application/json" } }
          )
        );
      }

      return Promise.reject(new Error("Unknown API endpoint"));
    });

    render(
      <EditProductModal
        {...productProps}
        id={id}
      />
    );

    fireEvent.change(screen.getByLabelText(/Product Name/i), {
      target: { value: "Updated Product" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Update Product/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/products", expect.objectContaining({
        method: "PATCH",
        body: expect.stringContaining("Updated Product"),
      }));
    });
  });

  it("should upload an image and update product data", async () => {
    render(<EditProductModal {...mockProductData} />);

    const fileInput = screen.getByLabelText('Product Image', { selector: 'input' });

    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });


    await waitFor(() => {
      screen.debug();
      expect(uploadImageToCloudinary).toHaveBeenCalledWith(file, "gewfxwe5");
    });

  });

});
