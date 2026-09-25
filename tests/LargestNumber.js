function isLargestNumber(arr)
{
    for ( let i = 0; i < arr.length ; i++ )
    {
        let isLargest = true;

        for(let j = 0 ; j < arr.length; j ++)
        {
            if( arr[j] > arr[i])
            {
                isLargest = false;
                break;
            }
        }

        if(isLargest)
        {
            return arr[i];
        }
    }
}

// let array = [1,2,398,55,5,6];
// console.log(isLargestNumber(array))

function sortArray(arr)
{
    let newArray = arr.sort((a,b) => a - b);
    let length = newArray.length;
    return newArray[length - 2];
}

let array = [1,2,398,55,5,6];
console.log(sortArray(array))