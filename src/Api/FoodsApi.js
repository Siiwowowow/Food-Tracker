export const foodsApiPromise=email=>{
    return fetch(`http://localhost:3000/foods?email=${email}`,{
        credentials:'include'
    }).then(res=>res.json())
}