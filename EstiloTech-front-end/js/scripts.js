const API_URL = "http://localhost/EstiloTech-api/public/index.php";

document.addEventListener('DOMContentLoaded', () => {


    // eventos para el menu de navegacion
    document.getElementById('link-prendas').addEventListener('click', () => mostrarSeccion('prendas'));
    document.getElementById('link-marcas').addEventListener('click', () => mostrarSeccion('marcas'));
    document.getElementById('link-ventas').addEventListener('click', () => mostrarSeccion('ventas'));
    document.getElementById('link-clientes').addEventListener('click', () => mostrarSeccion('clientes'));
    
    obtenerTodosLosClientes();
    obtenerTodasLasMarcas();
    obtenerMarcaPorId();
    cargarMarcas();
    cargarMarcasUpdate();
    obtenerTodasLasPrendas();
    obtenerTodasLasVentas()

    // PRENDAS
    
   document.getElementById('agregar-prenda-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const form = this;

    const data = {
        nombre: form.nombre.value,
        talla: form.talla.value,
        color: form.color.value,
        precio: parseFloat(form.precio.value),
        marca_id: parseInt(form.querySelector('#id_marca').value),
        stock: parseInt(form.stock.value)
    };

    guardarPrenda(data);
    form.reset();
    form.style.display = 'none';
});

document.getElementById('update-prenda-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = this;
    
    const data = {
        id_prenda: parseInt(form.querySelector('#update-id_prenda').value), 
        nombre: form.querySelector('#update-nombre').value,   
        talla: form.querySelector('#update-talla').value,      
        color: form.querySelector('#update-color').value,           
        precio: parseFloat(form.querySelector('#update-precio').value), 
        marca_id: parseInt(form.querySelector('#update-id_marca').value),
        stock: parseInt(form.querySelector('#update-cantidad_stock').value)  
    };

    actualizarPrenda(data);
    
    form.reset();
    form.style.display = 'none';
});

    // MARCAS
    document.getElementById('agregar-marca-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const form = this;
    
        const data = { 
            nombre: form.querySelector('#create-nombre').value,   
            descripcion: form.querySelector('#create-descripcion').value,   
        };

        guardarMarca(data);
        form.reset();
        form.style.display = 'none';
    });
    
    document.getElementById('update-marca-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const form = this;

        const data = { 
            id_marca: parseInt(form.querySelector('#update-id_marca').value),
            nombre: form.querySelector('#update-nombre').value,
            descripcion: form.querySelector('#update-descripcion').value
        };
    
        actualizarMarca(data);
        form.reset();
        form.style.display = 'none';
    });

    
});


function mostrarSeccion(section) {
    document.getElementById('prendas-section').style.display = 'none';
    document.getElementById('marcas-section').style.display = 'none';
    document.getElementById('ventas-section').style.display = 'none';
    document.getElementById('clientes-section').style.display = 'none';
    if (section === 'prendas') {
        document.getElementById('prendas-section').style.display = 'block';
    } else if (section === 'marcas') {
        document.getElementById('marcas-section').style.display = 'block';
    } else if (section === 'ventas') {
        document.getElementById('ventas-section').style.display = 'block';
    } else if (section === 'clientes') {
        document.getElementById('clientes-section').style.display = 'block';
    }
}


document.getElementById('add-prenda-btn').addEventListener('click', function() {
    const formActualizarPrenda = document.getElementById('update-prenda-form');
    if (formActualizarPrenda) {
        formActualizarPrenda.style.display = 'none';
    }
    
    const formCrearPrenda = document.getElementById('agregar-prenda-form');
    if (formCrearPrenda) {
        formCrearPrenda.style.display = 'block';
    }
});

document.getElementById('add-marca-btn').addEventListener('click', function() {
    const formActualizarMarca = document.getElementById('update-marca-form');
    if (formActualizarMarca) {
        formActualizarMarca.style.display = 'none';
    }
    
    const formCrearMarca = document.getElementById('agregar-marca-form');
    if (formCrearMarca) {
        formCrearMarca.style.display = 'block';
    }
});

function obtenerTodosLosClientes() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/clientes', true);
    
    xhr.onload = function () {
        if (this.status === 200) {
            const cleanedText = this.responseText.replace(/^\uFEFF/, '').trim(); 
            try {
                const clientes = JSON.parse(cleanedText);  
                const tbody = document.querySelector('#cliente-table tbody');
                tbody.innerHTML = ''; 

                clientes.forEach(cliente => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${cliente.nombre}</td>
                        <td>${cliente.apellido_1}</td>
                        <td>${cliente.apellido_2}</td>
                        <td>${cliente.email}</td>
                        <td>${cliente.telefono}</td>
                    `;
                    tbody.appendChild(tr);
                });

            } catch (e) {
                console.error('Error parsing JSON:', e);
            }
        } else {
            console.error('Error al obtener los clientes:', this.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para obtener los clientes');
    };

    xhr.send();
}









