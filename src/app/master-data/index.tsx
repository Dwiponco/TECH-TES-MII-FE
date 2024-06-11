import { LazyComponents } from "@/lib/load";

const MasterDataPage = LazyComponents({
  importComponent: () => import('@/app/master-data/master-data.view'),
  moduleSelector: (module) => module.MasterDataPage
})

export { MasterDataPage }