export function useTabToButton(buttonRef) {
    function tabToButton(event){
        event.preventDefault();
        // console.log('tab to button')
        nextTick(() => {
            if (buttonRef.value) {
              buttonRef.value.focus();
              buttonRef.value.click();
            }}); 
      }
    return { tabToButton};
}