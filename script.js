// Script interactivo para la réplica de Software Shop
$(document).ready(function() {
    // 1. Tooltips Bootstrap
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // 2. Base de datos de ciudades para autocompletado con indicativos telefónicos
    var listaCiudades = [
        { id: "1", value: "Bogotá, Colombia", nombre: "Bogotá", indicativo: "+57 (1)" },
        { id: "2", value: "Medellín, Colombia", nombre: "Medellín", indicativo: "+57 (4)" },
        { id: "3", value: "Cali, Colombia", nombre: "Cali", indicativo: "+57 (2)" },
        { id: "4", value: "Barranquilla, Colombia", nombre: "Barranquilla", indicativo: "+57 (5)" },
        { id: "5", value: "Bucaramanga, Colombia", nombre: "Bucaramanga", indicativo: "+57 (7)" },
        { id: "6", value: "Cartagena, Colombia", nombre: "Cartagena", indicativo: "+57 (5)" },
        { id: "7", value: "Ciudad de México, México", nombre: "Ciudad de México", indicativo: "+52 (55)" },
        { id: "8", value: "Guadalajara, México", nombre: "Guadalajara", indicativo: "+52 (33)" },
        { id: "9", value: "Monterrey, México", nombre: "Monterrey", indicativo: "+52 (81)" },
        { id: "10", value: "Puebla, México", nombre: "Puebla", indicativo: "+52 (222)" },
        { id: "11", value: "Lima, Perú", nombre: "Lima", indicativo: "+51 (1)" },
        { id: "12", value: "Arequipa, Perú", nombre: "Arequipa", indicativo: "+51 (54)" },
        { id: "13", value: "Santiago, Chile", nombre: "Santiago", indicativo: "+56 (2)" },
        { id: "14", value: "Valparaíso, Chile", nombre: "Valparaíso", indicativo: "+56 (32)" },
        { id: "15", value: "Buenos Aires, Argentina", nombre: "Buenos Aires", indicativo: "+54 (11)" },
        { id: "16", value: "Córdoba, Argentina", nombre: "Córdoba", indicativo: "+54 (351)" },
        { id: "17", value: "Rosario, Argentina", nombre: "Rosario", indicativo: "+54 (341)" },
        { id: "18", value: "Quito, Ecuador", nombre: "Quito", indicativo: "+593 (2)" },
        { id: "19", value: "Guayaquil, Ecuador", nombre: "Guayaquil", indicativo: "+593 (4)" },
        { id: "20", value: "Cuenca, Ecuador", nombre: "Cuenca", indicativo: "+593 (7)" },
        { id: "21", value: "São Paulo, Brasil", nombre: "São Paulo", indicativo: "+55 (11)" },
        { id: "22", value: "Rio de Janeiro, Brasil", nombre: "Rio de Janeiro", indicativo: "+55 (21)" },
        { id: "23", value: "Caracas, Venezuela", nombre: "Caracas", indicativo: "+58 (212)" },
        { id: "24", value: "Montevideo, Uruguay", nombre: "Montevideo", indicativo: "+598 (2)" },
        { id: "25", value: "San José, Costa Rica", nombre: "San José", indicativo: "+506" },
        { id: "26", value: "Ciudad de Panamá, Panamá", nombre: "Ciudad de Panamá", indicativo: "+507" },
        { id: "27", value: "Madrid, España", nombre: "Madrid", indicativo: "+34 (91)" },
        { id: "28", value: "Barcelona, España", nombre: "Barcelona", indicativo: "+34 (93)" }
    ];

    if ($.fn.autocomplete) {
        $(".ciudad_nombre").autocomplete({
            minLength: 1,
            delay: 100,
            source: function(request, response) {
                var term = request.term.toLowerCase();
                var matches = $.grep(listaCiudades, function(item) {
                    return item.value.toLowerCase().indexOf(term) >= 0;
                });
                response(matches);
            },
            select: function(event, ui) {
                $('.ciudad_nombre').val(ui.item.value);
                $('.ciudad_ID').val(ui.item.id);
                $('.ciudad_indicativo').val(ui.item.indicativo);
                return false;
            }
        });
    }

    // 3. Drawer de Cotizar
    $("#desplegable_Cotizar").on("click", function(e) {
        e.preventDefault();
        $(".despliegue").fadeIn(200).css("display", "block");
    });

    $("#cerrar_Desplegable_Cotizar").on("click", function(e) {
        e.preventDefault();
        $(".despliegue").fadeOut(200);
    });

    // 4. Modal / Lightbox de Solicitud
    $("#cerrar_Solicitud_Lightbox").on("click", function(e) {
        e.preventDefault();
        $(".lightbox-solicitud").fadeOut(200);
    });

    // 5. Modal / Lightbox de Confirmación Cotización
    $("#cerrar_lightbox_Cotizacion").on("click", function(e) {
        e.preventDefault();
        $(".lightbox-confirma").fadeOut(200);
    });

    // 6. Manejador de validación y envío del formulario de registro
    $("#boton-formulario-registro").on("click", function(e) {
        e.preventDefault();

        var entidad = $('#entidad').val() ? $('#entidad').val().trim() : '';
        var nombre = $('#nombre').val() ? $('#nombre').val().trim() : '';
        var apellido = $('#apellido').val() ? $('#apellido').val().trim() : '';
        var ciudad = $('#ciudad').val() ? $('#ciudad').val().trim() : '';
        var celular = $('#celular').val() ? $('#celular').val().trim() : '';
        var errorLabel = $('#error');

        if (!entidad || !nombre || !apellido || !ciudad || !celular) {
            errorLabel.css({
                "display": "block",
                "color": "#e74c3c",
                "background": "#fdf0ed",
                "border": "1px solid #fab8b1",
                "padding": "10px 14px",
                "border-radius": "6px",
                "font-weight": "bold",
                "margin": "12px 0",
                "text-align": "center"
            });
            errorLabel.text("Se deben completar todos los campos del formulario");
            $('html, body').animate({
                scrollTop: errorLabel.offset().top - 120
            }, 300);
            return;
        }

        errorLabel.hide();

        // Si reCAPTCHA está disponible y en dominio válido, se ejecuta, si no, simula envío exitoso
        var executeRecaptcha = function() {
            if (typeof grecaptcha !== 'undefined' && grecaptcha.execute) {
                grecaptcha.ready(function() {
                    grecaptcha.execute('6LffdwQsAAAAAK6_p97UO1FbhjXUus21Lmeldrfs', { action: 'validarUsuario' })
                        .then(function(token) {
                            mostrarExito();
                        })
                        .catch(function() {
                            mostrarExito();
                        });
                });
            } else {
                mostrarExito();
            }
        };

        function mostrarExito() {
            var exitoHtml = '<div id="mensaje-exito" style="background:#e8f8f0; border:1px solid #27ae60; color:#27ae60; padding:18px 24px; border-radius:8px; text-align:center; font-weight:bold; font-size:16px; margin:20px 0;">' +
                            '¡Registro exitoso! Gracias por registrarte en Software Shop.' +
                            '</div>';
            $('#form-registro').slideUp(300, function() {
                $('.w-form').append(exitoHtml);
            });
        }

        executeRecaptcha();
    });

    // 7. Toggle menú responsive (mobile)
    $(".bar.nav-bar-menu").on("click", function() {
        var menu = $(this).siblings(".nav-menu-responsive-left");
        menu.toggle();
    });

    // 8. Prevención de submit en Enter según el script original
    $("form").keypress(function(e) {
        if (e.which === 13) {
            return false;
        }
    });
});
