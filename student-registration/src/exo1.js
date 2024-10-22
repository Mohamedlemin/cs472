
import React from 'react';
import { useState } from 'react';

const Exo1 = ()=>{
    const [Fahrenheit,setFahrenheit] = useState(0);
   
    return <div>
        <input
        type='number'
        onChange={
            (e)=>{
                setFahrenheit((9/5)*e.target.value+32)
            }
        }
        
        />
        <p>
            {Fahrenheit}
        </p>
       
    </div>
}

export default Exo1;