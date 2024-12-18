## Descripcion.
Proyecto enfocado en la creacion de una base de datos sobre una tienda de ropa "EstiloTech".
Posee 4 tablas: Marcas, Prendas, Clientes, Ventas.

## Integrantes:
Leonardo Grant

## Diagrama de BD
![EstiloTech](./EstiloTech.jpg "Diagrama")


## Uso de Endpoints de la API


1. Obtener todos los clientes
  - Método: GET
  - Endpoint: http://localhost/EstiloTech/public/index.php/clientes
  - Descripción: Obtiene una lista de todos los clientes registrados en el sistema.
    
    Ejemplo de solicitud:
    ```http
    GET http://localhost/api/libreria-api/public/index.php/libros/
    ```
    Ejemplo de respuesta:
    json
    Copiar código
    [
      {
        "nombre": "Valeria",
        "apellido_1": "Morales",
        "apellido_2": "Hernández",
        "email": "valeria.morales@example.com",
        "telefono": "9871-2345"
      }
    ]
Obtener un cliente por ID
Método: GET
Endpoint: http://localhost/EstiloTech/public/index.php/clientes?id={id-del-cliente}
Descripción: Obtiene la información de un cliente específico usando su ID.
Ejemplo de solicitud:
http
Copiar código
GET http://localhost/EstiloTech/public/index.php/clientes?id=3
Ejemplo de respuesta:
json
Copiar código
{
  "apellido_2": "Jimenes",
  "email": "juanpj@example.com"
}
Endpoints para Marcas
Obtener todas las marcas
Método: GET
Endpoint: http://localhost/EstiloTech/public/index.php/marcas
Descripción: Obtiene una lista de todas las marcas disponibles en el sistema.
Ejemplo de solicitud:
http
Copiar código
GET http://localhost/EstiloTech/public/index.php/marcas
Ejemplo de respuesta:
json
Copiar código
[
  {
    "nombre": "Old Navy"
  },
  {
    "nombre": "Lacoste",
    "descripcion": "Marca francesa conocida por su ropa, calzado y accesorios de lujo."
  }
]
Obtener una marca por ID
Método: GET
Endpoint: http://localhost/EstiloTech/public/index.php/marcas?id={id-de-la-marca}
Descripción: Obtiene la información de una marca específica usando su ID.
Ejemplo de solicitud:
http
Copiar código
GET http://localhost/EstiloTech/public/index.php/marcas?id=3
Ejemplo de respuesta:
json
Copiar código
{
  "nombre": "Lacoste",
  "descripcion": "Marca francesa conocida por su ropa, calzado y accesorios de lujo."
}
Endpoints para Prendas
Obtener todas las prendas
Método: GET
Endpoint: http://localhost/EstiloTech/public/index.php/prendas
Descripción: Obtiene una lista de todas las prendas disponibles en el sistema.
Ejemplo de solicitud:
http
Copiar código
GET http://localhost/EstiloTech/public/index.php/prendas
Ejemplo de respuesta:
json
Copiar código
[
  {
    "talla": "XL",
    "precio": "49.99"
  }
]
Obtener una prenda por ID
Método: GET
Endpoint: http://localhost/EstiloTech/public/index.php/prendas?id={id-de-la-prenda}
Descripción: Obtiene la información de una prenda específica usando su ID.
Ejemplo de solicitud:
http
Copiar código
GET http://localhost/EstiloTech/public/index.php/prendas?id=2
Ejemplo de respuesta:
json
Copiar código
{
  "nombre": "Chaleco",
  "talla": "M",
  "color": "Azul",
  "precio": "59.99",
  "marca_id": 3,
  "stock": 50
}
Endpoints para Ventas
Obtener todas las ventas
Método: GET
Endpoint: http://localhost/EstiloTech/public/index.php/ventas
Descripción: Obtiene una lista de todas las ventas realizadas.
Ejemplo de solicitud:
http
Copiar código
GET http://localhost/EstiloTech/public/index.php/ventas
Ejemplo de respuesta:
json
Copiar código
[
  {
    "fecha_venta": "2024-10-05 11:30:00",
    "cliente_id": 4,
    "prenda_id": 8,
    "cantidad": 2,
    "subtotal": "89.98"
  }
]
Obtener una venta por ID
Método: GET
Endpoint: http://localhost/EstiloTech/public/index.php/ventas?id={id-de-la-venta}
Descripción: Obtiene la información de una venta específica usando su ID.
Ejemplo de solicitud:
http
Copiar código
GET http://localhost/EstiloTech/public/index.php/ventas?id=8
Ejemplo de respuesta:
json
Copiar código
{
  "cliente_id": 4
}