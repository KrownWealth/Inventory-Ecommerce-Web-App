import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach, Mock } from "vitest";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import LoginView from "@/views/authentication/loginView";
import { toastNotification, useFormField } from "@/lib";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
  signIn: vi.fn(),
}));

vi.mock("@/lib", () => {
  const mockHandleChange = vi.fn();
  return {
    toastNotification: vi.fn(),
    cn: vi.fn(),
    useFormField: vi.fn((initialValue) => ({
      value: initialValue,
      error: "",
      handleChange: mockHandleChange.mockImplementation((e) => {
        mockHandleChange.mock.calls[0][0].target.value = e.target.value;
      }),
    })),
    FormSchema: {
      shape: {
        email: { validate: () => true }, // Mock validation to always pass
        password: { validate: () => true },
      },
    },
  };
});




describe("Login View ", () => {
  const mockPush = vi.fn();
  const mockSignIn = vi.fn();
  const mockToastNotification = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as Mock).mockReturnValue({ push: mockPush });
    (useSession as Mock).mockReturnValue({ data: null });
    (signIn as Mock).mockImplementation(mockSignIn);
  });

  it("renders email and password fields and a disabled login button initially", () => {
    render(<LoginView />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeDisabled();
  });


  it("should disables the login button if email or password is empty", async () => {
    render(<LoginView />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const loginButton = screen.getByRole("button", { name: /Login/i });

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    expect(loginButton).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    expect(loginButton).toBeDisabled();


    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    expect(loginButton).toBeDisabled();
  });

});
