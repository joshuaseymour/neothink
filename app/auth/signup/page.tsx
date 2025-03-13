import { SignupForm } from "@/components/auth/signup-form"

export const dynamic = "force-dynamic"

export default async function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white">Create an account</h1>
          <p className="mt-2 text-sm text-neutral-400">
            Already have an account?{" "}
            <a href="/auth/login" className="font-medium text-neothinker-500 hover:text-neothinker-400">
              Sign in
            </a>
          </p>
        </div>
        <div className="mt-8">
          <SignupForm />
        </div>
      </div>
    </div>
  )
}

