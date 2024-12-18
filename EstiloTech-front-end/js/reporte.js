document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-MarcasAlMenosUnaVentas').addEventListener('click', () => mostrarReporte('marcas'));
    document.getElementById('add-PrendasVendidasYCantidadStock').addEventListener('click', () => mostrarReporte('prendas'));
    document.getElementById('add-CincoMarcasMasVendidas').addEventListener('click', () => mostrarReporte('top-marcas'));

});

function mostrarReporte(reporte) {
    // Ocultar todas las secciones
    document.getElementById('MarcasAlMenosUnaVentas').style.display = 'none';
    document.getElementById('PrendasVendidasYCantidadStock').style.display = 'none';
    document.getElementById('CincoMarcasMasVendidas').style.display = 'none';

    // Mostrar la sección seleccionada
    if (reporte === 'marcas') {
        document.getElementById('MarcasAlMenosUnaVentas').style.display = 'block';
        obtenerMarcasConVentas();
    } else if (reporte === 'prendas') {
        document.getElementById('PrendasVendidasYCantidadStock').style.display = 'block';
        obtenerPrendasVendidasYStock(); 
    } else if (reporte === 'top-marcas') {
        document.getElementById('CincoMarcasMasVendidas').style.display = 'block';
        obtenerCincoMarcasMasVendidas(); 
    }
}


function obtenerMarcasConVentas() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/reportes?id=1', true);

    xhr.onload = function () {
        if (this.status === 200) {
            const cleanedText = this.responseText.replace(/^\uFEFF/, '').trim();
            
            try {
                const marcas = JSON.parse(cleanedText);

                const tbody = document.querySelector('#marcas-ventas-total-table tbody');
                tbody.innerHTML = '';

                marcas.forEach(marca => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${marca.nombre}</td>
                    `;
                    tbody.appendChild(tr);
                });

            } catch (e) {
                console.error('Error parsing JSON:', e);
            }

        } else {
            console.error('Error al obtener las marcas:', this.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para obtener las marcas:', this.statusText);
    };

    xhr.send();
}

function obtenerPrendasVendidasYStock() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/reportes?id=2', true);

    xhr.onload = function () {
        if (this.status === 200) {

            const cleanedText = this.responseText.replace(/^\uFEFF/, '').trim();
            
            try {
                const prendas = JSON.parse(cleanedText);
      
                const tbody = document.querySelector('#prendas-vendidas-stock-table tbody');
                tbody.innerHTML = '';

                prendas.forEach(prenda => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${prenda.nombre}</td>
                        <td>${prenda.stock}</td>
                        <td>${prenda.cantidad_vendida}</td>
                        <td>${prenda.stock_restante}</td>
                    `;
                    tbody.appendChild(tr);
                });

            } catch (e) {
                console.error('Error parsing JSON:', e);
            }

        } else {
            console.error('Error al obtener las prendas:', this.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para obtener las prendas:', this.statusText);
    };

    xhr.send();
}

function obtenerCincoMarcasMasVendidas() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', API_URL + '/reportes?id=3', true);

    xhr.onload = function () {
        if (this.status === 200) {
            const cleanedText = this.responseText.replace(/^\uFEFF/, '').trim();
            
            try {
                const marcas = JSON.parse(cleanedText);

                const tbody = document.querySelector('#top-marcas-table tbody');
                tbody.innerHTML = ''; // Limpiar el contenido de la tabla

                marcas.forEach(marca => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${marca.nombre}</td>
                        <td>${marca.cantidad_ventas}</td>
                    `;
                    tbody.appendChild(tr);
                });

            } catch (e) {
                console.error('Error parsing JSON:', e);
            }

        } else {
            console.error('Error al obtener las marcas:', this.statusText);
        }
    };

    xhr.onerror = function () {
        console.error('Error en la solicitud para obtener las marcas:', this.statusText);
    };

    xhr.send();
}

obtenerPrendasVendidasYStock();
obtenerCincoMarcasMasVendidas();
obtenerMarcasConVentas();
