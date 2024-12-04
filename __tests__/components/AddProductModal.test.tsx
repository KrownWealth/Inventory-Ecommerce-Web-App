import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { uploadImageToCloudinary, toastNotification } from "@/lib";
import { vi, Mock } from "vitest";
import AddProductModal from "@/components/custom-ui/reuseables/Modals/addProductModal";

vi.mock("@/lib", async () => {
  const originalModule = await vi.importActual<typeof import("@/lib")>("@/lib");
  return {
    ...originalModule,
    uploadImageToCloudinary: vi.fn(async () => "mocked-image-url"),
    toastNotification: vi.fn(),
  };
});

const mockSetIsModalOpen = vi.fn();

const defaultProps = {
  isModalOpen: true,
  setIsModalOpen: mockSetIsModalOpen,
};

beforeEach(() => {
  vi.clearAllMocks();
});

const mockCategories = [
  { id: "1", name: "Category 1" },
  { id: "2", name: "Category 2" },
];
global.fetch = vi.fn().mockResolvedValueOnce({
  ok: true,
  json: vi.fn().mockResolvedValue({ categories: mockCategories }),
});


describe("AddProductModal Component", () => {
  it("should render the modal when `isModalOpen` is true", () => {
    render(<AddProductModal {...defaultProps} />);

    expect(screen.getByRole("dialog", { name: /add product/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /add product/i })).toBeInTheDocument();


    expect(screen.getByRole("textbox", { name: /product name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /description/i })).toBeInTheDocument();
    expect(screen.getByText('Product Image')).toBeInTheDocument();


    expect(screen.getByRole("spinbutton", { name: /cost price/i })).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: /markup percentage/i })).toBeInTheDocument();
    expect(screen.getByRole("spinbutton", { name: /stock/i })).toBeInTheDocument();


    expect(screen.getByRole("button", { name: /add product/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();



  });

  it("should show validation error for missing fields on form submission", async () => {
    render(<AddProductModal {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: /add product/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/missing fields: product name/i)
      ).toBeInTheDocument();
    });
  });

  // it("should fetch and display categories", async () => {
  //   render(<AddProductModal {...defaultProps} />);
  //   screen.debug()
  //   await waitFor(() => {
  //     screen.debug();
  //     expect(screen.getByText(/category 1/i)).toBeInTheDocument();
  //     expect(screen.getByText(/category 2/i)).toBeInTheDocument();
  //   });
  // });

  // it("should upload an image successfully", async () => {
  //   render(<AddProductModal {...defaultProps} />);

  //   const fileInput = screen.getByLabelText(/upload image/i);
  //   const file = new File(["image"], "image.jpg", { type: "image/jpeg" });

  //   fireEvent.change(fileInput, { target: { files: [file] } });

  //   await waitFor(() => {
  //     expect(uploadImageToCloudinary).toHaveBeenCalledWith(file, "gewfxwe5");
  //     expect(screen.getByText(/image.jpg/i)).toBeInTheDocument();
  //   });
  // });

  // it("should display an error for failed image upload", async () => {
  //   const mockError = new Error("Image upload failed");
  //   (uploadImageToCloudinary as Mock).mockRejectedValue(mockError);

  //   render(<AddProductModal {...defaultProps} />);

  //   const fileInput = screen.getByLabelText(/upload image/i);
  //   const file = new File(["image"], "image.jpg", { type: "image/jpeg" });

  //   fireEvent.change(fileInput, { target: { files: [file] } });

  //   await waitFor(() => {
  //     expect(screen.getByText(/image upload failed/i)).toBeInTheDocument();
  //   });
  // });

  // it("should submit the form successfully", async () => {
  //   global.fetch = vi.fn().mockResolvedValueOnce({ ok: true });

  //   render(<AddProductModal {...defaultProps} />);

  //   fireEvent.change(screen.getByRole("textbox", { name: /product name/i }), {
  //     target: { value: "Sample Product" },
  //   });
  //   fireEvent.change(screen.getByRole("spinbutton", { name: /cost price/i }), {
  //     target: { value: "100" },
  //   });
  //   fireEvent.change(screen.getByRole("spinbutton", { name: /markup percentage/i }), {
  //     target: { value: "20" },
  //   });
  //   fireEvent.change(screen.getByRole("textbox", { name: /description/i }), {
  //     target: { value: "This is a test product description." },
  //   });

  //   fireEvent.click(screen.getByRole("button", { name: /add product/i }));

  //   await waitFor(() => {
  //     expect(toastNotification).toHaveBeenCalledWith(
  //       "success",
  //       "top-right",
  //       undefined,
  //       { message: "Product created successfully" }
  //     );
  //   });
  // });

  // it("should display an error message for failed form submission", async () => {
  //   global.fetch = vi.fn().mockResolvedValueOnce({ ok: false });

  //   render(<AddProductModal {...defaultProps} />);

  //   fireEvent.change(screen.getByRole("textbox", { name: /product name/i }), {
  //     target: { value: "Sample Product" },
  //   });

  //   fireEvent.click(screen.getByRole("button", { name: /add product/i }));

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText(/failed to create product, please try again/i)
  //     ).toBeInTheDocument();
  //   });
  // });

});
