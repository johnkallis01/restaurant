export function useDetachObject(){
    const detachObject = (value) => {
        if(value==null || typeof value !=='object') return value;
        if(Array.isArray(value)) return value.map(detachObject);
        const detachedObject={};
        for(const key in value){
            if(value.hasOwnProperty(key)) detachedObject[key]=detachObject(value[key]);
        }
        return detachedObject;
        // return JSON.parse(JSON.stringify(value));
    }
    return { detachObject };
}
