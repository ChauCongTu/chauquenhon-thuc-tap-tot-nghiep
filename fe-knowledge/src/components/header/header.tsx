import { useEffect, useState } from "react"
import AvatarUser from "./users/user"
import { getCategories } from "../../modules/categories/service/service";
import { Link } from "react-router-dom";
import { Category } from "../../modules/categories/types/type";

const HeaderComponent = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    getCategories()
      .then((res: any) => {
        setCategories(res.data.data);
      });
  }, []);
  return (
    <div>
      <header className="bg-white shadow py-3 z-50">
        <div className="px-3 md:px-20 lg:px-40">
          <div className="flex justify-between items-center py-4 space-x-10">
            <div className="order-2 md:order-1">
              <Link to="/">
                <img className="h-8" src="https://tgl-sol.com/images/icons/header/logo-full.svg" alt="Logo" />
              </Link>
            </div>
            <Link to="/search" className="text-gray-400 hover:text-gray-400 lg:flex-1 mx-0 lg:mx-4 relative order-1 lg:order-2 cursor-pointer">
              <div className="hidden lg:block w-full px-4 py-2 rounded-full bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-blue-500">Tìm kiếm gì đó ...</div>
              <i className="fa-solid fa-magnifying-glass absolute right-3 top-[50%] translate-y-[-50%] text-gray-400 cursor-pointer"></i>
            </Link>
            <div className="items-center order-3">
              <Link to="#">
                <AvatarUser />
              </Link>
            </div>
          </div>
          <nav className="hidden lg:block mt-2">
            <ul className="flex space-x-5">
              <li><Link to="/" className="text-gray-600 hover:text-indigo-800">TRANG CHỦ</Link></li>
              {/* <li><Link to="/danhMuc" className="text-gray-600 hover:text-indigo-800">DANH MỤC</Link></li> */}
              {
                categories.map((value) => {
                  return (
                    <li key={value.id}><Link to={`/danh-muc/${value.slug}`} className="text-gray-600 uppercase hover:text-indigo-800">{value.name}</Link></li>
                  );
                })
              }
            </ul>
          </nav>
        </div>
      </header>
    </div>
  )
}

export default HeaderComponent