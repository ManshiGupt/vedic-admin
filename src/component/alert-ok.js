import React, { useEffect } from 'react';
import { Modal } from 'antd';

function AlertModelOk({ showAlert, closeAlert, action }) {

    
    return (
        <div>
            <Modal
                title="Are you sure?"
                open={showAlert}
                onOk={closeAlert}
                closeIcon={null}
                okText={"No"}
                cancelText={"Yes"}
                maskClosable={false}
                onCancel={action}>

                <p>
                    This action will permanently delete this data from the server, and it cannot be retrieved.
                    Are you sure you want to proceed?
                </p>

            </Modal>
        </div>
    )


}

export default AlertModelOk;
