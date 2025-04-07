import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../axios/usersAxios';
import { addNewUser } from '../redux/usersActions';
import { useDispatch } from 'react-redux';
export const Registration=()=>{
    const navigate=useNavigate();
 
    const [user, setUser] = useState({
        companyName: "",
        phoneNumber: "",
        representativeName: "",
       
    });
    const [products, setProducts] = useState([{ name: "", price: "", minQuantity: "" }]);
    const dispatch=useDispatch()

  

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];
       
        updatedProducts[index] = { ...updatedProducts[index], [field]: value };
        setProducts(updatedProducts);
        const payload = {
            companyName: user.companyName,
            phoneNumber: user.phoneNumber,
            representativeName: user.representativeName,
            products: products
        };
        console.log(payload);
        
        
        
      };
    
 
      const addProduct = () => {
        setProducts([...products, { name: "", price: "", minQuantity: "" }]);
      };
    
 
      const removeProduct = (index) => {
        setProducts(products.filter((_, i) => i !== index));
      };
  const registration=(e)=>{
    e.preventDefault();
    const payload = {
        companyName: user.companyName,
        phoneNumber: user.phoneNumber,
        representativeName: user.representativeName,
        products: products
    };
    addUser(payload)
             .then((x)=>{
               dispatch(addNewUser(x));
               navigate('/')
                  })
             .catch((err)=>console.log(err)); 
     
  }

    return<>
    <h1>הרשמה</h1>
    <div className="tab-pane fade show active container d-flex justify-content-center align-items-center" id="pills_register" role="tabpanel" aria-labelledby="tab-register">
     <form onSubmit={(e)=>registration(e)}>
     <div className="form-outline mb-4">
        <label className="form-label">שם חברה</label>
            <input type="text"  className="form-control" required onBlur={(x)=>setUser({...user,companyName:x.target.value})}/>
           
        </div>
        <div className="form-outline mb-4">
        <label className="form-label">מספר טלפון</label>
            <input type="text"  className="form-control" required onBlur={(x)=>setUser({...user,phoneNumber:x.target.value})}/>
           
        </div>
        <div className="form-outline mb-4">
        <label className="form-label"> שם נציג</label>
            <input type="text"  className="form-control" required onBlur={(x)=>setUser({...user,representativeName:x.target.value})}/>
           
        </div>
        <div className="form-outline mb-4">
        <label className="block text-gray-700">מוצרים שהספק יכול לספק</label>
        {products.map((product, index) => (
          <div key={index} className="mb-4">
            <TextField
              value={product.name }
              onChange={(e) => handleProductChange(index, "name", e.target.value)}
              label="שם המוצר"
              variant="outlined"
              required
              className="m-2"
            />
            <TextField
              value={product.price}
              onChange={(e) => handleProductChange(index, "price", e.target.value)}
              label="מחיר לפריט"
              variant="outlined"
              required
              type="number"
              className="m-2"
            />
            <TextField
              value={product.minQuantity}
              onChange={(e) => handleProductChange(index, "minQuantity", e.target.value)}
              label="כמות מינימלית לרכישה"
              variant="outlined"
              required
              type="number"
              className="m-2"
            />
        
           
            {products.length > 1 && (
              <Button onClick={() => removeProduct(index)} variant="destructive">
                ✖
              </Button>
            )}
          </div>
        ))}
        <Button variant="contained" onClick={addProduct} className="mt-2">
          הוסף מוצר
        </Button>
      </div>
       
        
      <button type="submit" className="btn btn-primary btn-block mb-4" >הרשם</button>
      <div className="text-center">
        <p >Already a member? <Link to="/my_login"> Login</Link></p>
        </div>
    </form> 
  </div> 
  </>
}