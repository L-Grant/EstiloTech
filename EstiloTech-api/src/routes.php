<?php

require_once "../src/controllers/ClientesController.php";
require_once "../src/controllers/MarcasController.php";
require_once "../src/controllers/PrendasController.php";
require_once "../src/controllers/ReportesController.php";
require_once "../src/controllers/VentasController.php";

$method = $_SERVER["REQUEST_METHOD"];
$path = trim($_SERVER["PATH_INFO"], '/');
$segmentos = explode("/", $path);
$queryString = $_SERVER['QUERY_STRING'];
parse_str($queryString, $queryParams);


if($path == "clientes"){
    $clientesController = new ClientesController();

    switch($method) {        
        case  'GET':
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            if($id != null){
            $clientesController->ObtenerPorId($id);
            }else{
            $clientesController->ObtenerTodos();}
            break;
                
        case 'POST':
            $clientesController->crear();    
            break;

        case 'DELETE':
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            $clientesController->eliminar($id);
            break;

        case 'PUT':
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            $clientesController->actualizar($id);
            break;       
        
        default:
            echo json_encode(["Error" => "Metodo no implementado todavia para Clientes." ]);
    }
}

elseif ($path == "marcas"){  

    $marcasController = new MarcasController();

    switch($method) {        
        case  'GET':
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            if($id != null){
            $marcasController->ObtenerPorId($id);
            }else{
            $marcasController->ObtenerTodos();}
            break;
                
        case 'POST':
            $marcasController->crear();    
            break;

        case 'DELETE':
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            $marcasController->eliminar($id);
            break;

        case 'PUT':
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            $marcasController->actualizar($id);
            break;       
        
        default:
            echo json_encode(["Error" => "Metodo no implementado todavia para Marcas." ]);
    }
   
}

elseif($path == "prendas"){
    $prendasController = new PrendasController();

    switch($method) {        
        case  'GET':
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            if($id != null){
            $prendasController->ObtenerPorId($id);
            }else{
            $prendasController->ObtenerTodos();}
            break;
                
        case 'POST':
            $prendasController->crear();    
            break;

        case 'DELETE':
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            $prendasController->eliminar($id);
            break;

        case 'PUT':
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            $prendasController->actualizar($id);
            break;       
        
        default:
            echo json_encode(["Error" => "Metodo no implementado todavia para Prendas." ]);
    }
}

elseif($path == "ventas"){
    $ventasController = new VentasController();

    switch($method) {        
        case  'GET':
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            if($id != null){
            $ventasController->ObtenerPorId($id);
            }else{
            $ventasController->ObtenerTodos();}
            break;
                
        case 'POST':
            $ventasController->crear();    
            break;

        case 'DELETE':
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            $ventasController->eliminar($id);
            break;

        case 'PUT':
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            $ventasController->actualizar($id);
            break;       
        
        default:
            echo json_encode(["Error" => "Metodo no implementado todavia para Prendas." ]);
    }
}

elseif($path == "reportes"){
    $reportesController = new ReportesController();
    $id = isset($queryParams['id']) ? $queryParams['id'] : null;

    if ($id === null || empty($id)) {
        echo json_encode(["error" => "id requerido"]);
        exit;
    }

    switch ($method) {        
        case 'GET':
            switch ($id) {
                case 1:
                    $reportesController->MarcasAlMenosUnaVentas();            
                    break;
                case 2:
                    $reportesController->PrendasVendidasYCantidadStock();            
                    break;
                case 3:
                    $reportesController->CincoMarcasMasVendidas();            
                    break; 
        default:
            echo json_encode(["Error" => "Metodo no implementado todavia para Reportes." ]);
        }
    }
}else{
    include "error/response.html";
}




?>
