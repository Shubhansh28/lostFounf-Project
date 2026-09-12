const validateCreateItem = (req,res,next) => {
    let {itemName,type,place,date,contact} = req.body
    if (typeof itemName!=="string" || 
        itemName.trim()=="" || 
        typeof place !=="string" || 
        place.trim()==="" ||
        typeof date !=="string" || 
        date.trim()==="" ||
        typeof contact !=="string" || 
        contact.trim()===""
    ) {
        return res.status(400).json({"error" : "not a valid input"})
    }
    if (!(type === "found" || type ==="lost")) {
        return res.status(400).json({"error" : "type is not lost or found"})
    }
    next()
}
module.exports = validateCreateItem