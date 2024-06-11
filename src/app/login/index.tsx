import { LazyComponents } from "@/lib/load";

const AuthenticationPage = LazyComponents({
  importComponent: () => import('@/app/login/login.auth.view'),
  moduleSelector: (module) => module.AuthenticationPage
})

export { AuthenticationPage }