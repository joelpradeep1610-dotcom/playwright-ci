// reverse a string 

function reverseString(str)
{
    let newString = '';

    for (let i = str.length - 1 ; i >= 0 ; i--)
    {
        newString += str[i];
    }
    return newString
}

console.log(reverseString("Joel"));

// check if palindrome

function isPalindrome(str)
{
    let newString = '';

    for (let i = str.length - 1 ; i >= 0 ; i--)
    {
        newString += str[i];
    }
    if (newString === str )
    {
        return "Give string is a palindrome"
    }
    else return "Given String is not a palindrome";
}
 
// console.log(isPalindrome('abc'));

function countCharacters(str)
{
    let visited = "";
    for(i = 0; i < str.length; i++)

    {
        if(visited.includes(str[i]))
    {
        continue;
    }
        
        let count = 0;

        for(j = 0; j < str.length; j++)
          {
            if(str[i] === str[j])
            {
                count++;
            }
          }
          visited += str[i];
          console.log(str[i]+ " : " + count);
    }
}

// countCharacters("banana");

function findDuplicates(str)
{
    const duplicates = 
    str.split("").filter((char,index,array) => array.indexOf(char) !== index)
    .filter((char,index,array) => array.indexOf(char) === index);
    return duplicates;
}

// console.log(findDuplicates("joelpradeep"));

function findDuplicates2(str)
{
    const seen = [];
    const duplicates = [];

    str.split("").forEach(char => { 
        if(seen.includes(char))
        {
            if(!duplicates.includes(char))
                {
                    duplicates.push(char)
                }
        }
        else{
            seen.push(char);
        }
        
        
    });
    return duplicates;
}


console.log(findDuplicates2("joelpradeep"));

function isAnagram(str1,str2)
{
    if(str1.length !== str2.length)
    {
        return false;
    }

    let arr2 = str2.split("");

    let isValid = true;

    str1.split("").forEach(char => 
    {
        if(arr2.includes(char))
        {
            arr2.splice(arr2.indexOf(char),1);
        }
        else { isValid = false;}
    });
    return isValid = true;
}