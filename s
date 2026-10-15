[1mdiff --git a/index.html b/index.html[m
[1mindex d9cd1e2..aeadea8 100644[m
[1m--- a/index.html[m
[1m+++ b/index.html[m
[36m@@ -3,7 +3,7 @@[m
 <head>[m
     <meta charset="UTF-8">[m
     <meta name="viewport" content="width=device-width, initial-scale=1.0">[m
[31m-    <title>Document</title>[m
[32m+[m[32m    <title>Software Shop - Registro</title>[m
 </head>[m
 <body>[m
     <div class="form-pagos">[m
[36m@@ -32,17 +32,17 @@[m
 [m
     <div class="orden-1">[m
         <select class="texto-tarjeta w-input" data-ix="aparece-abajo-a-arriba" required="required" name="tipo_entidad" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);"><option selected="selected" value="">Sel. Tipo Entidad</option><option value="1">Académica</option><option value="2">Corporativa</option><option value="8">Distribuidor (Reseller)</option><option value="5">Estudiante</option><option value="6">Gobierno</option><option value="4">Otros</option><option value="7">Personal</option></select>[m
[31m-        <input class="texto-tarjeta w-input" data-ix="aparece-abajo-a-arriba" id="entidad" placeholder="Entidad / Empresa" required="required" name="entidad" type="text" value="Ucol" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);">[m
[32m+[m[32m        <input class="texto-tarjeta w-input" data-ix="aparece-abajo-a-arriba" id="entidad" placeholder="Entidad / Empresa" required="required" name="entidad" type="text" value="" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);">[m
     </div>[m
 [m
     <div class="orden-1">[m
         <!-- <input type="text" class="texto-tarjeta w-input" data-ix="aparece-abajo-a-arriba" placeholder="Nombre / Nome" required> -->[m
[31m-        <input class="texto-tarjeta w-input" data-ix="aparece-abajo-a-arriba" id="nombre" placeholder="Nombre / Nome" required="required" name="nombre" type="text" value="José Manuel" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);">[m
[31m-        <input class="texto-tarjeta w-input" data-ix="aparece-abajo-a-arriba" id="apellido" placeholder="Apellido / Sobrenome" required="required" name="apellido" type="text" value="Vázquez Orozco" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);">[m
[32m+[m[32m        <input class="texto-tarjeta w-input" data-ix="aparece-abajo-a-arriba" id="nombre" placeholder="Nombre / Nome" required="required" name="nombre" type="text" value="" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);">[m
[32m+[m[32m        <input class="texto-tarjeta w-input" data-ix="aparece-abajo-a-arriba" id="apellido" placeholder="Apellido / Sobrenome" required="required" name="apellido" type="text" value="" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);">[m
     </div>[m
 [m
     <div class="orden-1">[m
[31m-        <input id="ciudad" class="texto-tarjeta w-input ciudad_nombre" data-ix="aparece-abajo-a-arriba" maxlength="5" data-toggle="tooltip" title="" placeholder="Ciudad / Cidade" required="required" name="ciudad" type="text" value="Colima (Colima, México)" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);" data-original-title="Busca tu ciudad en la lista desplegada">[m
[32m+[m[32m        <input id="ciudad" class="texto-tarjeta w-input ciudad_nombre" data-ix="aparece-abajo-a-arriba" maxlength="5" data-toggle="tooltip" title="" placeholder="Ciudad / Cidade" required="required" name="ciudad" type="text" value="" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);" data-original-title="Busca tu ciudad en la lista desplegada">[m
         <input id="ciudadID" class="texto-tarjeta w-input ciudad_ID" placeholder="Ciudad" required="required" name="ciudadID" type="hidden" value="103570">[m
     </div>[m
 [m
[36m@@ -51,9 +51,9 @@[m
     </div>[m
 [m
     <div class="orden-1">[m
[31m-        <input class="_30 texto-tarjeta w-input ciudad_indicativo" data-ix="aparece-abajo-a-arriba" readonly="" placeholder="Indicativo" name="indicativo" type="text" value="+52(312)" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);">[m
[31m-        <input class="texto-tarjeta w-input" id="celular" data-ix="aparece-abajo-a-arriba" placeholder="Teléfono / Celular / Fone" name="telef_oficina" type="text" value="2166216233" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);">[m
[31m-        <input class="_30 texto-tarjeta w-input" data-ix="aparece-abajo-a-arriba" placeholder="Ext./Anexo/Extensão" name="ext" type="text" value="amnskanmks" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);">[m
[32m+[m[32m        <input class="_30 texto-tarjeta w-input ciudad_indicativo" data-ix="aparece-abajo-a-arriba" readonly="" placeholder="Indicativo" name="indicativo" type="text" value="" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);">[m
[32m+[m[32m        <input class="texto-tarjeta w-input" id="celular" data-ix="aparece-abajo-a-arriba" placeholder="Teléfono / Celular / Fone" name="telef_oficina" type="text" value="" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);">[m
[32m+[m[32m        <input class="_30 texto-tarjeta w-input" data-ix="aparece-abajo-a-arriba" placeholder="Ext./Anexo/Extensão" name="ext" type="text" value="" style="transition: all, opacity 1000ms, transform 1000ms; opacity: 1; transform: translateX(0px) translateY(0px) translateZ(0px);">[m
     </div>[m
 [m
     <div class="orden-1">[m
