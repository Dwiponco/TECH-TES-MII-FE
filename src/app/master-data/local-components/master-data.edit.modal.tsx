import { useEffect, useState } from 'react';
import { Form, Modal, Switch, Input, Button, Upload, Col, Row } from 'antd';
import { Item } from '../master-data.view';
import { GetOneRuas } from '../local-service/service';

interface MasterDataEditModalProps {
    isModal: boolean;
    isModalAction: () => void;
    detailData: Item;
    onSave: (id: number, updatedData: FormData) => void;
}

const MasterDataEditModal = (props: MasterDataEditModalProps) => {
    const { isModal, isModalAction, detailData, onSave } = props;
    const [form] = Form.useForm();
    const [photoFile, setPhotoFile] = useState<any[]>([]);
    const [docFile, setDocFile] = useState<any[]>([]);

    const handleGetOneRuas = () => {
        if (isModal && detailData.id) {
            GetOneRuas(detailData.id)
                .then(response => {
                    const { data, status } = response.data;
                    if (status) {
                        form.setFieldsValue({
                            ...data,
                            status: data.status === "1"
                        });
                    }
                })
                .catch(() => {
                    isModalAction()
                    Modal.error({
                        title: 'Failed get data',
                        content: "Failed get data. Please try again or contact our support."
                    })
                })
        }
    };

    useEffect(() => {
        handleGetOneRuas();
    }, [isModal, detailData, form]);

    const handleSave = () => {
        form
            .validateFields()
            .then(values => {
                const formData = new FormData();
                if (detailData.id != 0) {
                    formData.append('_method', 'PUT');
                }
                formData.append('ruas_name', values.ruas_name);
                formData.append('km_awal', values.km_awal);
                formData.append('km_akhir', values.km_akhir);
                formData.append('unit_id', values.unit_id);
                formData.append('status', values.status ? '1' : '0');
                formData.append('long', values.long);

                if (photoFile.length > 0) {
                    formData.append('photo', photoFile[0].originFileObj);
                }

                if (docFile.length > 0) {
                    formData.append('file', docFile[0].originFileObj);
                }

                onSave(detailData.id, formData);
                form.resetFields()
                isModalAction();
            })
            .catch(info => {
                console.log(info);
            });
    };

    const handleCancel = () => {
        form.resetFields();
        setPhotoFile([]);
        setDocFile([]);
        isModalAction();
    };

    const getFile = (e: any) => {

        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    return (
        <Modal
            title={detailData.id ? 'Edit Data' : 'Add Data'}
            open={isModal}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={() => {
                    isModalAction()
                    form.resetFields()
                }}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Save
                </Button>,
            ]}
            width={900}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item
                            label="Ruas"
                            name="ruas_name"
                            rules={[{ required: true, message: 'Ruas is required' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Lokasi Awal"
                            name="km_awal"
                            rules={[{ required: true, message: 'Lokasi Awal is required' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Lokasi Akhir"
                            name="km_akhir"
                            rules={[{ required: true, message: 'Lokasi Akhir is required' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Panjang"
                            name="long"
                            rules={[{ required: true, message: 'Panjang is required' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Unit Kerja"
                            name="unit_id"
                            rules={[{ required: true, message: 'Unit Kerja is required' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Status"
                            name="status"
                            valuePropName="checked"
                            initialValue={detailData.status === "1"}
                        >
                            <Switch />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={32}>
                    <Col span={12}>
                        <Form.Item
                            label="Upload Foto"
                            valuePropName='fileDoc'
                            name={"fileDoc"}
                            rules={[
                                {
                                    required: !detailData.id,
                                    message: 'Foto is required'
                                }
                            ]}
                        >
                            <Upload
                                maxCount={1}
                                beforeUpload={() => false}
                                onChange={(e) => setPhotoFile(e.fileList)}
                                onRemove={() => {
                                    setPhotoFile([]);
                                }}
                                accept="image/jpeg,image/jpg,image/bmp,image/png,image/gif"
                            >
                                <Button>Pilih Foto</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Upload Dokumen"
                            valuePropName='docFile'
                            name={"docFile"}
                            getValueFromEvent={getFile}
                            rules={[
                                {
                                    required: !detailData.id,
                                    message: 'Dokumen is required'
                                }
                            ]}
                        >
                            <Upload
                                maxCount={1}
                                beforeUpload={() => false}
                                onChange={(e) => setDocFile(e.fileList)}
                                onRemove={() => {
                                    setDocFile([]);
                                }}
                                accept="application/pdf,
                                application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                                application/vnd.openxmlformats-officedocument.presentationml.presentation,
                                application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            >
                                <Button>Pilih Dokumen</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default MasterDataEditModal;
