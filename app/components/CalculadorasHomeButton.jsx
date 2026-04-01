import { Image } from "@shopify/hydrogen";
import { LuChevronLeft } from "react-icons/lu";
import { useLocation } from "react-router";

export function CalculadorasHomeButton() {
    const location = useLocation();

    return (
        <div className="flex items-center rounded-sm p-1 text-4xl text-primary">
            {location.pathname !== '/calculadoras' && <span className="m-[-12px]"><LuChevronLeft /></span>}
            <Image src="/public/images/logo-effluz.png" alt="Effluz Logo" width={64} height={64} />
            <Image src="/public/images/sello-taylin.png" alt="Taylin Logo" width={64} height={64} />
        </div>
    );
};
