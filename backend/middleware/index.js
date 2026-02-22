export const validateTodoInput = (req,res,next) =>{
    const {newTask, newDate} = req.body;

    if(!newTask || newTask.trim() === ""){
        return res.status(400).json({error: "Invalid Input"})
    }
    if(!newDate || newDate.trim() === ""){
        return res.status(400).json({error: "Invalid date"})
    }
    next();
}

export const validateIdParam = (req,res,next) =>{
    const id = parseInt(req.params.id);
    if(isNaN(id)){
        return res.status(400).json({error: "Invalid ID format"})
    }
    next();
}

export const validatePatchFields = (req, res, next) =>{
    const {isCompleted, newTask, newDate} = req.body;

    if(Object.keys(req.body).length === 0){
        return res.status(400).json({error: "No fields to update"})
    }

    if(!isCompleted == undefined && typeof isCompleted != "boolean"){
        return res.status(400).json({error: "isCompleted must be boolean"})
    }
    next();
}