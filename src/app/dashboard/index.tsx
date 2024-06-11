import { LazyComponents } from "@/lib/load";

const DashboardPage = LazyComponents({
  importComponent: () => import('@/app/dashboard/dahsboard.view'),
  moduleSelector: (module) => module.DashboardPage
})

export { DashboardPage }

// https://data.pu.go.id/sites/default/files/geojson/ast_bpjt_tol_operasi.geojson