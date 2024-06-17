export interface DashboardDataType {
    map(arg0: (unit: any) => { id: any; unit: any; ruasCount: any; ruasNames: any; }): unknown;
    flatMap(arg0: (unit: any) => any): unknown;
    id: number;
    unit: string;
    status: number;
    created_by?: any;
    updated_by?: any;
    created_at: string;
    updated_at: string;
    ruas: DashboardDataRuasType[];
}

export interface DashboardDataRuasType {
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
}