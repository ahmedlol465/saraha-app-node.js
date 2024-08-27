export const globalResponse = (err, req, res,next)=>{
    if(err) {
        return res.status(500).json({
            message: 'error catching',
            errorMsg: err.message,
            errorLocation: err.stack
        })
    }
}