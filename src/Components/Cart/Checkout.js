import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const Checkout = (props) => {   

    const [userInfo, setUserInfo] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    })


    const inputNameRef = useRef();
    const inputStreetRef = useRef();
    const inputPostalRef = useRef();
    const inputCityRef = useRef();


    const isEmpty = (value) => {
       return value.trim() === ''   
    }

    const isSixChars = (value) => value.trim().length === 6;

 

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredName = inputNameRef.current.value;
        const enteredStreet = inputStreetRef.current.value;
        const enteredPostalCode = inputPostalRef.current.value;
        const enteredCity = inputCityRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);
        const enteredCityIsValid = !isEmpty(enteredCity);
 
        setUserInfo({
          name: enteredNameIsValid,
          street: enteredStreetIsValid,
          postalCode: enteredPostalCodeIsValid,
          city: enteredCityIsValid,
        });
        
        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid

        if(!formIsValid) {
            return;
        }

        const userData = {
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostalCode,
            city: enteredCity
        }        

        props.onOrder(userData);

        
    }

    const nameControlClass = `${classes.control} ${
        userInfo.name ? '' : classes.invalid
    }`
    const streetControlClass = `${classes.control} ${
        userInfo.street ? '' : classes.invalid
    }`
    const postalCodeControlClass = `${classes.control} ${
        userInfo.postalCode ? '' : classes.invalid
    }`
    const cityControlClass = `${classes.control} ${
        userInfo.city ? '' : classes.invalid
    }`

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={nameControlClass}>
        <label htmlFor="name">Your Name</label>
        <input ref={inputNameRef} type="text" id="name" />
        {!userInfo.name && <p>Please Enter a Valid Name</p>}
      </div>
      <div className={streetControlClass}>
        <label htmlFor="street">Street</label>
        <input ref={inputStreetRef} type="text" id="street" />
        {!userInfo.street && <p>Please Enter a Valid Street Name</p>}
      </div>
      <div className={postalCodeControlClass}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={inputPostalRef} type="text" id="postal" />
        {!userInfo.postalCode && (
          <p>Please Enter a Valid Postal Code (6 digits)</p>
        )}
      </div>
      <div className={cityControlClass}>
        <label htmlFor="city">City</label>
        <input ref={inputCityRef} type="text" id="city" />
        {!userInfo.city && <p>Please Enter a Valid City Name</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
