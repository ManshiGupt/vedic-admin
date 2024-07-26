import React from 'react'
import { Modal } from 'antd'

function FaqHelpModel( {showModel, closeModel, data}) {

    return (

        <Modal title={data.title} open={showModel} onCancel={closeModel} footer={null}>
            <div style={{marginTop: '20px'}} dangerouslySetInnerHTML={{ __html: data.descriptions }} />
        </Modal>

    )
}

export default FaqHelpModel