export function usePriceFormatter(){
    const formatPrice=(price)=>{
        price=String(price);
        if(price[0] === "0") {
            price = price.replace(0,"");
            if(price[0] === "0") price = price.replace(0,"");
        }
        const index = price.indexOf('.');
        if(price[index]===price[price.length-3]) return "$" + price;
        else if (price[index]===price[price.length-2]) return "$" + price+"0";
        else if (price[index]===price[price.length-1]) return "$" + price+"00";
    }
    return { formatPrice };
}