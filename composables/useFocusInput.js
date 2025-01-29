export function useFocusInput(theRef, flag) {
    const focusInput = () => {
      if(flag) flag.value=true;
      nextTick(() => {
        if (theRef.value) theRef.value?.focus();
      });
    };
    return focusInput;
  }