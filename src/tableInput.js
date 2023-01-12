import React, { Component, useState } from "react";
import jsonCountries from './jsonCountries';
import jsonGenData from "./jsonGenData";
import { useToast } from "./toastprovider";


const TableInput = (props) => {

    const [showDialog, setShowDialog] = useState(false);
    const [formdata, setFormData] = useState({ username: '', email: '', age: '', country: '' });

    const { addToast } = useToast();

    const handleSubmit = event => {
        event.preventDefault();

        const errors = [];
        const errorPush = (title, content) => { errors.push({ title, content }) }

        if (!formdata.username) errorPush('Username', 'Empty name')
        if (!formdata.username.match(/^[a-zA-Z]+$/)) errorPush('Username', 'Contains illegal characters')


        if (!formdata.email) errorPush('Email', 'Empty email')

        let lastAtPos = formdata.email.lastIndexOf("@");
        let lastDotPos = formdata.email.lastIndexOf(".");
        if (
            !(
                lastAtPos < lastDotPos &&
                lastAtPos > 0 &&
                formdata.email.indexOf("@@") === -1 &&
                lastDotPos > 2 &&
                formdata.email.length - lastDotPos > 2
            )
        ) errorPush('Email', 'Email is not valid');


        if (!formdata.age) errorPush('Age', 'Empty age')


        if (!formdata.country) errorPush('Country', 'Empty country')
        if (!jsonCountries.find(item => item.name === formdata.country)) errorPush('Country', 'Illegal country')

        if (errors.length) {
            errors.forEach((error, index) => setTimeout(() => {
                addToast({ text: error.content, title: error.title })
            }, index * 85))

        } else {
            props.onAppendCallback(formdata);
        }

        /*
        send to BE
        */
    }

    const handleChange = event => {
        const target = event.target;
        const name = target.name;
        let value = target.value;

        if (validators[name](value)) return

        // if (name === 'country') target.focus();

        setFormData({ ...formdata, [name]: value })

    }

    const validators = {
        username: (value) => { },
        email: (value) => { },
        age: (value) => !(value.match(/^(\s*|\d+)$/) && value.length <= 3),
        country: (value) => { }
    }

    const countrySelector = (value) => {

        setFormData({ ...formdata, country: value })
        setShowDialog(false);
    }


    const listCountries = () => {
        if (!showDialog) return;
        if (formdata.country.length < 2) return;
        const filteredCountries = jsonCountries.filter(country => country.name.toLowerCase().includes(formdata.country.toLowerCase()));
        return (
            <div className='countryList'  >
                {
                    filteredCountries.map(country => <div className='countryItem' onClick={() => countrySelector(country.name)}>{country.name}</div>)
                }
            </div>
        )

    }


    return (
        <div className="input">
            {/* <b>{JSON.stringify(formdata)}</b> */}
            <form className="inputForm" autoComplete="off" onSubmit={handleSubmit}>
                <input name="username" type="text" placeholder="Username" value={formdata.username} onChange={handleChange} />
                <input name="email" type="text" placeholder="Email" value={formdata.email} onChange={handleChange} />
                <input name="age" type="text" placeholder="Age" value={formdata.age} onChange={handleChange} />
                <div className='countryWrapper'  >



                    <input name="country" type="text" placeholder="Country" value={formdata.country} onChange={handleChange}
                        onBlur={() => {
                            setTimeout(() => {
                                setShowDialog(false)
                            }, 120);
                        }} onFocus={() => { setShowDialog(true) }} />


                    <div className='countryDialog' > {listCountries()} </div>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )

}

export default TableInput;

