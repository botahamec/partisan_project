var Race;
(function (Race) {
    Race[Race["White"] = 0] = "White";
    Race[Race["Black"] = 1] = "Black";
    Race[Race["Hispanic"] = 2] = "Hispanic";
    Race[Race["Asian"] = 3] = "Asian";
})(Race || (Race = {}));
var Person = /** @class */ (function () {
    function Person() {
        this.race = Race.White;
        this.birth = 1980;
        this.degree = true;
        this.female = true;
    }
    // returns the chance that the person is Democratic
    Person.prototype.predict = function () {
        var total = 0;
        switch (this.race) {
            case Race.White:
                total += .43;
                break;
            case Race.Black:
                total += .84;
                break;
            case Race.Hispanic:
                total += .63;
                break;
            case Race.Asian:
                total += .65;
        }
        if (this.degree)
            total += .58;
        else
            total += .46;
        if (this.female)
            total += .56;
        else
            total += .44;
        if (this.birth > 1981)
            total += .59;
        else if (this.birth > 1965)
            total += .48;
        else if (this.birth > 1946)
            total += .48;
        else
            total += .43;
        return (total / 4);
    };
    return Person;
}());
function main() {
    var param = new URL(window.location.href).searchParams;
    var person = new Person();
    if (param.get("sex") == "male")
        person.female = false;
    else if (param.get("sex") == "female")
        person.female = true;
    else
        return;
    if (param.get("degree") == "true")
        person.degree = true;
    else
        person.degree = false;
    person.birth = Number(param.get("year"));
    if (param.get("race") == "White")
        person.race = Race.White;
    else if (param.get("race") == "Black")
        person.race = Race.Black;
    else if (param.get("race") == "Asian")
        person.race = Race.Asian;
    else if (param.get("race") == "Hispanic")
        person.race = Race.Hispanic;
    else
        return;
    var demchance = person.predict();
    var message = "";
    if (demchance >= .5) {
        var percent = Math.round(demchance * 100);
        message = "There is a " + percent + "% chance you are a Democrat";
    }
    else {
        var percent = Math.round((1 - demchance) * 100);
        message = "There is a " + percent + "% chance you are a Republican";
    }
    document.getElementById("message").innerHTML = message;
}
main();
