import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLayout = () => {
    const { axios, navigate } = useAppContext();

    const sidebarLinks = [
        { name: "Add Product", path: "/seller", icon: assets.add_icon },
        { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
        { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/seller/logout');
            if (data.success) {
                toast.success(data.message);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col h-screen">
         
            <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-card border-b border-gray-200 shadow-sm">
                <Link to="/">
                    <img src={assets.logo} alt="logo" className="cursor-pointer w-28 md:w-36" />
                </Link>
                <div className="flex items-center gap-4 md:gap-6 text-gray-700">
                    <p className="font-medium">Hi Admin!</p>
                    <button
                        onClick={logout}
                        className="border border-gray-300 rounded-full px-4 py-1 text-sm hover:bg-primary/10 hover:border-primary transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>

        
            <div className="flex flex-1 overflow-hidden">
           
                <div className="md:w-64 w-16 bg-card border-r border-gray-200 h-full flex flex-col pt-6">
                    {sidebarLinks.map((item) => (
                        <NavLink
                            to={item.path}
                            key={item.name}
                            end={item.path === "/seller"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3 px-4 rounded-lg mx-2 mb-2 transition-all ${
                                    isActive
                                        ? "bg-primary/10 text-primary border-l-4 border-primary md:border-l-0 md:border-r-4"
                                        : "hover:bg-gray-100 text-gray-700"
                                }`
                            }
                        >
                            <img src={item.icon} alt={item.name} className="w-6 h-6" />
                            <p className="md:block hidden font-medium">{item.name}</p>
                        </NavLink>
                    ))}
                </div>

                
                <div className="flex-1 overflow-y-scroll no-scrollbar p-4 md:p-8 bg-bg">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SellerLayout;
