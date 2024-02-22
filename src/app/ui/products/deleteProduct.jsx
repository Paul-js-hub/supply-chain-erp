"use state";

import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Modal,Button } from "flowbite-react";

export default function DeleteProduct({id, handleDeleteProduct}) {
  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);

  const onCloseDeleteProductModal = () => {
    setOpenDeleteProductModal(false);
  };
  return (
    <>
      <a
        onClick={() => {
          setOpenDeleteProductModal(true);
        }}
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
      >
        Delete
      </a>
      <Modal
        show={openDeleteProductModal}
        size="md"
        onClose={onCloseDeleteProductModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDeleteProduct(id)}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={onCloseDeleteProductModal}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
