import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from '../Components/ContextReducer';

export default function Card(props) {
    
    let options = props.options || {};
    let data=useCart()
    let priceOptions = Object.keys(options)
    const [quantity,setQuantity] = useState(1)
    const [size,setSize] = useState("")
    let dispatch = useDispatchCart()
    const priceRef =useRef()

    const handleCart = async () => {
        await dispatch({
            type: "ADD",
            payload: {
                id: props.foodItem._id,
                name: props.foodItem.name,
                price: finalPrice,
                quantity: quantity,
                size: size,
            },
        });
        console.log("Hiii", data);
    };
    
    let finalPrice = quantity * parseInt(options[size])
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
    return (
        <div>
            <div className="card mt-3 " style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"180px",objectFit:"fill"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    {/* <p className="card-text"></p> */}
                    <div className='container w-100'>
                        <select className='m-2 h-100  bg-success rounded' onChange={(e)=>setQuantity(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100  bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {priceOptions.map((data)=>(
                                <option key={data} value={data}>{data}</option>
                            ))}
                        </select>

                        <div className='d-inline h-100 fs-5'>
                            &#8377;{finalPrice}/-
                        </div>
                        <hr />
                        <button className='btn btn-success justifycenter' onClick={handleCart}>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
