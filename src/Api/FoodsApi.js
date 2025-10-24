export const foodsApiPromise=email=>{
    return fetch(`https://foodtracker-server-2.onrender.com/foods?email=${email}`,{
        credentials:'include'
    }).then(res=>res.json())
}