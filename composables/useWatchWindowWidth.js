export function useWatchWindowWidth() {
    const windowWidth = ref(window?.innerWidth);
    
    const watchWindowWidth=()=>{
        
        onMounted(() => { 
            window.addEventListener("resize", updateWidth);
            window.addEventListener("orientationchange", updateWidth);
            window.addEventListener("change", updateWidth);

        });
        onUnmounted(() => {
            window.removeEventListener("resize", updateWidth);
            window.removeEventListener("orientationchange", updateWidth);
            window.removeEventListener("change", updateWidth);
        });
    };
    return {watchWindowWidth, windowWidth };
}