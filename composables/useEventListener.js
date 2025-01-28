export function useEventListener(eventType, callback, target = document) {
    onMounted(()=>{
        target.addEventListener(eventType, callback);
    });
    onBeforeUnmount(() => {
        target.removeEventListener(eventType, callback);
    });
}