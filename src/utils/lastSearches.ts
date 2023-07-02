const lastSearches: Array<string> = [];
const getLastSearches = () => {
    return lastSearches.reverse();
}

const addLastSearch = (playerName: string) => {
    if(lastSearches.length === 5) {
        lastSearches.shift();
    }
    lastSearches.push(playerName);
}

export { getLastSearches, addLastSearch }