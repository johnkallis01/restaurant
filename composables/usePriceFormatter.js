export function usePriceFormatter(){
    function formatPrice(price){
        // console.log('price formatter', price)
        price=String(price);
        if(price[0] === "0") {
            price = price.replace(0,"");
            if(price[0] === "0") price = price.replace(0,"");
        }
        const index = price.indexOf('.');
        // console.log(index)
        // console.log(price)
        if(index > 0){
            if(price[index]===price[price.length-3]) return "$" + price;
            else if(index===0)  return "$0"+price; 
            else if (price[index]===price[price.length-2]) return "$" + price+"0";
            else return "$" + Number(price).toFixed(2);
        }else{
            if (price) return "$"  + price + ".00";
            else return "$0.00";
        }
    }
    return { formatPrice };
}