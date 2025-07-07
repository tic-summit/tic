import Link from "next/link"
import { usePathname } from "next/navigation"

const NavLink = ({ path, pathName, onClick }) => {
    const pathname = usePathname()
    const isActive = pathname === path


    return (
        <li>
            <Link
                href={path}
                className={`${isActive ? 'text-brand font-bold' : 'text-gray-700'}`}
                onClick={onClick}
            >
                {pathName}
            </Link>
        </li>
    )
}

export default NavLink