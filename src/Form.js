import React ,{useState} from "react";
import PhoneInput from 'react-phone-number-input';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { successNotice, errorNotice } from "./notice";

const Form = (props) => {

    let [success, setSuccess] = useState(false);
    const [formValues ,setFormValues]=useState({
        uName:'',
        mobile:'',
        email:'',
      
    });
    
    const [error ,setError]=useState({
        uName:'',
        mobile:'',
        email:'',
       
    });



    function handleOnchange(event){
       
        if(event.target.value) {setFormValues({...formValues, [event.target.name]:event.target.value});}
        else{setFormValues({...formValues, [event.target.name]:''});}
        const errorMessage = validation(event.target.name,event.target.value);
        setError({...error,[event.target.name]:errorMessage});
    }

    function validation(x,y){
          
        switch(x){
            case 'uName' : 
                        if(!y){return 'username is required';}
                        else if(y.length <= 3 || y.length > 20){ return 'Username should be greater than 3 and  less than 20 character';}
                        else{return '';}
                        break;
            case 'mobile' : 
                        if(!y){return 'mobile is required';}
                        else if(y.length <3 || y.length > 10){ return 'Mobile should be greater than 3 and  less than 20 character';}
                        else{return '';}
                         break;
         
            case 'email' :
                       if(!y){return 'email is required';}
                        else if(y.length <3 || y.length > 20){ return 'Email should be greater than 3 and  less than 20 character';}
                        else{return '';}
                        break;   

            default: return '';


        }
    }



   const  submitHandler = (e) =>{
        e.preventDefault();
        console.log('success ',success);
     // map throught the FormValues

     let errObj={};
     Object.keys(formValues).forEach((item)=>{
        errObj = {...errObj,[item]:validation(item,formValues[item])}
       
    })
    
   
     setError({...error,...errObj});
        console.log('errObj' ,errObj);
     Object.keys(errObj).every((item)=>{
       
        if(errObj[item] !== ''){
            success=false;
            return false;
         }
         success=true;
         return true;
       
    })
   
    
        if(success){
            //API call shoul goes here
             successNotice('Success');
        }else{
            errorNotice('Error');
        }

   }



  return (
    <div className="formWrapper">
        <ToastContainer/>
        <h1>Form Validation Tutorial</h1>
        <form className="myClass" onSubmit={submitHandler}> 

        <div className="item">
        <input 
            name='uName'
            value={formValues.uName}
            type='text'
            placeholder="Abhay"
            onChange={handleOnchange}
        />
        <span className="placeSpan"> Username</span>
        {error.uName&&<span className="alert">{error.uName}</span>}
        </div>
    
        <div className="item">
        <input 
            name='mobile'
            value={formValues.mobile}
            type='text'
            placeholder="8109237701"
            onChange={handleOnchange}
        />
        <span className="placeSpan">Mobile</span>
         {error.mobile&&<span className="alert">{error.mobile}</span>}
        </div>
        <div className="item">
        <input 
            name='email'
            value={formValues.email}
            type='text'
            placeholder="abhay.vyas25@gmail.com"
            onChange={handleOnchange}
        />
         <span className="placeSpan">Email</span>
         {error.email&&<span className="alert">{error.email}</span>}
        </div>
        <div className="item">
        <button>Submit</button>
        </div>

        </form>
    </div>
  )
};

export default Form;
