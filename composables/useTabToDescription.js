import { useDescriptionInput } from './useDescriptionInput'; 
export function useTabToDescription() {
   const { descriptionInputRef, editDescription, focusDescriptionInput } = useDescriptionInput();
    const tabToDescription = (event)=>{
        if(event.key==="Tab"){
            event.preventDefault();
            focusDescriptionInput();
        }
    };
    return { tabToDescription, descriptionInputRef, editDescription, focusDescriptionInput};
}