import { LazyComponents } from "@/lib/load";

const MasterDataPage = LazyComponents({
  importComponent: () => import('@/app/master-data/master-data.view'),
  moduleSelector: (module) => module.MasterDataPage
})

const MasterDataDetail = LazyComponents({
  importComponent: () => import('@/app/master-data/master-data.detail'),
  moduleSelector: (module) => module.MasterDataDetail
})

export { MasterDataPage, MasterDataDetail }