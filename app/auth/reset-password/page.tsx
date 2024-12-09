import { Quote } from "@/components/custom-ui/reuseables";
import { ResetPasswordView } from "@/views";
import LoginView from "@/views/authentication/loginView";



export default function ResetPassword() {
  return (
    <div className="w-full bg-white">
      <div className="flex flex-row min-h-screen">
        <div className="w-1/2 px-12 p-8">
          <div className="w-full flex flex-col gap-8">

            <div className="flex flex-col space-y-8">
              <h2 className="text-2xl md:text-6xl font-semibold text-black pb-6">Reset Password</h2>
            </div>

            <ResetPasswordView />

          </div>
        </div>
        <Quote />
      </div>
    </div>
  );
}
