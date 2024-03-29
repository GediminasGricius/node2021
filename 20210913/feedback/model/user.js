const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userScheme=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Neteisingas el. paštas');
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if (!validator.isStrongPassword(value)){
                throw new Error('Slaptažodis per paprastas');
            }
        }
    },
    tokens:[
                {
                    token:{
                        type:String,
                        required:true
                    }
                }
            ]
});
userScheme.statics.getAllUsers= async function (){
    const users=await User.find({});
    return users;
}

userScheme.statics.findByEmail = async function (email, password){
    console.log(email,password);
    const user=await User.findOne({email});
    if (!user){
        throw new Error("Neteisingi duomenys");
    }
    //Patikriname ar passwordas įvestas atitinka passworda DB
    const e=await bcrypt.compare(password, user.password);
    if (!e){
        throw new Error("Neteisingi duomenys");
    }
    return user;
};

userScheme.methods.generateAuthToken=async function(){
    const user=this;
    const token=jwt.sign( {_id:user._id.toString() }, 'Kz585++64');
    user.tokens=user.tokens.concat({token});
    await user.save();
    return token;
}

userScheme.pre('save', async function (next){
    const user=this;
    if (user.isModified('password')){
        user.password=await bcrypt.hash(user.password, 10);
    }
   
    next();
});


const User=mongoose.model('User',userScheme);

module.exports=User;