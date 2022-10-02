import ListIcon from "@mui/icons-material/List";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShopIcon from "@mui/icons-material/Shop";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default {
    products: (handleOpenCategory, handleOpenSearch) => [
        {
            text: 'دسته بندی',
            icon: <ListIcon/>,
            onClick: handleOpenCategory
        },
        {
            text: 'جستجو',
            icon: <SearchIcon/>,
            onClick: handleOpenSearch
        }
    ],
    user: [
        {
            text: 'حساب کاربری',
            icon: <PersonIcon/>,
            link: 'account'
        },
        {
            text: 'سبد خرید',
            icon: <ShopIcon/>,
            link: 'shoppingCart'
        }
    ],
    default: [
        {
            text: 'ورود',
            icon: <LoginIcon/>,
            link: 'login'
        },
        {
            text: 'ثبت نام',
            icon: <PersonAddIcon/>,
            link: 'signup'
        },
    ]
}