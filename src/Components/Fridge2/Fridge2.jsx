import React, { useEffect, useState } from 'react';
import FridgeCard from './FridgeCard';

const Fridge2 = () => {
    const [search,setSearch]=useState('')
    const [foods,setFoods]=useState([])
    useEffect(()=>{
        fetch(`http://localhost:3000/foods?searchParams=${search}`)
        .then(res=>res.json())
        .then(data=>setFoods(data))
    },[search])
    
    return (
        
        <div>
            <div>
                <input className='border-2 border-gray-300 rounded-md p-2' type="text" name="search" id="" placeholder='Search by title' required onChange={(e)=>setSearch(e.target.value)} />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            
            {
                foods.map(food=><FridgeCard key={food._id} food={food}></FridgeCard>)
            }

        </div>
        </div>
    );
};

export default Fridge2;