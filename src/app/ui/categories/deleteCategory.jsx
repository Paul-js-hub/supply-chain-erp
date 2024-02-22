"use client";

import { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DeleteCategory({ id, deleteCategory }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  return (
    <>
      <a
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
        onClick={() => setOpenDeleteModal(true)}
      >
        Delete
      </a>
      <Modal
        show={openDeleteModal}
        size="md"
        onClose={onCloseDeleteModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this category?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => deleteCategory(id)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={onCloseDeleteModal}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
