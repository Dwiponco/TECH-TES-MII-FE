import { useState, useEffect } from 'react';
import MasterDataEditModal from './local-components/master-data.edit.modal';
import MasterDatatable from './local-components/master-data.table';
import { Button, Input, Modal, Space } from 'antd';
import { Plus } from 'lucide-react';
import { SearchOutlined } from '@ant-design/icons';
import { addRuas, deleteRuas, getAllRuas, updateRuas } from './local-service/service';
import { useLoadingContext } from '@/store/loading';
import Loading from '@/components/layout/loading';
import MasterDataDetailModal from './local-components/master-data.detail.modal';

export interface Item {
    id: number;
    unit_id: number;
    ruas_name: string;
    long: number;
    km_awal: string;
    km_akhir: string;
    photo_url: string;
    doc_url: string;
    status: string;
}

const defaultItem: Item = {
    id: 0,
    unit_id: 0,
    ruas_name: "",
    long: 0,
    km_awal: "",
    km_akhir: "",
    photo_url: "",
    doc_url: "",
    status: "",
};

const MasterDataPage = () => {
    const { loading, startLoading, stopLoading } = useLoadingContext();

    const [data, setData] = useState<Item[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [isModalAction, setIsModalAction] = useState(false);
    const [isModalDetail, setIsModalDetail] = useState(false);
    const [detailData, setDetailData] = useState<Item>(defaultItem);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const handleToggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const handleOpenModal = (record: Item | null) => {
        setDetailData(record ?? defaultItem);
        setIsModalAction(true);
    };

    const handleOpenModalDetail = (record: Item | null) => {
        setDetailData(record ?? defaultItem);
        setIsModalDetail(true);
    };

    const handleModalAction = () => {
        setIsModalAction(false);
        setDetailData(defaultItem);
    };

    const handleModalDetail = () => {
        setIsModalDetail(false);
        setDetailData(defaultItem);
    };

    const handleAddRuas = (updatedData: FormData) => {
        startLoading()
        addRuas(updatedData)
            .then(response => {
                const { data, status, message } = response.data;
                if (status) {
                    Modal.success({
                        title: message,
                        content: (
                            <div>
                                <p><strong>Unit</strong>: {data.unit_id}</p>
                                <p><strong>Ruas Name</strong>: {data.ruas_name}</p>
                                <p><strong>Long</strong>: {data.long}</p>
                                <p><strong>Lokasi</strong>: {`${data.km_awal} - ${data.km_akhir}`}</p>
                            </div>
                        ),
                        onOk: () => {
                            setCurrentPage(1);
                            fetchData(1, pageSize);
                        }
                    });
                }
            })
            .catch(error => {
                const { data } = error.response;
                if (data) {
                    Modal.error({
                        title: "Failed",
                        content: (
                            <div>
                                {data.message.map((val: any, index: number) => (
                                    <p key={index}>{val}</p>
                                ))}
                            </div>
                        )
                    });
                }
            })
            .finally(() => { stopLoading() })
        handleModalAction();
    };

    const handleUpdateRuas = (id: number, updatedData: FormData) => {
        startLoading()
        updateRuas(id, updatedData)
            .then(response => {
                const { data, status, message } = response.data;
                if (status) {
                    Modal.success({
                        title: message,
                        content: (
                            <div>
                                <p><strong>Unit</strong>: {data.unit_id}</p>
                                <p><strong>Ruas Name</strong>: {data.ruas_name}</p>
                                <p><strong>Long</strong>: {data.long}</p>
                                <p><strong>Lokasi</strong>: {`${data.km_awal} - ${data.km_akhir}`}</p>
                            </div>
                        ),
                        onOk: () => {
                            fetchData(currentPage, pageSize);
                        }
                    });
                }
            })
            .catch(error => {
                const { data } = error.response;
                if (data) {
                    Modal.error({
                        title: "Failed",
                        content: (
                            <div>
                                {data.message.map((val: any, index: number) => (
                                    <p key={index}>{val}</p>
                                ))}
                            </div>
                        )
                    });
                }
            })
            .finally(() => { stopLoading() })
        handleModalAction();
    };

    const handleSave = (id: number, updatedData: FormData) => {
        if (detailData.id) {
            handleUpdateRuas(id, updatedData);
        } else {
            handleAddRuas(updatedData);
        }
    };

    const fetchData = (page: number, pageSize: number) => {
        startLoading()
        const params = {
            per_page: pageSize,
            page: page
        };
        getAllRuas(params)
            .then(response => {
                const { data, total } = response.data;

                if (data) {
                    setData(data.map((val: any, index: number) => ({
                        no: (page - 1) * pageSize + index + 1,
                        status: val.status === "1",
                        status_convert: val.status === "1" ? "Aktif" : "Tidak Aktif",
                        lokasi: `${val.km_awal} - ${val.km_akhir}`,
                        unit_kerja_convert: `Unit kerja ${val.unit_id}`,
                        ...val
                    })));
                    setTotalItems(total);
                }
            })
            .catch(error => {
                console.log("error ", error);
            })
            .finally(() => { stopLoading() })
    };

    const handleDelete = (dataDelete: Item) => {
        deleteRuas(dataDelete.id)
            .then(response => {
                const { data, status, message } = response.data;
                if (status) {
                    Modal.success({
                        title: message,
                        content: (
                            <div>
                                <p><strong>Unit</strong>: {dataDelete.unit_id}</p>
                                <p><strong>Ruas Name</strong>: {dataDelete.ruas_name}</p>
                                <p><strong>Long</strong>: {dataDelete.long}</p>
                                <p><strong>Lokasi</strong>: {`${dataDelete.km_awal} - ${data.km_akhir}`}</p>
                            </div>
                        ),
                        onOk: () => {
                            fetchData(currentPage, pageSize);
                        }
                    });
                }
            })
            .catch(error => {
                const { data } = error.response;
                if (data) {
                    Modal.error({
                        title: "Failed",
                        content: (
                            <div>
                                {data.message.map((val: any, index: any) => (
                                    <p key={index}>{val}</p>
                                ))}
                            </div>
                        )
                    });
                }
            });
    };

    useEffect(() => {
        fetchData(currentPage, pageSize);
    }, [currentPage, pageSize]);

    return (
        <div>
            {
                loading && (<Loading />)
            }
            <div className='flex justify-end mb-3'>
                <Space className={`mr-3 px-3 ${isSearchVisible ? '' : 'border rounded'}`}>
                    {isSearchVisible ? (
                        <Input.Search
                            placeholder="Search..."
                            onSearch={(e) => console.log(e)}
                            allowClear
                            style={{ width: 200 }}
                        />
                    ) : (
                        <SearchOutlined onClick={handleToggleSearch} style={{ cursor: 'pointer' }} />
                    )}
                </Space>
                <Button type="primary" onClick={() => handleOpenModal(null)}>
                    <Plus />
                    <span>Tambah Data</span>
                </Button>
            </div>

            <MasterDatatable
                data={data}
                totalItems={totalItems}
                onOpenModal={handleOpenModal}
                onOpenModalDetail={handleOpenModalDetail}
                onDelete={handleDelete}
                currentPage={currentPage}
                pageSize={pageSize}
                setCurrentPage={setCurrentPage}
                setPageSize={setPageSize}
            />

            <MasterDataEditModal
                isModal={isModalAction}
                isModalAction={handleModalAction}
                detailData={detailData}
                onSave={handleSave}
            />

            <MasterDataDetailModal
                isModal={isModalDetail}
                isModalAction={handleModalDetail}
                detailData={detailData}
            />
        </div>
    );
};

export { MasterDataPage };