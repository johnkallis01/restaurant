export function useAROFlags(){
    const addOnsFlag = ref(false);
    const removesFlag = ref(false);
    const optionsFlag = ref(false);
    const commentsFlag = ref(false);
    function resetFlags(){
        addOnsFlag.value=false;
        removesFlag.value=false;
        optionsFlag.value=false;
        commentsFlag.value=false;
    }
    function viewAddOns(){ resetFlags(); addOnsFlag.value=true;}
    function viewRemoves(){ resetFlags(); removesFlag.value=true;}
    function viewOptions(){ resetFlags(); optionsFlag.value=true;}
    function viewComments(){ resetFlags(); commentsFlag.value=true;}
    return {addOnsFlag, removesFlag, optionsFlag, commentsFlag,viewOptions, resetFlags, viewAddOns, viewRemoves, viewComments };
}