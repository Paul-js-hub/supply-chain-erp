"use client";
import { useState } from "react";
import {
  Modal,
  TextInput,
  Label,
  Button,
  Select,
  Textarea,
} from "flowbite-react";
export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [state, setState] = useState({
    name: '',
    description: '',
    price: ''
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleAddProducts = (e) =>{
    setProducts([
      ...products,
      {name: state.name, description: state.description, price: state.price, selectedValue: selectedValue}
    ])
  }
  function onCloseModal() {
    setOpenModal(false);
    setState("");
    setSelectedValue("")
  }

  const categories = ["Electronics", "Food", "Clothing", "Computers", "Utensils", "Furniture"]

  const handleChangeProductCategory = (e) =>{
    setSelectedValue(e.target.value)
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
        <h3 className="px-6 py-3 m-6 text-xl text-black font-medium">Product List</h3>
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
                <Select onChange={handleChangeProductCategory} value={selectedValue} required>
                  <option>Choose Category</option>
                  {categories.map((category) => {
                    return (
                      <option key={category}>{category}</option>
                    );
                  })}
                </Select>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Price" />
                </div>
                <TextInput id="price" type="number" value={state.price} name="price" onChange={handleChange}required />
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
                <Button color="blue" onClick={handleAddProducts}>Submit</Button>
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
            <td className="px-6 py-4">{product.selectedValue}</td>
            <td className="px-6 py-4">${product.price}</td>
            <td className="px-6 py-4 text-right">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td> 
          </tr>
          </>);
          })}
        </tbody>
      </table>
    </div>
  );
}
