function getInfo(shortname, id) {
    var ajax1 = new XMLHttpRequest();
    ajax1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Show all information
            var obj = this.responseText;
            var obj1 = JSON.parse(obj);
            /*Object.keys(obj1).forEach(element => {
                if (obj1[element].itemProperties.ammoCaliber != "undefined") {
                    document.getElementById("ciudad").innerHTML += " " + shortname + " " + obj1[element].itemProperties.Weight + "kg " + obj1[element].itemProperties.ammoCaliber;
                } else if (element == id) {
                    document.getElementById("ciudad").innerHTML += " " + shortname + " " + obj1[element].itemProperties.Weight + "kg";
                }
            })*/
            document.getElementById("ciudad").innerHTML += " " + shortname + " " + obj1[id].itemProperties.Weight + "kg";
        }
    };

    ajax1.open("GET", "https://raw.githack.com/kokarn/tarkov-tools/master/src/data/item-props.json", true);
    ajax1.send()
}

window.onload = function name() {
    getAmmo("gun");
}

function getAmmo(peticion) {
    fetch('https://tarkov-tools.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `{
    itemsByType(type: ` +
                    peticion + `) {
        id
        name
        shortName
        iconLink
        
    }
}`
            })
        })
        .then(r => r.json())
        .then(function(data) {
            for (let index = 0; index < 2; index++) {
                let shortname = (data.data.itemsByType[index].shortName)
                let id = (data.data.itemsByType[index].id)
                getInfo(shortname, data.data.itemsByType[index].id)
            }
        });
}