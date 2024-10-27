import { Modal } from "antd";
import React from "react";

const NoNetworkModal = ({ open, onOkayClick }) => {
  return (
    <Modal
      title="No Network Detected"
      centered
      closable={false}
      open={open}
      style={{ borderRadius: "1px" }}
      onOk={onOkayClick}
    >
      <p>
        Please make sure your hardhat node is running, try `npx hardhat node`
      </p>
    </Modal>
  );
};

export default NoNetworkModal;
