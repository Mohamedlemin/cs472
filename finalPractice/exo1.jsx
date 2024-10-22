
import React from 'react';

const Exo1 = ()=>{
    const [celsus,setCelsus] = useState(0);
    function TemperatureConvertor (value){
        setCelsus((9/5)*value+32)

    }
    return <di>
        <Input
        type:Number
        onChange={
            (e)=>{
                setCelsus((9/5)*e.target.value+32)
            }
        }
        
        />
        <p>
            {{celsus}}
        </p>
       
    </di>
}