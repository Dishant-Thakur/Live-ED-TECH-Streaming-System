const validateUserLogin = '../middlwares/validateUserMiddleware';
const user = '../models/userModel';
const  bcrypt= require('bcrypt');

const usercontroller = async function (req,res,next){
    try{
    let {name, email, password} = req.body;
    let decryptPassword = await bcrypt.compare(password, decryptPassword);

    if(password != decryptPassword){
       
    }



    let user_data = await user.find({
        
        email : email,
        password : password,


      })

    next();
    }

        catch(error){
    console.log('Error: ',error);
    }
    
}
