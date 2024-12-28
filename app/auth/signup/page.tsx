import { SignupWithGoogle, Quote } from "@/components/custom-ui/reuseables";
import { SignupView } from "@/views";


export default function SingUp() {

  return (
    <div className="w-full bg-white">
      <div className="flex flex-row min-h-screen">
        <div className="w-full lg:w-1/2 px-12 p-8">
          <div className="w-full flex flex-col gap-8">

            <div className="flex flex-col space-y-8">
              <h2 className="text-2xl md:text-6xl font-semibold text-black pb-6">Welcome</h2>
              <SignupView />

            </div>
            <SignupWithGoogle />


          </div>
        </div>
        <Quote />
      </div>
    </div>
  );
}
