import React, { Component } from "react";
import jsonCountries from './jsonCountries';


class TableInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showDialog: false,
            formdata: {
                username: '',
                email: '',
                age: '',
                country: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();
        const errors = [];

        if (!this.state.formdata.username) { errors.push('empty name') }
        if (!this.state.formdata.username.match(/^[a-zA-Z]+$/)) { errors.push('contains illegal characters') }


        if (!this.state.formdata.email) { errors.push('empty email') }

        let lastAtPos = this.state.formdata.email.lastIndexOf("@");
        let lastDotPos = this.state.formdata.email.lastIndexOf(".");
        if (
            !(
                lastAtPos < lastDotPos &&
                lastAtPos > 0 &&
                this.state.formdata.email.indexOf("@@") == -1 &&
                lastDotPos > 2 &&
                this.state.formdata.email.length - lastDotPos > 2
            )
        ) errors.push('Email is not valid');


        if (errors.length) {
            this.props.onAppendCallback(errors);

        } else {
            this.props.onAppendCallback(this.state.formdata);
        }

        /*
        send to BE
        */
    }

    handleChange = event => {
        const target = event.target;
        const name = target.name;
        let value = target.value;

        if (this.validators[name](value)) return

        // if (name === 'country') target.focus();

        this.setState({
            formdata: { ...this.state.formdata, [name]: value }
        });


    }

    validators = {
        username: (value) => { },
        email: (value) => { },
        age: (value) => !(value.match(/^(\s*|\d+)$/) && value.length <= 3),
        country: (value) => { }
    }

    countrySelector = (value) => {

        this.setState({
            formdata: { ...this.state.formdata, country: value }
        });
        this.state.showDialog = false;
    }


    listCountries = () => {
        if (!this.state.showDialog) return;
        if (this.state.formdata.country.length < 2) return;
        const filteredCountries = jsonCountries.filter(country => country.name.toLowerCase().includes(this.state.formdata.country.toLowerCase()));
        return (
            <div className='countryList'  >
                {
                    filteredCountries.map(country => <div className='countryItem' onClick={() => this.countrySelector(country.name)}>{country.name}</div>)
                }
            </div>
        )

    }

    render() {
        return (
            <div className="input">
                {/* <b>{JSON.stringify(this.state.formdata)}</b> */}
                <form className="inputForm" autoComplete="off" onSubmit={this.handleSubmit}>
                    <input name="username" type="text" placeholder="Username" value={this.state.formdata.username} onChange={this.handleChange} />
                    <input name="email" type="text" placeholder="Email" value={this.state.formdata.email} onChange={this.handleChange} />
                    <input name="age" type="text" placeholder="Age" value={this.state.formdata.age} onChange={this.handleChange} />
                    <div className='countryWrapper'  >



                        <input name="country" type="text" placeholder="Country" value={this.state.formdata.country} onChange={this.handleChange}
                            onBlur={() => {
                                setTimeout(() => {
                                    this.setState({ showDialog: false })
                                }, 120);
                            }} onFocus={() => { this.state.showDialog = true; }} />


                        <div className='countryDialog' > {this.listCountries()} </div>
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default TableInput;

