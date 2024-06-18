import { useLoadingContext } from "@/store/loading"
import { Button, Modal } from "antd"
import { CircleCheck, CircleX } from "lucide-react"
import { Item } from "../master-data.view";
import { GetOneRuas } from "../local-service/service";
import { Fragment, useEffect, useState } from "react";
import Loading from "@/components/layout/loading";
import { MasterDataDetailTypes } from "../local-type/master-data.type";

interface MasterDataDetailModalProps {
    isModal: boolean;
    isModalAction: () => void;
    detailData: Item;
}

const MasterDataDetailModal = (props: MasterDataDetailModalProps) => {
    const { detailData, isModalAction, isModal } = props
    const { loading, startLoading, stopLoading } = useLoadingContext();
    const [dataDetailRuas, setDataDetailRuas] = useState<MasterDataDetailTypes>()

    const handleGetOneRuas = () => {
        if (isModal && detailData.id) {
            startLoading()
            GetOneRuas(detailData.id)
                .then(response => {
                    const { data, status } = response.data;
                    if (status) setDataDetailRuas(data)
                })
                .catch(() => {
                    isModalAction()
                    Modal.error({
                        title: 'Failed get data',
                        content: "Failed get data. Please try again or contact our support."
                    })
                })
                .finally(() => { stopLoading() })
        }
    };

    useEffect(() => {
        handleGetOneRuas()
    }, [isModal, detailData])

    return (
        <Fragment>
            {
                loading && (<Loading />)
            }
            <Modal
                open={isModal}
                footer={false}
                onCancel={isModalAction}
            >
                <div>
                    <div>
                        <div className="flex">
                            <h3 className=" text-xl font-bold">Unit {dataDetailRuas?.id}</h3>
                            {
                                dataDetailRuas?.status === "1" ?
                                    <div className=" bg-green-500 text-white items-center flex px-3 rounded-full ml-3">
                                        <CircleCheck size={16} className="mr-1" />
                                        Aktif
                                    </div>
                                    :
                                    <div className=" bg-red-500 text-white items-center flex px-3 rounded-full ml-3">
                                        <CircleX size={16} className="mr-1" />
                                        Tidak aktif
                                    </div>
                            }
                        </div>
                        <h4 className=" text-lg">{dataDetailRuas?.unit.unit}</h4>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div>
                        <p className=" text-lg"><strong>{detailData.ruas_name}</strong></p>
                        <p>Panjang <strong>{detailData.long}</strong></p>
                        <p>Lokasi <strong>{detailData.km_awal} - {detailData.km_akhir}</strong></p>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <Button onClick={() => window.open(detailData.photo_url, '_blank')}>Lihat</Button>
                    <Button onClick={() => window.open(detailData.photo_url, '_blank')}>Download</Button>
                </div>
            </Modal>
        </Fragment>
    )
}

export default MasterDataDetailModal