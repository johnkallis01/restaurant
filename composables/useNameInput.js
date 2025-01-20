export function useNameInput() {
  const nameInputRef = ref(null);
  const editName = ref(false);

  const focusNameInput = () => {
    editName.value = true;
    nextTick(() => {
      if (nameInputRef.value) {
        nameInputRef.value.focus();
      }
    });
  };

  return { nameInputRef, editName, focusNameInput };
}