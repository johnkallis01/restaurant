import { usePriceInput } from './usePriceInput'; 
export function useTabToPrice() {
   const { priceInputRef, editPrice, focusPriceInput } = usePriceInput();
    const tabToPrice = (event)=>{
        if(event.key==="Tab"){
            event.preventDefault();
            focusPriceInput();
        }
    };
    return { tabToPrice, priceInputRef, editPrice, focusPriceInput};
}