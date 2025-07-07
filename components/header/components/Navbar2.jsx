import NavLink from "./NavLink"

const Navbar = ({ links, onLinkClick }) => (
    <div>
        <ul className='text-[16px] flex flex-col justify-center lg:flex-row items-center gap-8 font-semibold'>
            {links.map((link, index) => (
                <NavLink
                    key={index}
                    path={link.path}
                    pathName={link.pathName}
                    onClick={onLinkClick}
                />
            ))}
        </ul>
    </div>
)

export default Navbar;