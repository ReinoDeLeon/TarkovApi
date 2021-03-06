<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $_GET['name'] ?></title>
    <link rel="stylesheet" href="css/phpstyle.css">
</head>
<body id="detalle1">
<header>
        <div id="img">
            <a href="index.html"><img src="img/logo.png" alt="tarkov text font"></a>
        </div>
        
    </header>
    
    <div id="contenedor1">&nbsp;
        <?php 
            //Lectura de fichero JSON
            $json = file_get_contents('https://raw.githack.com/kokarn/tarkov-tools/master/src/data/item-props.json');
            //Decodificacion y volcado en una matriz del JSON
            $json_data = json_decode($json, true);
            //Recorrido de los datos de JSON
            //De datos los metemos en values
            $name = $_GET['name'];
            $id = $_GET['id'];
            $img = $_GET['img'];
            echo "<section id='info'>";
                
                echo "<div id='name'>" . $name . "</div>";
                echo "<div id='img'><img src='" . $img . "'></div>";
                echo "<div id='weigth'>Weight: " . $json_data[$id]["itemProperties"]["Weight"] . "kg</div>";
            if ($_GET['type'] == "helmet"){
                
                echo "<div id='material'>Material: " . $json_data[$id]["itemProperties"]["ArmorMaterial"] . "</div>";
                echo "<div id='class'>Armor class: " . $json_data[$id]["itemProperties"]["armorClass"] . "</div>";
                for ($i=0; $i < count($json_data[$id]["itemProperties"]["armorZone"]); $i++) { 
                    echo "<div id='material'>Protects: " . $json_data[$id]["itemProperties"]["armorZone"][$i] . "</div>";
                }
                if ($json_data[$id]["itemProperties"]["headSegments"]) {
                    for ($i=0; $i < count($json_data[$id]["itemProperties"]["headSegments"]); $i++) { 
                        echo "<div id='material'>Protects: " . $json_data[$id]["itemProperties"]["headSegments"][$i] . "</div>";
                    }
                }
                  
            }
            else if ($_GET['type'] == "armor"){
                
                echo "<div id='material'>Material: " . $json_data[$id]["itemProperties"]["ArmorMaterial"] . "</div>";
                echo "<div id='class'>Armor class: " . $json_data[$id]["itemProperties"]["armorClass"] . "</div>";
                for ($i=0; $i < count($json_data[$id]["itemProperties"]["armorZone"]); $i++) { 
                    echo "<div class='zone'>Protects: " . $json_data[$id]["itemProperties"]["armorZone"][$i] . "</div>";
                }
            }
            
            echo "</section>"; 

        ?>
    </div>
</div>
    

</body>
</html>