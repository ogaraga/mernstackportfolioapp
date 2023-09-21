//importing packages

const mongoose = require('mongoose');

//develop schema. Source from https://mongoosejs.com/docs/validation.html
const schema = mongoose.Schema;
const userSchema = new schema({
username:{
    type: String,
    require: [true, 'Username is mandatory!'],
    minLength: [6, 'More than 5 characters are required!'],
    uppercase: true,
    validate:{
        validator: (val)=>{
            return /^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/.test(val);
        },
        message: props=> `${props.value} is not a valid username!`
    }
},
email:{
    type: String,
    unique: true,
    minLength: [6, 'Atleas 6 characters are required to proceed!'],
    validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v);
        },
        message: props => `${props.value} is not a valid email!`
      },
    required: [true, 'User phone number required']
   
},
password:{
    type: String,
    require: true,
    minLength:[5, 'You must provide atleast 5 characters to continue!']
}
},{
    timeStamp:true
});

const ModelSchema = mongoose.model('User', userSchema);
module.exports = ModelSchema;