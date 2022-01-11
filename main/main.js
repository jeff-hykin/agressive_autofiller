// TODO:
//     put this in an extension
//     create a simple input for adding/removing pieces of information
var information = [
    {
        contains: [ "city" ],
        suggest: "College Station",
    }
]

var processedElements = new Map()
var hookIntoInputs = ()=>{
    const inputs = document.querySelectorAll("input")
    for (const eachElement of inputs) {
        if (processedElements.has(eachElement)) {
            continue
        }
        const suggestions = []
        const elementInfo = `${eachElement.name} ${eachElement.id} ${eachElement.type} ${[...eachElement.classList].join(" ")}`
        for (const eachItem of information) {
            for (const eachString of eachItem.contains) {
                // aggressively check name,id,type and class
                if (elementInfo.includes(eachString)) {
                    suggestions.push(eachItem.suggest)
                    break
                }
            }
        }
        if (suggestions.length > 0) {
            const options = document.createElement('datalist')
            options.id = `${Math.random()}`
            eachElement.setAttribute("list", options.id)
            for (const eachSuggestion of suggestions) {
                const option = document.createElement('option')
                option.value = eachSuggestion
                options.appendChild(option)
            }
            eachElement.insertAdjacentElement('afterend', options)
            processedElements.set(eachElement, true)
        }
    }
}

hookIntoInputs()
console.log(setInterval(hookIntoInputs, 5000)) // once every 5 seconds