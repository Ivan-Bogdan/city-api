import axios from 'axios'



export const regionList = (payload) => {


return axios.post('http://altproduction.ru:8080/rest/v1/region/',JSON.stringify(payload)).then(response => {
    console.log(response)
    return response.data 
})
.catch(error => {
    console.log(error)
    return error
})
}