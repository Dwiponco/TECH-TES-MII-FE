import { useEffect } from 'react';
import { Form, Modal, Switch, Input, Button } from 'antd';
import { Item } from '../master-data.view';

interface MasterDataEditModalProps {
    isModal: boolean;
    isModalAction: () => void;
    detailData: Item;
    onSave: (updatedData: Item) => void;
}

const MasterDataEditModal = (props: MasterDataEditModalProps) => {
    const { isModal, isModalAction, detailData, onSave } = props
    console.log("detailData ", detailData)
    const [form] = Form.useForm();

    useEffect(() => {
        if (isModal) {
            form.setFieldsValue(detailData || { ruas: '', unit_kerja: '', status: false });
        }
    }, [isModal, detailData, form]);

    const handleSave = () => {
        form
            .validateFields()
            .then(values => {
                onSave({ ...detailData, ...values } as Item);
                isModalAction();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title={detailData.key ? "Edit Data" : "Add Data"}
            open={isModal}
            onCancel={isModalAction}
            footer={[
                <Button key="cancel" onClick={isModalAction}>
                    Cancel
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Save
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Ruas"
                    name="ruas"
                    rules={[
                        {
                            required: true,
                            message: 'Ruas is required',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Unit Kerja"
                    name="unit_kerja"
                    rules={[
                        {
                            required: true,
                            message: 'Unit Kerja is required',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Status"
                    name="status"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default MasterDataEditModal;