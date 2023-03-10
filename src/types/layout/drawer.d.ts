interface DrawerItem {
    text: string,
    link: string,
    icon: any,
    onClick: () => void
}

export type DrawerList = DrawerItem[];

export default interface Drawer {
    open: boolean,
    onDrawerToggle: (state: boolean) => void
}