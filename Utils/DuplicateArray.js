function removeDuplicatesInArray(arr)
{
    let result = [];

    for( i = 0 ; i < arr.length ; i++)
    {
        let found = false;

        for( j = 0; j < arr.length; j++)
        {
            if(arr[i] === result[j])
            {
                found = true;
                break;
            }

        }

        if(!found)
        {
            result.push(arr[i]);
        }
    }
    return result;
}

// let array = [1,2,3,4,4,55,6,6,7]
// console.log(duplicatesInArray(array));

function removeDuplicateString(str) 
{
    let result = '';

    for( i = 0 ; i < str.length ; i++)
    {
        let found = false;

        for( j = 0 ; j < str.length ; j++)
        {
            if(str[i] === result[j])
            {
                found = true;
                break;
            }
        }
        if(!found)
        {
             result += str[i];
        }
       
    }
    return result;
}

console.log(duplicateString("banana"));