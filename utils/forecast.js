const request=require('request')

const forecast=(latitude,longitude, callback)=>{
    const url=`https://api.darksky.net/forecast/2f2f90cb56abc98faa32b82ed5628a06/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si`

    request({ url, json: true }, (error, { body })=>{
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        } else{
            callback(undefined,`${body.daily.data[0].summary}.\nIt is currently ${body.currently.temperature} degrees out. There is ${body.currently.precipProbability*100} % chance of rain. `)
        }
    })
}

module.exports=forecast