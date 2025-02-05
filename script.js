// URL del script de Google Apps Script
const scriptUrl = 'https://script.google.com/macros/s/AKfycbxub8jnT4eMDYQnzzDmfNpneQuopU3VrG7Wdk3DjEu7nvaBSZL1kXI3PBqI7VWtT4YR/exec';

// Captura el parámetro id_sala de la URL
const urlParams = new URLSearchParams(window.location.search);
const idSala = urlParams.get('id_sala');

// Elemento donde se mostrará la información
const salaInfo = document.getElementById('sala-info');

if (idSala) {
    // Carga la información de la sala desde Google Sheets
    fetch(`${scriptUrl}?id_sala=${idSala}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                salaInfo.innerHTML = `
                    <div class="col-md-6 mx-auto">
                        <div class="card mb-3">
                            <div class="card-body">
                                <p class="card-text text-center">${data.error}</p>
                            </div>
                        </div>
                    </div>`;
            } else {
                // Muestra la información de la sala en una tarjeta
                salaInfo.innerHTML = `
                    <div class="col-md-6 mx-auto">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Información de la Sala ${data[1]}</h5>
                                <p class="card-text"><strong>Fecha de Revisión:</strong> ${data[2]}</p>
                                <p class="card-text"><strong>Responsable:</strong> ${data[3]}</p>
                                <p class="card-text"><strong>Estado de Conectividad:</strong> ${data[5]}</p>
                                <p class="card-text"><strong>Estado de Conectividad Tablet:</strong> ${data[6]}</p>
                                <p class="card-text"><strong>Observaciones:</strong> ${data[12]}</p>
                            </div>
                        </div>
                    </div>`;
            }
        })
        .catch(error => {
            salaInfo.innerHTML = `
                <div class="col-md-6 mx-auto">
                    <div class="card mb-3">
                        <div class="card-body">
                            <p class="card-text text-center">Error al cargar la información. Inténtelo de nuevo más tarde.</p>
                        </div>
                    </div>
                </div>`;
            console.error(error);
        });
} else {
    salaInfo.innerHTML = `
        <div class="col-md-6 mx-auto">
            <div class="card mb-3">
                <div class="card-body">
                    <p class="card-text text-center">Error: No se proporcionó un ID de sala.</p>
                </div>
            </div>
        </div>`;
}