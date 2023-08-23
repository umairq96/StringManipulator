var o = {name: "Dan", age: 25, id: 1, isAdult: true};
// console.log(checkVisibility("?test", o))
// console.log(checkVisibility("?name", o))
// console.log(checkVisibility("?name|?age", o))
// console.log(checkVisibility("?name|?fake", o))
// console.log(checkVisibility("=name:Umair;Farhan", o))
// console.log(checkVisibility("=name:Umair", o))
console.log(checkVisibility("=isAdult:0", o))

function checkVisibility(code, vals){
    var eles = code.split("|");
    var returnVal = true;

    while(eles.length){
        var command = eles.shift();
        var kw = command[0];
        var rest = command.substr(1);

        switch(kw){
            case '?':
                if(!vals[rest]){
                    returnVal = false;
                }
                break;
            case '!':
                if(vals[rest]){
                    returnVal = false;
                }
                break;
            case '=':
                var values = rest.split(":");
                var name = values[0];
                var conditions = values[1].split(";");
                returnVal = false;
                for(c of conditions)
                {
                    if(vals[name] !== undefined && vals[name] == c){
                        returnVal = true;
                    }
                }
                break;
            default:
                throw "unknown keyword: " + kw
        }
    }

    return returnVal;
}