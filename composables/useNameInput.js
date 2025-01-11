export function useNameInput() {
  const nameInputRef = ref(null); // Ref for the input element
  const editName = ref(false); // Tracks if the input is in edit mode

  const focusNameInput = () => {
    editName.value = true; // Set edit mode to true
    nextTick(() => {
      if (nameInputRef.value) {
        nameInputRef.value.focus(); // Safely focus the input
      }
    });
  };

  return { nameInputRef, editName, focusNameInput };
}