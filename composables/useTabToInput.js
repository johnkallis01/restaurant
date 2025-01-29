import { useFocusInput } from './useFocusInput'; 
export function useTabToInput(focusInput) {
    function tabToInput(event){
        if(event.key==="Tab"){
            event.preventDefault();
            focusInput();
        }
    };
    return tabToInput;
}