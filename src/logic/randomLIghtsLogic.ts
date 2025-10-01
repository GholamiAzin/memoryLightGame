import { lightsArray, type Light } from "../colorsTypes/types"

export const randomLights = () : Light[] =>{
    let orderArr : Light[] = []
    for (let index = 1; index <=5; index++) {
        const randomnumber = Math.floor(Math.random()*5 +1)
        const randomColor : string = lightsArray.find((item)=>{return item.id === randomnumber})?.color
        const tempObj : Light = {
            id : randomnumber,
            color : randomColor,
            className : lightsArray[randomnumber].className
        }
        orderArr.push(tempObj)
    }

return orderArr

}