'use client'

import { useState } from "react"
export default function Page(){
  const [count, setCount] = useState(0);
  return (
    <div>
      <form>
    <input type="text" name="Name" />
    </form>
      <p>You clicked {count} times</p>
    <button onClick={() => setCount(count + 1)} className="btn btn-blue">click</button>
    </div>
  );
}