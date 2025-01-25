import { useNameInput } from './useNameInput'; 
export function useTabToName() {

   const { nameInputRef, editName, focusNameInput } = useNameInput();
    const tabToName = (event)=>{
        if(event.key==="Tab"){
            event.preventDefault();
            focusNameInput();
        }
    };
    return { tabToName, nameInputRef, editName, focusNameInput};
}