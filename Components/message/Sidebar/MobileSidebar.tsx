'use client';


import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItems";
import useConversation from "@/hooks/useConversation";


const MobileSidebar = () => {
    const routes = useRoutes();
    const { isOpen } = useConversation();

    if (isOpen) {
        return null;
    }

    return (
        <div
            className="
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        bg-white 
        border-t-[1px] 
        lg:hidden
      "
        >
            {routes.map((route) => (
                <MobileItem
                    key={route.herf}
                    href={route.herf}
                    active={route.active}
                    icon={route.icon}
                    onClick={route.onClick}
                />
            ))}
        </div>
    );
}

export default MobileSidebar;