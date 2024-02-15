import SideNav from "../ui/dashboard/sidenav"; //../ui/dashboard/sidenav

// async function getCategoriesData() {
//   const res = await fetch('http://localhost:8080/categories')
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
 
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
 
//   return res.json()
// }

export default async function Layout({ children }: { children: React.ReactNode }) {
  
  // const data = await getCategoriesData()
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
