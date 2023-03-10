import Inventory2Icon from "@mui/icons-material/Inventory2";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";

export default [
    {
        name: 'سایر',
        tag: 'other',
        icon: <Inventory2Icon/>,
        list: [
            {name: 'گیفت کارت', link: 'cat/giftcard'},
            {name: 'لایسنس قانونی', link: 'cat/license'},
        ]
    },
    {
        name: 'بازی',
        tag: 'game',
        icon: <SportsEsportsIcon/>,
        list: [
            {name: 'نینتندو سوییچ', link: 'cat/switch'},
            {name: 'پلی استیشن', link: 'cat/playstation'},
            {name: 'ایکس باکس', link: 'cat/xbox'},
        ]
    },
    {
        name: 'کنسول و لوازم جانبی',
        tag: 'console',
        icon: <VideogameAssetIcon/>,
        list: [
            {name: 'کنسول', link: 'cat/console'},
            {name: 'لوازم جانبی', link: 'cat/accessories'},
        ]
    },
];