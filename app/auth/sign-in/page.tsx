import { SignupWithGoogle, Quote, LogoOnAuth, WelcomeText } from "@/components/custom-ui/reuseables";
import LoginView from "@/views/authentication/loginView";

export default function Login() {
  return (
    <div className="w-full bg-white">
      <div className="flex flex-row min-h-screen ">
        <div className="w-2/5 p-12 flex items-center justify-center">
          <div className="w-full flex flex-col gap-8">
            {/* <LogoOnAuth /> */}
            <div className="flex flex-col space-y-8">

              <WelcomeText authType="Welcome" />
              <SignupWithGoogle />
            </div>

            <LoginView />

          </div>
        </div>
        <Quote />
      </div>
    </div>
  );
}
