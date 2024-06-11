import UserAuthForm from "./local-component/login.auth.form";

export function AuthenticationPage() {
  return (
    <>
      <div className="container relative min-h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">

        <div className="flex items-center p-4 lg:p-8">
          <div className="mx-auto flex w-full flex-col space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <img src="/image/logo.png" alt="Jasamarga " className=" object-cover h-full w-full" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Login
              </h1>
            </div>
            <UserAuthForm />
          </div>
        </div>

        <div className="relative h-full flex-col bg-muted text-white dark:border-r lg:flex  hidden md:block">
          <img src="/image/jasamarga.png" alt="Jasamarga " className=" object-cover h-full w-full" />
        </div>
      </div>
    </>
  )
}