function isAnagram(s,t)
{
    if(s.length !== t.length)
    {
        return false;
    }

    let arr = t.split("");

    for( i = 0 ; i < s.length; i++ )
    {
        let found = false;

        for(j = 0; j < arr.length; j++)
        {
            if(s[i] === arr[j])
            {
                arr[j] = '#';
                found = true;
                break;
            }
        }
        if(!found)
        {
            return false;
        }
    }
    return true;
}

console.log(isAnagram("joel","raer"));

