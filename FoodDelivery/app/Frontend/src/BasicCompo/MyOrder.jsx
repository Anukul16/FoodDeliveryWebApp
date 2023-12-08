import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function MyOrder() {
  const [orderData, setOrderData] = useState({});
  // const [loading, setLoading] = useState(true);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/myOrders", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail'),
        }),
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        const errorData = await response.json();
        console.error('Error data:', errorData);
        throw new Error('Failed to fetch');
      }

      const responseData = await response.json();
      setOrderData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  console.log('orderData:', orderData);
  return (
    <>
      <div><Navbar /></div>
      <div className="container">
        <div className="row">
          {
            Object.keys(orderData).length !== 0 ? Array(orderData).map(data => {
              return (
                data.orderData ?
                  data.orderData.order_data.slice(0).reverse().map((item,idx) => {
                    return (
                      item.map((arrayData) => {
                        return (
                          <div>
                            {arrayData.Order_date ?
                              <div className="m-auto mt-5">
                                {data = arrayData.Order_date}
                                <hr />
                              </div>
                              :
                              <div className="col-12 col-md-6 col-lg-3">
                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                  <div className="card-body">
                                    <h5 className='catd-title text-success'>{arrayData.name}</h5>
                                    <div className="container w-100 p-0" style={{ height: "38px" }}>
                                      <span className='m-1 text-success'>{arrayData.quantity}</span>
                                      <span className='m-1 text-success'>{arrayData.size}</span>
                                      <span className='m-1 text-success'>{data}</span>
                                      <div className="d-inline ms-2 h-100 w-20 fs-5 text-success">
                                        {arrayData.price}/-
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                          </div>
                        )
                      })
                    )
                  })
                  : ""
              )
            })
              : ""
          }
        </div>
      </div>
      <div><Footer /></div>
    </>
  );

}

export default MyOrder;
