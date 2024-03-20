import { Link } from "react-router-dom"

const FooterComponent = () => {
  return (
    <div className="mt-5 pt-5 border-t-2">
      <div className="text-center my-5 text-gray-500">&copy; 2024 TGL Solutions - Demo New Application By <Link className="text-gray-500 hover:text-gray-500 hover:underline" to={'https://facebook.com/xoxvp'}>NhonCQ</Link></div>
    </div>
  )
}

export default FooterComponent