//randomly shuffles an array
export const shuffle = (unshuffled) => {
    const new_array = unshuffled.map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
    return new_array;
  
}