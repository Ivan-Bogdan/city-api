import React, { Component } from 'react'
import { Form,Button,Container } from 'react-bootstrap';
import Autosuggest from "react-autosuggest"
import {regionList,districtList,cityList} from "../API/http"
import './app.css'


const getSuggestionValue = suggestion => suggestion;


const renderSuggestion = suggestion => (
  <span>
    {console.log(suggestion)}
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
      console.log(value)  
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

      let {suggestions} = this.state
      console.log(suggestions)
     
      if(suggestions == undefined) {return suggestions = "" } else {
        return inputLength === 0 ? [] : suggestions.filter(lang =>
          lang.toLowerCase().slice(0, inputLength) === inputValue
          
        );
        
      }  
    }
    render() {

        const { value, suggestions } = this.state;
        console.log(suggestions)

        const inputProps = {
          placeholder: 'Введите область',
          value,
          onChange: this.onChange
        };
        
        return (



                <form >
                    <div>
                        Город <input type = "text" name = "city" value = {this.state.city} onChange = {this.changeHandler}/>
                    </div>
                    <div>
                        Район<input type = "text" name = "district" value = {this.state.district} onChange = {this.changeHandler}/>
                    </div>
                   
                    
                    

                    
                    <Autosuggest 
                    
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={(suggestions)=>(
                      <span>
                      {console.log(suggestions)}
                      {suggestions}
                      </span>)
                      
                    }
                    inputProps={{
                      id: "region",
                      name: "region",
                      value: this.state.region,
                      placeholder: "Область",
                      onChange: (_event, {newValue}) =>{
                        _event.preventDefault()
                          let payload = {
                            "region": newValue
                        }

                        regionList(payload).then(
                          data => {
                            if(data.error) {
                              console.log(data.error)
                            }
                            let {regions} = data;
                            console.log(regions)
                            this.setState({suggestions: regions})
                          }
                        )

                        this.setState({region: newValue});
                    }}}/>

                   {/* <Autosuggest 
                    
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={(suggestions)=>(
                      <span>
                      {console.log(suggestions)}
                      {suggestions}
                      </span>)
                      
                    }
                    inputProps={{
                      id: "district",
                      name: "district",
                      value: this.state.district,
                      placeholder: "Район",
                      onChange: (_event, {newValue}) =>{
                        _event.preventDefault()
                          let payload = {
                            "region": this.state.region,
                            "district" : newValue
                        }

                        districtList(payload).then(
                          data => {
                            if(data.error) {
                              console.log(data.error)
                            }
                            let {regions} = data;
                            console.log(regions)
                            this.setState({suggestions: regions})
                          }
                        )

                        this.setState({region: newValue});
                    }}}
                    
                     /> */}
              }
                
                     </form>

                    
                    
                
        )
    }
}
export default PostForm