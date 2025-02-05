// URL del script de Google Apps Script
const scriptUrl = 'https://script.google.com/macros/s/AKfycbyCdTycKr-zRtIgicwCrh2Cog7cQM-jy9dtiptZuaP0sTe_rZvVAbOVCNS3vnvnXwc3/exec';

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
                    <div class="col-md-8 mx-auto">
                        <div class="card mb-3">
                            <div class="card-body">
                                <p class="card-text text-center">${data.error}</p>
                            </div>
                        </div>
                    </div>`;
            } else {
                // Muestra la información de la sala en una tarjeta con iconos
                salaInfo.innerHTML = `
                    <div class="col-md-8 mx-auto">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Información de la Sala ${data.nombre_sala}</h5>
                                <p class="card-text">
                                    <i class="bi bi-calendar"></i>
                                    <strong>Fecha de Revisión:</strong> ${data.fecha_revision}
                                </p>
                                <p class="card-text">
                                    <i class="bi bi-person"></i>
                                    <strong>Responsable:</strong> ${data.responsable}
                                </p>
                                <p class="card-text">
                                    <i class="bi bi-wifi"></i>
                                    <strong>Estado de Conectividad:</strong> ${data.estado_conectividad}
                                </p>
                                <p class="card-text">
                                    <i class="bi bi-tablet"></i>
                                    <strong>Estado de Conectividad Tablet:</strong> ${data.estado_conectividad_tablet}
                                </p>
                                <p class="card-text">
                                    <i class="bi bi-chat"></i>
                                    <strong>Observaciones:</strong> ${data.observaciones}
                                </p>
                            </div>
                        </div>
                    </div>`;
            }
        })
        .catch(error => {
            salaInfo.innerHTML = `
                <div class="col-md-8 mx-auto">
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
        <div class="col-md-8 mx-auto">
            <div class="card mb-3">
                <div class="card-body">
                    <p class="card-text text-center">Error: No se proporcionó un ID de sala.</p>
                </div>
            </div>
        </div>`;
}