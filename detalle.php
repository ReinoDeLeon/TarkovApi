<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalle de prenda</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/motor.js"></script>
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
            echo "<div><img src='" . $img . "'></div>";
            echo "<div id='name'>" . $name . "</div>";
            echo "</section>";   
        ?>
    </div>
</div>
    

</body>
</html>