export function useTabToButton(buttonRef) {
    function tabToButton(event){
        event.preventDefault();
        nextTick(() => {
            if (buttonRef.value) {
              buttonRef.value.focus();
              buttonRef.value.click();
            }}); 
      }
    return { tabToButton};
}