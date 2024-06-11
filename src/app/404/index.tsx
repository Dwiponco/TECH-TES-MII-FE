import { LazyComponents } from "@/lib/load";

const NotFound = LazyComponents({
  importComponent: () => import('@/app/404/404.view'),
  moduleSelector: (module) => module.NotFound
})

export { NotFound }