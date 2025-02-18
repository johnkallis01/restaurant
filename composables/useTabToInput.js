export function useTabToInput(focusInput) {
    function tabToInput(event){
        if(event.key==="Tab"){
            console.log('tab')
            event.preventDefault();
            focusInput();
        }
    };
    return tabToInput;
}