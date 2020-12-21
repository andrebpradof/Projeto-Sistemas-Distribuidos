require('dotenv/config');
const Sus = require('./models/Sus');
const axios = require('axios');

module.exports = {
    async getQueryById(call, callback){
        const { id } = call.request;

        const response = await Sus.findById(id);

        return callback(null, { Sus: response });
    },
    async listQuerys(call, callback){
        const { userId } = call.request;

        const query = await Sus.find({ userId });

        return callback(null, { query });
    },
    async Query(call, callback){
        const { hospital, doctor, data , userId } = call.request.query;

        const query = await Sus.create({ hospital, doctor, data, userId });
    
        return callback(null, {
            query: { ...query.toObject(), query: query._id },
        });
    },
    async getHospital(call, callback){
        const { cep } = call.request;
        var hospital = [];
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+cep+'&key='+process.env.KEY_GOOGLE)
        .then(response => {
            if(response.data.status !== 'ZERO_RESULTS'){
                var {lat, lng} = response.data.results[0].geometry.location;
                
                axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat.toString()+','+lng.toString()+'&radius=10000&type=hospital&key='+process.env.KEY_GOOGLE)
                .then(response => {
                   
                    if(response.data.status === 'OK'){
                        for (let value of response.data.results) {
                            var data_hospital = {nome: value.name, local: value.vicinity, cep: cep};
                            hospital.push(data_hospital); 
                        }
                        return callback(null, { hospital });
                    }
                    else{   
                        return callback(null, { hospital });
                    }
                   
                })
                .catch(error => {
                    console.log(error);
                    return callback(null, { error: 'Erro: '+error });
                });
            }
            else{
                return callback(null, { error: 'Cidade não localizada' });
            }
        })
        .catch(error => {
            console.log(error);
            return callback(null, { error: 'Erro: '+error });
        });
    },
}