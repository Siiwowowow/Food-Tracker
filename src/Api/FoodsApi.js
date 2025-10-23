export const foodsApiPromise=email=>{
    return fetch(`https://a11-food-tracker-crud-server.vercel.app/foods?email=${email}`,{
        credentials:'include'
    }).then(res=>res.json())
}