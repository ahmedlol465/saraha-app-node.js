export const findDocument = async (model, query) =>{
if(!model || !query) return {msg: 'invalied arguments', status: 400, success: false}

    const isDocumentExist = await model.findOne(query)
        if(!isDocumentExist){
        return { msg: 'document not found', status: 404, success: false}
    }
    return {msg: 'doucument found', isDocumentExist, success: true}
    }

export const creatDocument = async (model,data)=>{
    if(!model || !query) return {msg: 'invalied arguments', status: 400, success: false}

    const creatDocument = await model.create(data)
    if(!creatDocument) return {msg: ' document not valid', status: 400, success: false}
    return { msg: " document created succes", status: 400, success: true };

}