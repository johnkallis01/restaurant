export function useDescriptionInput() {
    const descriptionInputRef = ref(null); // Ref for the input element
    const editDescription = ref(false); // Tracks if the input is in edit mode
  
    const focusDescriptionInput = () => {
      editDescription.value = true; // Set edit mode to true
      nextTick(() => {
        if (descriptionInputRef.value) {
            descriptionInputRef.value.focus(); // Safely focus the input
        }
      });
    };
  
    return { descriptionInputRef, editDescription, focusDescriptionInput };
  }