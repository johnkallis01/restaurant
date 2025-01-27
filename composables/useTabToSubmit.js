export function useTabToSubmit() {
    const buttonRef=ref(null);
    const tabToSubmit = (event) =>{
        event.preventDefault();
        nextTick(() => {
            if (buttonRef.value) {
              buttonRef.value.focus();
              buttonRef.value.click();
            }}); 
      }
    return { tabToSubmit, buttonRef};
}