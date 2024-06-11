import { LazyComponents } from "@/lib/load";

const DashboardPage = LazyComponents({
  importComponent: () => import('@/app/dashboard/dahsboard.view'),
  moduleSelector: (module) => module.DashboardPage
})

export { DashboardPage }