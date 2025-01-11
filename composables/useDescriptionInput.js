export function useDescriptionInput() {
    const descriptionInputRef = ref(null);
    const editDescription = ref(false); 
    const focusDescriptionInput = () => {
      editDescription.value = true;
      nextTick(() => {
        if (descriptionInputRef.value) {
            descriptionInputRef.value.focus();
        }
      });
    };
    return { descriptionInputRef, editDescription, focusDescriptionInput };
  }