export function usePriceFormatter(){
    const formatPrice=(price)=>{
        if(price[0] === "0") {
            price = price.replace(0,"");
            if(price[0] === "0") price = price.replace(0,"");
        }
        return "$" + price;
    }
    return { formatPrice };
}