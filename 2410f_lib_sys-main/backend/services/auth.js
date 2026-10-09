import jwt from 'jsonwebtoken'
export function setUser(user){
    return jwt.sign(
        {"id":user._id,"role":user.role},
        process.env.SECRET_KEY,
        {expiresIn:"1d"}
    )
}

export function getUser(token) {
  try {
    return jwt.verify(token, process.env.SECRET_KEY )
  } catch (error) {
    throw new Error(`Verification failed: ${error.message}`);
  }
}