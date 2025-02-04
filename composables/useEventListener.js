export function useEventListener(eventType, callback) {
    onMounted(()=>{
        document.addEventListener(eventType, callback);
    });
    onBeforeUnmount(() => {
        document.removeEventListener(eventType, callback);
    });
}