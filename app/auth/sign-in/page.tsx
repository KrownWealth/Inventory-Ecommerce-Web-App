import { SignupWithGoogle, Quote } from "@/components/custom-ui/reuseables";
import LoginView from "@/views/authentication/loginView";
import { Logo } from "@/views/Navigation/Logo";


export default function Login() {
  return (
    <div className="w-full bg-white">
      <div className="flex flex-row min-h-screen ">
        <div className="w-full lg:w-2/5 p-8 md:px-20 lg:px-12 flex items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center">
            <Logo />
            <h2 className="text-2xl md:text-4xl font-semibold text-black pb-4">Login</h2>

            <p className="pb-2 text-sm">For admin login please make use of <strong>Email:</strong> superadmin@gmail.com, and <strong>Password:</strong> superadmin</p>
            <LoginView />
            {/* <SignupWithGoogle /> */}
          </div>
        </div>
        <Quote />
      </div>
    </div>
  );
}
