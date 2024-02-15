"use client";
import { useEffect, useState } from "react";
import axios from 'axios';
import { Select } from "flowbite-react";

export default function CategorySelect({onSelect}){
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/categories')
    .then(response => {
      console.log("RRESPONSE>>>", response.data)
      setCategories(response.data)
    })
    .catch(error =>{
      console.log(error)
    })
  }, [])

  return (
    <Select onChange={e => onSelect(e.target.value)}>
    <option>Choose Category</option>
    {categories.map((category) => {
      return (
        <option key={category.id} value={category.id}>{category.name}</option>
      );
    })}
  </Select>
  );
}