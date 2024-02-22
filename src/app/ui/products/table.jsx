"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  TextInput,
  Label,
  Button,
  Select,
  Textarea,
} from "flowbite-react";
import { toast } from "react-toastify";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategories] = useState([]);
  const [state, setState] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setCategories]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setProducts]);

  const fetchProducts = () => {
    axios.get(`http://localhost:8080/products`).then((res) => {
      setProducts(res.data);
    });
  };

  const handleAddProducts = () => {
    const newProduct = {
      name: state.name,
      description: state.description,
      price: state.price,
      categoryID: categoryID,
    };
    axios
      .post("http://localhost:8080/products", newProduct)
      .then((res) => {
        console.log("PRODUCTS>>>", res.data);
        toast.success(res.data.message);
        fetchProducts();
      })
      .catch(console.error());
  };

  const handleDeleteProduct = (id) => {
    console.log("ID>>>", id)
    return
    axios.delete(`http://localhost:8080/products/${id}`)
    .then(response =>{
      toast.success(response.data.message);
      fetchProducts()
    })
    .catch(error =>{
      console.log(error)
    })
  }

  const onCloseModal = () =>{
    setOpenModal(false);
    setState("");
    setCategoryID("");
  }

  const onCloseDeleteProductModal = () =>{
    setOpenDeleteProductModal(false);
  }

  const handleChangeProductCategory = (e) => {
    setCategoryID(e.target.value);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
        <h3 className="px-6 py-3 m-6 text-xl text-black font-medium">
          Product List
        </h3>
        <Button className="m-6" onClick={() => setOpenModal(true)} color="blue">
          Add New Product
        </Button>
        <Modal show={openModal} size="md" onClose={onCloseModal} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3
                className="text-xl font-medium text-blue-900 dark:text-white"
                color="blue"
              >
                Add New Product
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
                <div className="mb-2 block">
                  <Label htmlFor="catgeory" value="Category" />
                </div>
                <Select
                  onChange={handleChangeProductCategory}
                  value={categoryID}
                  name="options"
                  required
                >
                  <option>Choose Category</option>
                  {categories.map((category) => {
                    return (
                      <option
                        key={category.id}
                        value={category.id}
                        name="options"
                      >
                        {category.name}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Price" />
                </div>
                <TextInput
                  id="price"
                  type="number"
                  value={state.price}
                  name="price"
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
              <div className="w-full">
                <Button color="blue" onClick={handleAddProducts}>
                  Submit
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4">
                    {categories.map((cat) =>
                      product.categoryID === cat.id ? cat.name : ""
                    )}
                  </td>
                  <td className="px-6 py-4">${product.price}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      onClick={() => {setOpenDeleteProductModal(true)}}
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
                              onClick={() => handleDeleteProduct(product.id)}
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
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
