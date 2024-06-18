export interface GetMasterDataParams {
  page: number;
  per_page: number;
}

export interface MasterDataDetailTypes {
  id: number;
  unit_id: number;
  ruas_name: string;
  long: number;
  km_awal: string;
  km_akhir: string;
  photo_url: string;
  doc_url: string;
  status: string;
  created_at: string;
  updated_at: string;
  unit: MasterDataDetailUnitTypes;
}
export interface MasterDataDetailUnitTypes {
  id: number;
  unit: string;
  status: number;
  created_by?: any;
  updated_by?: any;
  created_at: string;
  updated_at: string;
}