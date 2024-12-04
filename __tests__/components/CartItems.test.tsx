import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, afterEach, Mock } from "vitest";
import { CartItems } from "@/views";
import { useCart } from "@/context/CartContext";

vi.mock("@/context/CartContext");

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
}));


vi.mock("use-debounce", () => ({
  useDebouncedCallback: vi.fn(() => vi.fn()),
}));


const mockUseCart = useCart as Mock;

const mockProductDetail = {
  id: "1234",
  image: "/images/placeholder.png",
  name: "Sample Product",
  sellingPrice: 100,
  stock: 5,
  slug: "sample-product",
  category: {
    id: "1",
    name: "Sample Category",
  },
  description: "A sample product description",
  status: "published",
  rating: 5,
  reviews: [{ rating: 4, comment: "Great product!", user: "user-1" }],
};


const mockCartItems = {
  id: 1,
  productId: mockProductDetail.id,
  userId: "user-1",
  quantity: 2,
  sellingPrice: mockProductDetail.sellingPrice,
  totalPrice: 200,
  image: "/images/placeholder.png",
  name: mockProductDetail.name,
  product: mockProductDetail,
};

describe("CartItems Component", () => {
  //const mockUseCart = vi.mocked(useCart);
  const mockUsePathname = vi.mocked(require("next/navigation").usePathname);


  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders loading state", () => {
    mockUseCart.mockReturnValue({
      fetchCartItems: vi.fn(),
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      cartItems: [],
      loading: true,
      totalPrice: 0,
    });

    render(<CartItems />);
    const loadinCart = screen.getByTestId(/loading-cart/i);
    expect(loadinCart).toBeInTheDocument();
  });

  it("renders error state", async () => {
    mockUseCart.mockReturnValue({
      fetchCartItems: vi.fn(),
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      cartItems: [],
      loading: false,
      totalPrice: 0,
    });

    const errorMessage = "Failed to fetch cart items";
    global.fetch = vi.fn(() =>
      Promise.reject(new Error(errorMessage))
    ) as unknown as typeof fetch;

    render(<CartItems />);

    await waitFor(() =>
      expect(screen.getByText("Error Loading Cart")).toBeInTheDocument()
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });


  it("renders empty cart state", () => {
    mockUseCart.mockReturnValue({
      fetchCartItems: vi.fn(),
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      cartItems: [],
      loading: false,
      totalPrice: 0,
    });

    render(<CartItems />);

    expect(screen.getByTestId("no-cart-items")).toHaveTextContent(
      "No items in your cart."
    );
  });

  it("renders cart with items", () => {


    mockUseCart.mockReturnValue({
      fetchCartItems: vi.fn(),
      addToCart: vi.fn(),
      removeFromCart: vi.fn(),
      cartItems: [mockCartItems],
      loading: false,
      totalPrice: 40.0,
    });

    render(<CartItems />);

    expect(screen.getByText("Sample Product")).toBeInTheDocument();
    expect(screen.getByText("Total Units:")).toBeInTheDocument();
  });

});
