import React, { Component } from 'react'
import Autosuggest from "react-autosuggest"
import {regionList} from "../API/http"
import './app.css'


const getSuggestionValue = suggestion => suggestion;


const renderSuggestion = suggestion => (
  <span>
    
    {suggestion}
    
  </span>
);

 class PostForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            city:'',
            district:'',
            region:'',
            value: '',
            suggestions: []
        }
    }

    onChange = (event, { newValue }) => {
      this.setState({ value: newValue })
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value)
        });
      };

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };  

    

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }


    getSuggestions = value => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;

      let {region} = this.state
     
      if(region == undefined) {return region = "" } else {
        return inputLength === 0 ? [] : region.filter(lang =>
          lang.toLowerCase().slice(0, inputLength) === inputValue
          
        );
        
      }  
    }

    submitHandler = e =>{
        e.preventDefault()
        console.log(this.state)

        let payload = {
          "region": this.state.region
      }

      regionList(payload).then(
        data => {
          if(data.error) {
            console.log(data.error)
          }
          let {regions} = data;
          this.setState({region: regions})
        }
      )

    }

    render() {

        const { value, suggestions } = this.state;

        const inputProps = {
          placeholder: 'Введите область',
          value,
          onChange: this.onChange
        };
        
        return (



                <form onSubmit = {this.submitHandler}>
                  {
                  this.submitHandler}
                    <div>
                        Город <input type = "text" name = "city" value = {this.state.city} onChange = {this.changeHandler}/>
                    </div>
                    <div>
                        Район<input type = "text" name = "district" value = {this.state.district} onChange = {this.changeHandler}/>
                    </div>
                    <div>
                       Область <input type = "text" name = "region" value = {this.state.region} onChange = {this.changeHandler} />
                    </div>
                    
                    <button type = "submit">Submit</button>


                    <Autosuggest 
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps} />
                    
                </form>
        )
    }
}
export default PostForm