function chargeSimpleInfo(shortname, id, type, link) {
    var ajax1 = new XMLHttpRequest();
    ajax1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Show all information
            var obj = this.responseText;
            var obj1 = JSON.parse(obj);
            let img = document.createElement('img');
            img.setAttribute('src', link);
            img.setAttribute('class', 'imagen');
            console.log("getting " + type)
            if (type == "gun") {
                let content = document.getElementById("content")
                let div = document.createElement('div');
                div.setAttribute('id', 'response');
                let line = document.createElement('h3');
                line.innerHTML += " " + shortname + "    " + obj1[id].itemProperties.Weight + "kg " + obj1[id].itemProperties.ammoCaliber;
                content.appendChild(div);
                div.appendChild(img);
                div.appendChild(line);
            } else {
                let content = document.getElementById("content")
                let div = document.createElement('div');
                div.setAttribute('id', 'response');
                let line = document.createElement('h3');
                line.innerHTML += " " + shortname + "    " + obj1[id].itemProperties.Weight + "kg ";
                content.appendChild(div);
                div.appendChild(img);
                div.appendChild(line);
            }
        }
    };

    ajax1.open("GET", "https://raw.githack.com/kokarn/tarkov-tools/master/src/data/item-props.json", true);
    ajax1.send()
}



function chargeFrontPage(search) {
    fetch('https://tarkov-tools.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `{
    itemsByType(type: ` + search + `) {
        id
        name
        shortName
        gridImageLink
    }
}`
            })
        })
        .then(r => r.json())
        .then(function(data) {
            var result = ""
            for (let index = 0; index < data.data.itemsByType.length; index++) {
                let shortname = (data.data.itemsByType[index].shortName)
                let name = (data.data.itemsByType[index].name)
                name = name.replace('\'', '')
                let id = (data.data.itemsByType[index].id)
                let imageLink = (data.data.itemsByType[index].gridImageLink)
                console.log(shortname + " " + name + " " + id + " " + imageLink)

                if (imageLink != null) {
                    result += "<div><a href='detalle.php?name=" + name + "&id=" + id + "&img=" + imageLink + "&type=" + search + "'><div><img class='imagen' src='" + imageLink + "'></div><div><h3 class='nombre'>" + name + "</h3></div></a></div>";
                } else {
                    result += "<div><a href='detalle.php?name=" + shortname + "&id=" + id + "'><div><img class='imagen' src='" + "img/notFound.png" + "'></div><div><h3 class='nombre'>" + name + "</h3></div></a></div>";

                }


            }
            document.getElementById("content").innerHTML = result
        });
}

window.onload = function name() {
    document.getElementById("ammo").addEventListener("click", function(e) {
        eraseResults();
        chargeFrontPage("ammo")
    })
    document.getElementById("helmet").addEventListener("click", function(e) {
        eraseResults();
        chargeFrontPage("helmet")
    })
    document.getElementById("headset").addEventListener("click", function(e) {
        eraseResults();
        chargeFrontPage("headphones")
    })
    document.getElementById("armor").addEventListener("click", function(e) {
        eraseResults();
        chargeFrontPage("armor")
    })
    document.getElementById("keys").addEventListener("click", function(e) {
        eraseResults();
        chargeFrontPage("keys")
    })
}



function eraseResults() {
    var div = document.getElementById('content');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}