import React, { useState } from "react";
import { Button, Modal } from "antd";
import Input from "antd/es/input/Input";

function newFaq({ showModel, closeModel, data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          readOnly={isReadOnly}
        />
      </Modal>
    </>
  );
}

export default newFaq;
