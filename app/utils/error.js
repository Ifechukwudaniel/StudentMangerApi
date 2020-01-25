const missingParameterError= (error)=>{
    return {error:`Pleas enter ${error}`}
}

const missingImageError= (error)=>{
    return {error:`Pleas upload an image ${error}`}
}

module.exports= {
    missingParameterError,
    missingImageError
}