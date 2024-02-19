"use client";
import { useEffect, useState } from "react";

import axios from "axios";
import { Modal, TextInput, Label, Button, Textarea } from "flowbite-react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function EditCategory({ categoryID }) {
  const [state, setState] = useState({
    name: "",
    description: "",
  });
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/categories`)
      .then((response) => {
        console.log("EDITCAT>>>", response.data)
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setCategories]);

  const updateCategory = () => {
    const newCategory = {
      name: state.name,
      description: state.description,
    };
    axios
      .put(`http://localhost:8080/categories/${categoryID}`, newCategory)
      .then((response) => {
        const message = response.data.message;
        setCategories(categories);
        toast.success(message)
      })
      .catch(console.error());
  };

  const onCloseUpdateModal = () => {
    setOpenUpdateModal(false);
  };

  return (
    <>
      <a
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
        onClick={() => setOpenUpdateModal(true)}
      >
        Edit
      </a>
      <Modal
        show={openUpdateModal}
        size="md"
        onClose={onCloseUpdateModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3
              className="text-xl font-medium text-blue-900 dark:text-white"
              color="blue"
            >
              Edit Category
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                id="product-name"
                value={state.name}
                name="name"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <div className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Description" />
                </div>
                <Textarea
                  id="decription"
                  placeholder="Provide a description..."
                  name="description"
                  value={state.description}
                  onChange={handleChange}
                  required
                  rows={4}
                />
              </div>
            </div>
            <div className="flex justify-center gap-4">
              <Button color="blue" onClick={updateCategory}>
                Save
              </Button>
              <Button color="gray" onClick={() => setOpenUpdateModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
