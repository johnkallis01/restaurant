export function useSortByPosition(){
    function sortByPosition(arr){
        return arr.sort((a,b)=>a.position - b.position);
    }
    return {sortByPosition};
}