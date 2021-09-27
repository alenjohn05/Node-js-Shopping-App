const User = require('../models/User')

const ErrorResponse = require('../middleware/error')



//REGISTER

exports.register= ('/', async(req, res, next)=>{
   const {username, email, password} = req.body

   try{
      const user = await User.create({
         username, email, password,
      });

      sentToken(user,201,res)  // Calling the function senttoken to respond with the token  giving arguments 

      // res.status(201).json({
      //    success: true,
      //    user,
      // });
   } catch(error){
      next(error)
      // res.status(401).json({
      //    success: false,
      //   error: error.message
      // });

   }
})

//LOGIN


exports.login=('/', async(req, res, next)=>{
   const {email, password} = req.body
   if(!email || !password){  //Checking the both email and password are provided or not

      return next(new ErrorResponse('Please provide the password', 402))  // Changeing all error types to the format of Error custom handling
      
      // res.status(400).json({
      //    success:false,
      //    error:'Please provide the email and Passoword'
      // })
   }

   try {
      const user = await User.findOne({email}).select("+password")  //Checking th Password
      if(!user){                               //On return of Password
         res.status(404).json({
            success: false,
            error: 'invalid Credentials'  //Return if password is not correct
         })
      }
      const isMatch = await user.matchPasswords(password)   //Calling the method from matchPassword in User.js in Models
      if(!isMatch){
         res.status(401).json({
            success: false,
            error: 'Invalid Credentials'
         })
      }

      sentToken(user,201,res)  // Calling the function senttoken to respond with the token  giving arguments 


      // res.status(500).json({  //Everything is corect the token is sends back for the request
      //    success: true,
      //    token: 'kdfldfsdgjklsl'
      // })
   
   } catch (error) {
      res.status(501).json({
         success: false,
         error: error.message
      })
   }
})


exports.forgotPassword=('/forgotpassword',(req, res, next)=>{
   res.send('forgotPassword Route')
})

exports.resetPassword=('/resetpassword',(req, res, next)=>{
   res.send('resetPassword Route')
})



const sentToken = (user, statusCode, res)=>{
   const token = user.getSignedToken()
   res.status(200).json({
      success: true,
      jwttoken: token
   })
}