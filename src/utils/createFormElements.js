import { convertCamelToRegular } from "./camelCasetoRegular";

export let createFormElements = (
  currentState,
  changeMethod,
  informationType,
  deleteEvent
) => {

  let addDeleteButton = ['educationInformation', 'workInformation']
  return currentState[informationType].map(x => {
    let arr = []
    let element
    for (let y in x){
      if (y !== 'id'){
        element = (
          <div className={informationType}>
            <label>{convertCamelToRegular(y)}</label>
            <input
              type="input"
              className = {y}
              onChange={changeMethod}
            ></input>
          </div>
        )
        arr.push(element)
      }

    }

    return (
      <div className = {x.id}>
        {/* Make sure the delete button is added on top of the divs to prevent nextsibling from breaking */}
        {addDeleteButton.includes(informationType) ? <button onClick={deleteEvent}>Delete</button> : false}
        {arr}

      </div>    
    )
  })

};