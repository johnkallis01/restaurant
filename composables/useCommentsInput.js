export function useCommentsInput() {
    const commentsRef = ref(null);
    const commentsFlag = ref(false);
  
    const focusCommentsInput = () => {
        commentsFlag.value = true;
      nextTick(() => {
        if (commentsRef.value) {
            commentsRef.value.focus();
        }
      });
    };
  
    return { commentsRef, commentsFlag, focusCommentsInput };
  }