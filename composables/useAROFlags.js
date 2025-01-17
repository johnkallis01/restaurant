export function useAROFlags(){
    const addOnsFlag = ref(false);
    const removesFlag = ref(false);
    const optionsFlag = ref(false);
    const resetFlags = () => {
        addOnsFlag.value=false;
        removesFlag.value=false;
        optionsFlag.value=false;
    }
    const viewAddOns = ()=>{ resetFlags(); addOnsFlag.value=true;}
    const viewRemoves = ()=>{ resetFlags(); removesFlag.value=true;}
    const viewOptions = ()=>{ resetFlags(); optionsFlag.value=true;}
    return {addOnsFlag, removesFlag, optionsFlag, resetFlags, viewAddOns, viewRemoves, viewOptions };
}