export interface RootObjectGeoJson {
    type: string;
    crs: Crs;
    features: Feature[];
}
interface Feature {
    type: string;
    id: number;
    geometry: Geometry;
    properties: Properties;
}
interface Properties {
    objectid: number;
    uid: string;
    creator?: any;
    created: number;
    updater?: any;
    updated: number;
    nm_balai?: any;
    koord_x?: any;
    koord_y?: any;
    foto?: any;
    data_src?: any;
    last_sync: number;
    sync_notes?: any;
    db_e80bw_h: number;
    ruas: string;
    jalur: string;
    seksi: string;
    jenis: string;
    nama: string;
    km: string;
    pnjng_km: number;
    pnjng_shp: number;
    jns_prkrs: string;
    jml_lajur: string;
    lljr_lln_m: string;
    lbhu_dlm_m: string;
    lbhu_lr_m: string;
    l_median_m: string;
    l_row_m: string;
    status: string;
    sub_status: string;
    region: string;
    bujt: string;
    kodefikasi: string;
    no: number;
    id_tarif: string;
    kabupaten: string;
    provinsi: string;
    keterangan: string;
    tahun: number;
    st_length_: number;
    sync_state: number;
    video?: any;
    sta_hibah?: any;
    Shape__Length: number;
}
interface Geometry {
    type: string;
    coordinates: number[][];
}
interface Crs {
    type: string;
    properties: Properties;
}
interface Properties {
    name: string;
}