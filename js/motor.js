function getInfo(shortname, id, type, link) {
    var ajax1 = new XMLHttpRequest();
    ajax1.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //Show all information
            var obj = this.responseText;
            var obj1 = JSON.parse(obj);
            let img = document.createElement('img');
            img.setAttribute('src', link);
            img.setAttribute('class', 'imagen');
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
                line.innerHTML += " " + shortname + "    " + obj1[id].itemProperties.Weight + "kg " + obj1[id].itemProperties.ammoCaliber;
                content.appendChild(div);
                div.appendChild(img);
                div.appendChild(line);
            }
        }
    };

    ajax1.open("GET", "https://raw.githack.com/kokarn/tarkov-tools/master/src/data/item-props.json", true);
    ajax1.send()
}



function getApiBasics(search) {
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
        iconLink
        
    }
}`
            })
        })
        .then(r => r.json())
        .then(function(data) {
            for (let index = 0; index < data.data.itemsByType.length; index++) {
                let shortname = (data.data.itemsByType[index].shortName)
                let id = (data.data.itemsByType[index].id)
                getInfo(shortname, data.data.itemsByType[index].id, search, data.data.itemsByType[index].iconLink)
            }
        });
}

window.onload = function name() {
    document.getElementById("ammo").addEventListener("click", function(e) {
        eraseResults();
        getApiBasics("ammo")
    })
    document.getElementById("helmet").addEventListener("click", function(e) {
        eraseResults();
        getApiBasics("helmet")
    })
    document.getElementById("headset").addEventListener("click", function(e) {
        eraseResults();
        getApiBasics("headphones")
    })
    document.getElementById("gun").addEventListener("click", function(e) {
        eraseResults();
        getApiBasics("gun")
    })
    document.getElementById("vest").addEventListener("click", function(e) {
        eraseResults();
        getApiBasics("armor")
    })
    document.getElementById("keys").addEventListener("click", function(e) {
        eraseResults();
        getApiBasics("keys")
    })
}

function eraseResults() {
    while (document.getElementById("content").firstChild) {
        document.getElementById("content").removeChild(document.getElementById("content").firstChild)
    }
}