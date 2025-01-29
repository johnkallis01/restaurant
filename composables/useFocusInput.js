export function useFocusInput(theRef, flag) {
    const focusInput = () => {
      // console.log(theRef.value)
      if(flag) flag.value=true;
      nextTick(() => {
        if (theRef.value) theRef.value?.focus();
      });
    };
    return focusInput;
  }