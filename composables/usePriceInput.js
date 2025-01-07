export function usePriceInput() {
    const priceInputRef = ref(null);
    const editPrice = ref(false);

    const focusPriceInput = () =>{
        editPrice.value=true;
        requestAnimationFrame(()=>{
            if(priceInputRef.value) {
                priceInputRef.value.focusInput();
            }
        });
    };
    return { priceInputRef, editPrice, focusPriceInput }
}