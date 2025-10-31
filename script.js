/***********************
  script.js - Banco 100 preguntas bomberiles -> mostrar 20 aleatorias
  Comentado línea por línea (explicación en cada sección)
  - Tipo: opción múltiple 4 alternativas (a,b,c,d)
  - Modo: mostrar explicación de cada respuesta después del examen
  - Corrección: puntaje guardado como número de aciertos (ej. 9) en el CSV
***********************/

/* --------------------
   BANCO: 100 preguntas (mezcladas, en español)
   Cada objeto: { id, q, options: [a,b,c,d], answer: 'a'|'b'|'c'|'d', explanation }
   Temática: Bomberos (incendios, HAZMAT, SCBA, primeros auxilios, rescate, etc.)
   -------------------- */
const PREGUNTAS_100 = [
 {id:1, q:"¿Cuál es la naturaleza del CGBVP?", 
 options:["Una entidad pública autónoma.","Un organismo privado con fines comerciales.","Una organización cívica nacional de servicio voluntario y ad honorem.","Un brazo operativo del Ministerio del Interior.","Una ONG financiada por el Estado."], 
answer:"c", explanation:"El CGBVP es una organización cívica nacional de servicio voluntario y ad honorem."},

{id:2, q:"¿Qué norma regula principalmente el funcionamiento del CGBVP?", 
options:["La Ley Orgánica de Municipalidades.","El Decreto Legislativo 1260.","El Código Penal.","La Ley General de Bomberos Voluntarios del Perú.","El Reglamento Interno del Congreso."], answer:"b", explanation:"El funcionamiento del CGBVP está regulado por el Decreto Legislativo 1260."},

{id:3, q:"¿Cuál es el lema del CGBVP?", 
options:["Dios, Patria y Servicio.","Disciplina, Honor y Lealtad.","Dios, Patria, Humanidad.","Salvar vidas es nuestra misión.","Seguridad y Prevención."], answer:"c", explanation:"El lema oficial del CGBVP es 'Dios, Patria, Humanidad'."},

{id:4, q:"¿Cuál de las siguientes NO es una función principal del CGBVP?", 
options:["Combatir incendios.","Capacitar a los ciudadanos en prevención de riesgos.","Dirigir las Fuerzas Armadas en situaciones de crisis.","Realizar rescates en accidentes.","Brindar atención prehospitalaria."], answer:"c", explanation:"El CGBVP no dirige las Fuerzas Armadas, su labor se centra en emergencias y rescate."},

{id:5, q:"¿Cómo deben utilizarse los bienes asignados al CGBVP?", 
options:["Exclusivamente para el cumplimiento de sus funciones institucionales.","Para generar ingresos adicionales para los bomberos.","Para el uso personal de los comandantes.","Para ser prestados a otras entidades privadas.","Sin ninguna restricción de uso."], answer:"a", explanation:"Los bienes asignados al CGBVP deben usarse exclusivamente para el cumplimiento de sus funciones institucionales."},

{id:6, q:"¿Quién regula la administración de bienes y servicios del CGBVP?", 
options:["El Ministerio del Interior.","La Intendencia Nacional de Bomberos del Perú (INBP).","El Comandante General del CGBVP.","El Congreso de la República.","La Policía Nacional del Perú."], answer:"b", explanation:"La INBP es la encargada de regular la administración de bienes y servicios del CGBVP."},

{id:7, q:"¿Qué tipo de bienes pueden ser otorgados al CGBVP?", 
options:["Solo vehículos y equipamiento contra incendios.","Equipos, infraestructura, materiales y recursos financieros.","Solo donaciones de personas naturales.","Únicamente bienes adquiridos con presupuesto estatal.","Exclusivamente herramientas manuales."], answer:"b", explanation:"El CGBVP puede recibir equipos, infraestructura, materiales y recursos financieros."},

{id:8, q:"¿Quiénes pueden ser parte del CGBVP?", 
options:["Solo ciudadanos peruanos.","Cualquier persona que cumpla los requisitos de ingreso.","Solo personal de las Fuerzas Armadas.","Solo mayores de 30 años con título profesional.","Únicamente personas con formación en seguridad."], answer:"b", explanation:"Pueden ser parte del CGBVP todas las personas que cumplan con los requisitos establecidos."},

{id:9, q:"¿Cuál es la clasificación de los bomberos dentro del CGBVP?", 
options:["Bomberos activos, bomberos en formación y bomberos en retiro.","Bomberos voluntarios, bomberos asimilados y bomberos en retiro.","Bomberos operativos, administrativos y logísticos.","Bomberos locales, departamentales y nacionales.","Solo bomberos en actividad y en reserva."], answer:"b", explanation:"Los bomberos se clasifican en voluntarios, asimilados y en retiro."},

{id:10, q:"¿Cuál es la edad máxima para ingresar como bombero voluntario activo?", 
options:["18 años.","25 años.","31 años.","40 años.","No hay límite de edad."], answer:"c", explanation:"La edad máxima para ingresar como bombero voluntario activo es 31 años."},

{id:11, q:"¿Qué tipo de servicio prestan los bomberos del CGBVP?", 
options:["Voluntario y ad honorem.","Remunerado mediante subsidios.","A tiempo completo con salario.","Por contrato temporal.","Con pago por horas de servicio."], answer:"a", explanation:"El servicio que prestan los bomberos del CGBVP es voluntario y ad honorem."},

{id:12, q:"¿Qué función cumple el Consejo de Oficiales Generales?", 
options:["Supervisar y asesorar la gestión del CGBVP.","Administrar los fondos del CGBVP.","Controlar la disciplina de los bomberos voluntarios.","Capacitar a nuevos bomberos voluntarios.","Aprobar las licencias de los bomberos en retiro."], answer:"a", explanation:"El Consejo de Oficiales Generales supervisa y asesora la gestión institucional."},

{id:13, q:"¿Quiénes conforman el Consejo de Oficiales Generales?", 
options:["Todos los bomberos del CGBVP.","Oficiales Generales en actividad.","Comandantes Departamentales.","Representantes del Ministerio del Interior.","Miembros de la Policía Nacional del Perú."], answer:"b", explanation:"El Consejo de Oficiales Generales está conformado por Oficiales Generales en actividad."},

{id:14, q:"¿Quién preside el Consejo de Oficiales Generales?", 
options:["El Ministro del Interior.","El Comandante General.","El Comandante Territorial.","El Presidente del Congreso.","El Inspector General."], answer:"b", explanation:"El Consejo de Oficiales Generales es presidido por el Comandante General."},

{id:15, q:"¿Qué porcentaje de miembros del Consejo de Oficiales Generales puede convocar una sesión extraordinaria?", options:["10%.","20%.","30%.","40%.","50%."], answer:"b", explanation:"El 20% de los miembros del Consejo de Oficiales Generales puede convocar una sesión extraordinaria."},

{id:16, q:"¿Cuál es el máximo cargo dentro del CGBVP?", 
options:["Inspector General.","Comandante Departamental.","Comandante General.","Jefe de Unidad Básica Operativa.","Vicecomandante General."], answer:"c", explanation:"El Comandante General es el máximo cargo dentro del CGBVP."},

{id:17, q:"¿Cuánto dura el mandato del Comandante General del CGBVP?", 
options:["1 año.","2 años.","3 años.","4 años.","5 años."], answer:"b", explanation:"El mandato del Comandante General del CGBVP dura 2 años."},

{id:18, q:"¿Qué requisitos debe cumplir un bombero para ser elegido Comandante General?", 
options:["Ser Oficial General en actividad y contar con al menos 5 años en el grado.","Tener más de 20 años en el CGBVP.","Haber sido Comandante Departamental previamente.","Ser elegido por los bomberos mediante votación.","Haber ocupado el cargo de Vicecomandante General."], answer:"a", explanation:"Debe ser Oficial General en actividad con al menos 5 años en el grado."},

{id:19, q:"¿Qué función principal tiene el Comandante General?", 
options:["Dirigir la estrategia y operación nacional del CGBVP.","Capacitar a los bomberos en formación.","Aprobar los reglamentos internos de las estaciones.","Supervisar exclusivamente la disciplina.","Gestionar la compra de equipamiento."], answer:"a", explanation:"El Comandante General dirige la estrategia y operación nacional del CGBVP."},

{id:20, q:"¿Qué sucede si el Comandante General no puede ejercer sus funciones?", 
options:["Lo reemplaza el Vicecomandante General.","Se convoca a nuevas elecciones.","El Consejo de Oficiales Generales nombra un sucesor.","El Ministerio del Interior designa un reemplazo.","Se cierra la institución hasta nueva orden."], answer:"a", explanation:"En ausencia del Comandante General, asume el Vicecomandante General."},

{id:21, q:"¿Cuál es la función principal del Comando Nacional del CGBVP?", 
options:["Supervisar las estaciones de bomberos.","Administrar los fondos institucionales.","Dirigir la estrategia y operación nacional del CGBVP.","Capacitar exclusivamente a los bomberos activos.","Regular las actividades privadas de los bomberos."], answer:"c", explanation:"El Comando Nacional dirige la estrategia y operación nacional del CGBVP."},

{id:22, q:"¿Quién lidera la Dirección del Comando Nacional?", 
options:["El Ministro del Interior.","El Presidente del Consejo de Oficiales Generales.","El Comandante General del CGBVP.","El Inspector General.","El Consejo Nacional de Disciplina."], answer:"c", explanation:"La Dirección del Comando Nacional es liderada por el Comandante General del CGBVP."},

{id:23, q:"¿Qué documento establece las funciones del Comando Nacional?", 
options:["Ley Orgánica de Municipalidades.","Reglamento Interno de Funcionamiento del CGBVP.","Código Penal.","Decreto Supremo de Defensa Civil.","Ley General de Bomberos."], answer:"b", explanation:"El Reglamento Interno de Funcionamiento del CGBVP establece las funciones del Comando Nacional."},

{id:24, q:"¿Cuál de los siguientes NO es un órgano de línea del CGBVP?", 
options:["Dirección de Operaciones.","Dirección de Logística.","Dirección de Recursos Humanos.","Dirección de Normas y Procedimientos.","Dirección de Finanzas."], answer:"d", explanation:"La Dirección de Normas y Procedimientos no es un órgano de línea del CGBVP."},

{id:25, q:"¿Qué función principal cumplen los órganos de línea?", 
options:["Brindar asesoramiento técnico.","Planificar y ejecutar las operaciones del CGBVP.","Dirigir el presupuesto institucional.","Supervisar el Consejo de Oficiales Generales.","Administrar la relación con entidades internacionales."], answer:"b", explanation:"Los órganos de línea planifican y ejecutan las operaciones del CGBVP."},

{id:26, q:"¿Cuál de los siguientes es un órgano de asesoramiento del CGBVP?", 
options:["Dirección de Asuntos Jurídicos.","Dirección de Control Interno.","Dirección de Personal.","Dirección de Coordinación Territorial.","Dirección de Seguridad Nacional."], answer:"a", explanation:"La Dirección de Asuntos Jurídicos es un órgano de asesoramiento."},

{id:27, q:"¿Qué tarea principal cumple un órgano de asesoramiento?", 
options:["Ejecutar operaciones de rescate.","Dictar normativas internas.","Proveer apoyo técnico y consultivo al Comando Nacional.","Supervisar estaciones de bomberos.","Administrar la capacitación de aspirantes."], answer:"c", explanation:"Los órganos de asesoramiento brindan apoyo técnico y consultivo al Comando Nacional."},

{id:28, q:"¿Cuál es el rol del Consejo Nacional de Disciplina?", 
options:["Coordinar las operaciones nacionales.","Administrar el presupuesto anual.","Evaluar y sancionar las faltas disciplinarias de los bomberos.","Supervisar donaciones.","Brindar asistencia psicológica."], answer:"c", explanation:"El Consejo Nacional de Disciplina evalúa y sanciona las faltas disciplinarias de los bomberos."},

{id:29, q:"¿Qué tipo de faltas disciplina el Consejo Nacional de Disciplina?", 
options:["Solo faltas leves.","Solo faltas graves.","Faltas leves y graves de los bomberos voluntarios.","Solo faltas administrativas.","Exclusivamente casos penales."], answer:"c", explanation:"El Consejo Nacional de Disciplina atiende faltas leves y graves."},

{id:30, q:"¿Cuál es la función principal de la Inspectoría General?", 
options:["Supervisar el cumplimiento de normas dentro del CGBVP.","Dirigir operativos de emergencia.","Asignar recursos financieros.","Capacitar a aspirantes.","Administrar bienes del CGBVP."], answer:"a", explanation:"La Inspectoría General supervisa el cumplimiento de normas dentro del CGBVP."},

{id:31, q:"¿Cuál es la función del Comandante Territorial?", 
options:["Coordinar acciones operativas en una jurisdicción determinada.","Aprobar el presupuesto anual.","Dirigir el Consejo Nacional de Disciplina.","Gestionar la relación con el Ministerio del Interior.","Regular normas de seguridad pública."], answer:"a", explanation:"El Comandante Territorial coordina acciones operativas en su jurisdicción."},

{id:32, q:"¿A quién reporta el Comandante Territorial?", 
options:["Al Congreso de la República.","Al Comandante General del CGBVP.","Al Ministro del Interior.","A la Policía Nacional.","Al Consejo Nacional de Disciplina."], answer:"b", explanation:"El Comandante Territorial reporta al Comandante General del CGBVP."},

{id:33, q:"¿Qué responsabilidad tiene la Comandancia Departamental?", 
options:["Regular ingreso de nuevos bomberos.","Supervisar y coordinar unidades básicas operativas del departamento.","Emitir normas nacionales de seguridad.","Administrar fondos de todas las estaciones.","Organizar operativos policiales."], answer:"b", explanation:"La Comandancia Departamental coordina las UBO en su jurisdicción."},

{id:34, q:"¿Cuál es el nivel operativo más básico dentro del CGBVP?", 
options:["Comandancia Departamental.","Comandante Territorial.","Unidad Básica Operativa (UBO).","Oficina de Recursos Humanos.","Consejo de Oficiales Generales."], answer:"c", explanation:"La Unidad Básica Operativa es el nivel operativo más básico."},

{id:35, q:"¿Quién lidera una Unidad Básica Operativa?", 
options:["El Primer Jefe de Unidad.","El Ministro del Interior.","El Comandante Departamental.","El Inspector General.","El Consejo Nacional de Disciplina."], answer:"a", explanation:"La UBO está dirigida por el Primer Jefe de Unidad."},

{id:36, q:"¿Quiénes pueden votar en las elecciones del Comandante General?", 
options:["Todos los bomberos voluntarios en actividad.","Solo los Oficiales Generales en actividad.","El Congreso de la República.","Solo el Consejo de Oficiales Generales.","Los ciudadanos peruanos."], answer:"b", explanation:"Solo los Oficiales Generales en actividad pueden votar."},

{id:37, q:"¿Cada cuánto tiempo se elige al Comandante General del CGBVP?", 
options:["Cada 1 año.","Cada 2 años.","Cada 3 años.","Cada 4 años.","Cada 5 años."], answer:"b", explanation:"El Comandante General se elige cada 2 años."},

{id:38, q:"¿Quiénes organizan las elecciones dentro del CGBVP?", 
options:["El Ministerio del Interior.","El Consejo Nacional de Disciplina.","El Comité Electoral del CGBVP.","La Policía Nacional.","El Congreso de la República."], answer:"c", explanation:"Las elecciones son organizadas por el Comité Electoral del CGBVP."},

{id:39, q:"¿Qué sucede si el Comandante General electo no puede asumir funciones?", 
options:["El Vicecomandante General asume el cargo.","Se anula la elección.","El Congreso designa un nuevo Comandante.","La Policía interviene la institución.","El Consejo Nacional de Disciplina toma el control."], answer:"a", explanation:"El Vicecomandante General asume el cargo si el Comandante electo no puede hacerlo."},

{id:40, q:"¿Qué sucede si hay empate en las elecciones del Comandante General?", 
options:["Se repiten las elecciones.","Gana el candidato con más años de servicio.","Se elige al candidato con mejor desempeño.","Se realiza votación especial entre los Oficiales Generales.","Decide el Ministro del Interior."], answer:"d", explanation:"En caso de empate, se realiza una votación especial entre los Oficiales Generales."},

{id:41, q:"¿Qué personas conforman el personal del CGBVP?", 
options:["Solo bomberos activos.","Bomberos voluntarios en actividad, bomberos asimilados y bomberos en retiro.","Únicamente bomberos operativos.","Solo oficiales superiores.","Todo el personal de seguridad pública."], answer:"b", explanation:"El personal está conformado por bomberos voluntarios, asimilados y en retiro."},

{id:42, q:"¿Qué documento establece los requisitos para el ingreso y permanencia de los bomberos?", 
options:["Reglamento Interno de Funcionamiento del CGBVP.","Código Penal del Perú.","Ley Orgánica de Bomberos Voluntarios.","Normativa de Seguridad Ciudadana.","Reglamento del Congreso."], answer:"a", explanation:"El Reglamento Interno de Funcionamiento del CGBVP establece los requisitos para el ingreso y permanencia."},

{id:43, q:"¿Quiénes son considerados bomberos voluntarios activos?", 
options:["Todos los ciudadanos peruanos mayores de edad.","Quienes han culminado su instrucción y prestan servicio operativo.","Personal administrativo del CGBVP.","Oficiales retirados del CGBVP.","Todo aquel que realice alguna función dentro del CGBVP."], answer:"b", explanation:"Son bomberos activos quienes culminaron su instrucción y prestan servicio operativo."},

{id:44, q:"¿Cuál es el requisito mínimo de edad para ingresar como bombero voluntario activo?", 
options:["18 años.","21 años.","15 años.","25 años.","31 años."], answer:"c", explanation:"El requisito mínimo de edad es tener 15 años cumplidos."},

{id:45, q:"¿Cuál es la edad máxima para ingresar como bombero voluntario activo?", 
options:["21 años.","25 años.","31 años.","40 años.","No hay límite de edad."], answer:"c", explanation:"La edad máxima para ingresar es 31 años."},

{id:46, q:"¿Qué documento acredita oficialmente a un bombero dentro del CGBVP?", 
options:["Un certificado de entrenamiento.","Un documento de identidad civil.","La resolución de nombramiento emitida por el Comando Nacional.","Una carta firmada por el Comandante General.","Un diploma de servicio voluntario."], answer:"c", explanation:"La resolución de nombramiento emitida por el Comando Nacional acredita oficialmente a un bombero."},

{id:47, q:"¿Qué requisito es obligatorio para la permanencia de un bombero en el CGBVP?", 
options:["Cumplir con la jornada voluntaria mínima establecida.","Presentarse en las elecciones internas.","Trabajar en una entidad pública.","Haber servido en la Policía Nacional.","Ser evaluado cada cinco años."], answer:"a", explanation:"Debe cumplir con la jornada voluntaria mínima establecida para mantener la condición activa."},

{id:48, q:"¿Qué sucede si un bombero no cumple con la asistencia mínima requerida?", 
options:["Es suspendido por seis meses.","Es cambiado de unidad.","Puede ser reclasificado como Bombero en Reserva.","Se le reduce la jerarquía.","No ocurre nada."], answer:"c", explanation:"Si no cumple la asistencia mínima, puede ser reclasificado como Bombero en Reserva."},

{id:49, q:"¿Qué sucede si un bombero permanece tres años consecutivos en situación de reserva?", 
options:["Debe aprobar un nuevo curso.","Es retirado del CGBVP.","Puede solicitar reincorporación sin restricciones.","Se le asigna una nueva función.","Es transferido a otra unidad."], answer:"b", explanation:"Un bombero en reserva por tres años consecutivos es retirado del CGBVP."},

{id:50, q:"¿Qué documento rige las sanciones disciplinarias dentro del CGBVP?", 
options:["Reglamento Interno de Funcionamiento del CGBVP.","Código Penal del Perú.","Ley de Defensa Civil.","Constitución del Perú.","Reglamento de la Policía Nacional."], answer:"a", explanation:"Las sanciones disciplinarias están reguladas por el Reglamento Interno de Funcionamiento del CGBVP."},

{id:51, q:"¿Cada cuánto tiempo debe un bombero someterse a un examen médico obligatorio?", 
options:["Cada 3 meses","Cada 6 meses","Anualmente, en el mes de abril","Cada 5 años","No es obligatorio"], answer:"c", explanation:"El examen médico es obligatorio una vez al año, específicamente en el mes de abril."},

{id:52, q:"¿Qué requisito adicional debe cumplir un bombero para participar en los ascensos dentro del CGBVP?", 
options:["Tener al menos 10 años de servicio","Aprobar las evaluaciones físicas y médicas anuales","Ser mayor de 40 años","Tener un título universitario en gestión de emergencias","Haber sido jefe de estación"], answer:"b", explanation:"Debe aprobar las evaluaciones físicas y médicas anuales para ser considerado en procesos de ascenso."},

{id:53, q:"¿Cuál es la primera jerarquía que obtiene un bombero voluntario activo?", 
options:["Subteniente","Capitán","Seccionario","Teniente","Aspirante"], answer:"c", explanation:"El primer grado jerárquico operativo es Seccionario."},

{id:54, q:"¿Qué factor es determinante para el ascenso dentro del CGBVP?", 
options:["Solo los años de servicio","Cumplimiento de requisitos, formación y evaluación de desempeño","Decisión exclusiva del Comandante General","Recomendación de compañeros de unidad","Haber ocupado cargos administrativos"], answer:"b", explanation:"El ascenso se otorga en base al cumplimiento de requisitos, formación y evaluación del desempeño."},

{id:55, q:"¿Cuál es la jerarquía más alta que puede alcanzar un bombero voluntario en el CGBVP?", 
options:["Comandante Territorial","Comandante Departamental","Brigadier General","Inspector General","Presidente del Consejo de Oficiales Generales"], answer:"c", explanation:"La jerarquía más alta es Brigadier General."},

{id:57, q:"¿Qué sucede si un bombero en reserva desea volver a ser operativo?", 
options:["Debe presentar una solicitud y cumplir con un proceso de evaluación","Se le otorga un ascenso inmediato","Debe cumplir con 5 años de servicio adicional","Se le asigna automáticamente a un cargo administrativo","No puede volver a ser operativo"], answer:"a", explanation:"Debe solicitar su reincorporación y pasar por una evaluación correspondiente."},

{id:58, q:"¿Quiénes pueden postular a los grados de oficiales dentro del CGBVP?", 
options:["Solo los bomberos en reserva","Todos los bomberos voluntarios","Solo los bomberos activos que cumplan con los requisitos establecidos","Bomberos con más de 20 años de servicio","Exclusivamente los Comandantes Departamentales"], answer:"c", explanation:"Solo los bomberos activos que cumplen con los requisitos pueden postular a grados de oficiales."},

{id:59, q:"¿Cuál es el beneficio de ascender dentro del CGBVP?", 
options:["Acceso a mejores remuneraciones","Mayores responsabilidades operativas y administrativas","Reducción en la jornada de servicio","Beneficios económicos por el estado","Permiso para no asistir a emergencias"], answer:"b", explanation:"El ascenso implica mayor responsabilidad operativa y administrativa."},

{id:60, q:"¿Cuál de los siguientes es un requisito para ascender a Brigadier?", 
options:["Haber participado en al menos 10 operativos nacionales","Cumplir con el tiempo mínimo de permanencia en el grado anterior y aprobar la evaluación respectiva","Ser el bombero con mayor antigüedad en su unidad","Ser elegido por votación popular","Haber trabajado en el Ministerio del Interior"], answer:"b", explanation:"El ascenso a Brigadier requiere cumplir el tiempo mínimo en el grado anterior y aprobar la evaluación respectiva."},

{id:61, q:"¿Cuál es el objetivo principal de los procedimientos operativos dentro del CGBVP?", 
options:["Garantizar la seguridad de la población en eventos deportivos","Estandarizar las acciones de los bomberos en emergencias para una respuesta eficiente y coordinada","Reducir el tiempo de servicio de los bomberos voluntarios","Permitir que cada estación establezca sus propias normas de actuación","Administrar el presupuesto del CGBVP en emergencias"], answer:"b", explanation:"Los procedimientos buscan estandarizar las acciones en emergencias para lograr una respuesta eficiente y coordinada."},

{id:62, q:"¿Qué documento regula los procedimientos operativos del CGBVP?", 
options:["Código Penal del Perú","Constitución Política del Perú","Reglamento Interno de Funcionamiento del CGBVP","Ley General de Bomberos del Perú","Código de Defensa Civil"], answer:"c", explanation:"El Reglamento Interno de Funcionamiento regula los procedimientos operativos."},

{id:63, q:"¿Quiénes deben conocer y aplicar los procedimientos operativos del CGBVP?", 
options:["Solo los oficiales de alto rango","Todos los bomberos voluntarios en actividad","Únicamente los bomberos encargados de emergencias urbanas","Solo el Comandante General y el Consejo de Oficiales Generales","Personal administrativo del CGBVP"], answer:"b", explanation:"Todos los bomberos activos deben conocer y aplicar los procedimientos operativos."},

{id:64, q:"¿Qué aspectos clave deben incluirse en los procedimientos operativos del CGBVP?", 
options:["Estrategias de financiamiento","Métodos de respuesta ante emergencias, seguridad del personal y protocolos de comunicación","Evaluaciones administrativas","Eventos de reconocimiento","Normas de servicio obligatorio"], answer:"b", explanation:"Los procedimientos deben incluir métodos de respuesta, seguridad y protocolos de comunicación."},

{id:65, q:"¿Cómo se determinan los procedimientos de atención a emergencias en el CGBVP?", 
options:["Por normativas de la Policía Nacional","Mediante estudios técnicos y experiencias previas de emergencias","Por decisión exclusiva del Comandante General","Según las directivas del Congreso","En función del presupuesto anual"], answer:"b", explanation:"Se basan en estudios técnicos y experiencias previas en emergencias."},

{id:66, q:"¿Cuál es el primer paso en cualquier procedimiento operativo en emergencias?", 
options:["Evaluar la situación y riesgos existentes","Comunicarse con los medios","Solicitar presencia policial","Llamar a familiares","Completar un informe administrativo"], answer:"a", explanation:"El primer paso siempre es evaluar la situación y riesgos."},

{id:67, q:"¿Qué recurso es fundamental para la ejecución efectiva de los procedimientos operativos?", 
options:["Combustible","Capacitación y entrenamiento constante del personal","Autorización del Congreso","Cantidad de bomberos en reserva","Número de bomberos activos"], answer:"b", explanation:"La capacitación constante del personal es fundamental para la eficacia operativa."},

{id:68, q:"¿Cuál de los siguientes procedimientos es fundamental en una emergencia con múltiples víctimas?", 
options:["Evacuación, clasificación de víctimas y estabilización médica inicial","Traslado inmediato de todos al hospital","Priorizar bienes materiales","Asegurar la escena para investigación","Esperar autorización ministerial"], answer:"a", explanation:"La evacuación, clasificación y estabilización inicial son esenciales ante múltiples víctimas."},

{id:69, q:"¿Quién tiene la máxima autoridad en una emergencia según el CGBVP?", 
options:["Comandante General","Ministro del Interior","Bombero con más años de servicio","Jefe de la Unidad Básica Operativa responsable","Presidente del Consejo de Oficiales"], answer:"d", explanation:"El Jefe de la UBO tiene autoridad máxima en la emergencia dentro de su jurisdicción."},

{id:70, q:"¿Qué principio guía la toma de decisiones en el mando de emergencias?", 
options:["Jerarquía y disciplina","Autoridad política","Decisiones en consenso","Revisión administrativa","Aprobación del Congreso"], answer:"a", explanation:"Las decisiones se basan en la jerarquía y disciplina institucional."},

{id:71, q:"¿Qué recurso clave debe garantizar el mando en emergencias?", 
options:["Recursos financieros","Coordinación efectiva y comunicación entre unidades","Supervisión policial","Difusión en medios","Redacción inmediata de informes"], answer:"b", explanation:"La coordinación y comunicación entre unidades son vitales para el mando eficiente."},

{id:72, q:"¿Cuándo puede transferirse el mando de una emergencia a otra autoridad dentro del CGBVP?", 
options:["Cuando la magnitud de la emergencia supera las capacidades de la unidad a cargo","Solo con autorización del Congreso","Nunca puede transferirse","Cuando el oficial a cargo lo decida sin justificación","Después de 24 horas"], answer:"a", explanation:"El mando se transfiere cuando la magnitud excede las capacidades de la unidad inicial."},

{id:73, q:"¿Cómo se estructura la cadena de mando en una emergencia?", 
options:["Con un solo líder sin delegación","Jerárquicamente con roles definidos","Cada bombero decide por su cuenta","Se define al momento sin criterios","Basada solo en disponibilidad de personal"], answer:"b", explanation:"La cadena de mando se estructura jerárquicamente con funciones definidas."},

{id:74, q:"¿Qué entidad supervisa el cumplimiento de la cadena de mando en emergencias?", 
options:["Inspectoría General del CGBVP","Ministerio del Interior","Congreso de la República","Policía Nacional","Organismos internacionales"], answer:"a", explanation:"La Inspectoría General supervisa el cumplimiento de la cadena de mando."},

{id:75, q:"¿Qué sucede si un bombero no respeta la cadena de mando en una emergencia?", 
options:["Recibe sanciones disciplinarias según el reglamento","No hay consecuencias","Se le asigna rol de observador","Se le da oportunidad sin sanción","Se transfiere automáticamente"], answer:"a", explanation:"El incumplimiento de la cadena de mando conlleva sanciones disciplinarias."},

{id:76, q:"¿Qué elemento es esencial para una cadena de mando eficiente?", 
options:["Cantidad de personal","Claridad en funciones y responsabilidades","Antigüedad del personal","Proximidad del Comandante General","Autorización del Ministerio de Defensa"], answer:"b", explanation:"La claridad en las funciones y responsabilidades garantiza eficiencia en la cadena de mando."},

{id:77, q:"¿Qué se busca garantizar con el respeto a la cadena de mando?", 
options:["Velocidad en informes","Disciplina y eficiencia en ejecución","Mayor número de promociones","Menos emergencias","Centralización total"], answer:"b", explanation:"El respeto a la cadena de mando asegura disciplina y eficiencia operativa."},

{id:78, q:"¿Qué factor puede modificar la cadena de mando en una emergencia?", 
options:["Gravedad del incidente y necesidad de escalamiento","Preferencia del oficial a cargo","Antigüedad en la escena","Disponibilidad presupuestaria","Cantidad de equipos"], answer:"a", explanation:"La gravedad del incidente puede requerir modificar o escalar la cadena de mando."},

{id:79, q:"¿Qué elemento debe priorizar la cadena de mando en una emergencia de gran magnitud?", 
options:["Seguridad del personal y la población afectada","Cobertura mediática","Reducción de costos","Decisiones centralizadas","Recopilación de datos"], answer:"a", explanation:"La prioridad es la seguridad de los intervinientes y la población afectada."},

{id:80, q:"¿Cuál de las siguientes NO es una función del mando en emergencias?", 
options:["Coordinar equipos","Establecer prioridades","Mantener comunicación con autoridades","Decidir financiamiento de la emergencia","Garantizar seguridad del personal"], answer:"d", explanation:"Decidir financiamiento no corresponde al mando en emergencias."},

{id:81, q:"¿Cuál es la finalidad del organigrama del CGBVP?", 
options:["Representar gráficamente la estructura jerárquica y funcional","Mostrar nombres de comandantes","Capacitar nuevos bomberos","Calcular presupuesto anual","Regular ingreso de personal"], answer:"a", explanation:"El organigrama representa la estructura jerárquica y funcional del CGBVP."},

{id:82, q:"¿Quién aprueba el organigrama del CGBVP?", 
options:["Ministerio del Interior","Comandante General","Consejo de Oficiales Generales","Congreso","Inspector General"], answer:"c", explanation:"El Consejo de Oficiales Generales aprueba el organigrama institucional."},

{id:83, q:"¿Cuál describe correctamente la organización del CGBVP?", 
options:["Centralizada sin órganos desconcentrados","Jerárquica con órganos de gobierno, operativos y de apoyo","Autónoma sin regulación","Militar rígida","Dirigida solo por voluntarios sin responsabilidad"], answer:"b", explanation:"El CGBVP tiene una organización jerárquica con órganos de gobierno, operativos y de apoyo."},

{id:84, q:"¿Qué niveles de organización conforman el CGBVP según su organigrama?", 
options:["Dirección General, Oficinas Centrales y Unidades Locales","Comando Nacional, Órganos Autónomos, Órganos Desconcentrados y Unidades Básicas Operativas","Dirección Nacional, Delegaciones Provinciales y Grupos de Rescate","Ministerio del Interior, Jefatura de Operaciones y Delegaciones Regionales","Solo un nivel operativo"], answer:"b", explanation:"El CGBVP se compone de Comando Nacional, Órganos Autónomos, Desconcentrados y Unidades Básicas."},

{id:85, q:"¿Qué área del CGBVP se encarga de la supervisión de las Unidades Básicas Operativas?", 
options:["Dirección de Logística","Inspectoría General","Consejo de Oficiales Generales","Ministerio del Interior","Dirección de Recursos Humanos"], answer:"b", explanation:"La Inspectoría General supervisa las Unidades Básicas Operativas."},

{id:86, q:"¿Cuál es el principal objetivo de los órganos desconcentrados dentro del CGBVP?", 
options:["Desarrollar funciones administrativas en Lima","Garantizar operatividad y gestión de emergencias en distintos territorios","Regular la estructura económica","Organizar eventos institucionales","Gestionar compras de equipos"], answer:"b", explanation:"Los órganos desconcentrados garantizan la gestión operativa en todo el país."},

{id:87, q:"¿Qué cargo dentro del CGBVP tiene la máxima autoridad operativa?", 
options:["Comandante General","Inspector General","Director de Finanzas","Coordinador de Entrenamiento","Jefe de Recursos Humanos"], answer:"a", explanation:"El Comandante General posee la máxima autoridad operativa."},

{id:88, q:"¿Qué función tiene la Comandancia Departamental dentro del organigrama?", 
options:["Supervisar Unidades Básicas Operativas","Dictar leyes sobre seguridad nacional","Administrar presupuesto nacional","Evaluar desempeño militar","Dirigir todas las emergencias nacionales"], answer:"a", explanation:"La Comandancia Departamental supervisa las UBO dentro de su jurisdicción."},

{id:89, q:"¿Qué entidad del CGBVP tiene autonomía en decisiones disciplinarias?", 
options:["Consejo Nacional de Disciplina","Comandancia Departamental","Comandante General","Ministerio del Interior","Dirección de Logística"], answer:"a", explanation:"El Consejo Nacional de Disciplina actúa con autonomía en temas disciplinarios."},

{id:90, q:"¿Qué área del CGBVP es responsable de la formación y capacitación de bomberos voluntarios?", 
options:["Escuela Nacional de Bomberos","Consejo Nacional de Disciplina","Ministerio del Interior","Oficina de Seguridad y Prevención","Dirección de Operaciones"], answer:"a", explanation:"La Escuela Nacional de Bomberos capacita y forma al personal voluntario."},

{id:91, q:"¿Cuál es el propósito de las disposiciones complementarias en el Reglamento Interno?", 
options:["Regular aspectos no detallados en los capítulos principales","Modificar la Ley Orgánica","Normar las Fuerzas Armadas","Definir estructura del Congreso","Fijar tasas de financiamiento"], answer:"a", explanation:"Las disposiciones complementarias regulan aspectos específicos no desarrollados."},

{id:92, q:"¿Cómo pueden modificarse las disposiciones complementarias del reglamento?", 
options:["Por decisión del Comandante General","Mediante acuerdo del Consejo de Oficiales Generales","Por orden del Ministerio del Interior","Por votación general de bomberos","No pueden modificarse"], answer:"b", explanation:"Solo pueden modificarse mediante acuerdo del Consejo de Oficiales Generales."},

{id:93, q:"¿Qué institución puede supervisar la aplicación de las disposiciones complementarias?", 
options:["Inspectoría General","Policía Nacional","Congreso","Dirección de Operaciones","Comandancia Departamental"], answer:"a", explanation:"La Inspectoría General puede supervisar la aplicación de dichas disposiciones."},

{id:94, q:"¿Qué sucede si un bombero incumple una disposición complementaria?", 
options:["Puede ser sometido a proceso disciplinario","No hay consecuencias","Se le otorga un permiso especial","Se le asciende de grado","Se le exonera de capacitaciones"], answer:"a", explanation:"El incumplimiento de disposiciones complementarias conlleva sanciones disciplinarias."},

{id:95, q:"¿Quién interpreta las disposiciones complementarias en caso de duda?", 
options:["Consejo de Oficiales Generales","Congreso de la República","Escuela Nacional de Bomberos","Policía Nacional del Perú","Dirección de Finanzas"], answer:"a", explanation:"El Consejo de Oficiales Generales interpreta las disposiciones en caso de duda."},

{id:96, q:"¿Cuál de las siguientes NO es una disposición complementaria dentro del reglamento?", 
options:["Normas sobre uso de uniformes","Regulación del tiempo de servicio voluntario","Procedimientos disciplinarios","Normas de tráfico vehicular","Lineamientos de capacitación"], answer:"d", explanation:"Las normas de tráfico vehicular no forman parte de las disposiciones complementarias."},

{id:97, q:"¿Qué objetivo tienen las disposiciones complementarias en relación con la estructura del CGBVP?", 
options:["Ajustar detalles administrativos sin modificar la estructura central","Reemplazar la estructura del Comando Nacional","Establecer nuevos cargos","Disolver la Inspectoría","Definir presupuesto anual"], answer:"a", explanation:"Ajustan detalles administrativos sin alterar la estructura central."},

{id:98, q:"¿Qué sucede si una disposición complementaria entra en conflicto con otra norma del CGBVP?", 
options:["Se prioriza la norma de mayor jerarquía","Se elimina la disposición","Se deja a interpretación del bombero","Se consulta con el Congreso","Se suspenden ambas normas"], answer:"a", explanation:"Siempre prevalece la norma de mayor jerarquía institucional."},

{id:99, q:"¿Qué documento debe consultarse para verificar la validez de una disposición complementaria?", 
options:["Reglamento Interno de Funcionamiento del CGBVP","Constitución del Perú","Código Penal","Plan Anual de Operaciones","Manual de Finanzas"], answer:"a", explanation:"El Reglamento Interno de Funcionamiento del CGBVP es la referencia normativa principal."},

{id:100, q:"¿Cuál de las siguientes afirmaciones es correcta respecto a las disposiciones complementarias?", 
options:["Son de cumplimiento obligatorio dentro del CGBVP","Solo aplican a oficiales","No afectan la estructura operativa","Son sugerencias sin fuerza legal","Pueden ignorarse con autorización del Comandante General"], answer:"a", explanation:"Todas las disposiciones complementarias son de cumplimiento obligatorio."}  

];

/* --------------------
   UTILIDADES (funciones de ayuda)
   -------------------- */

// Mezcla (Fisher-Yates) para obtener orden aleatorio de preguntas
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Escapa un campo para CSV
function csvEscape(value) {
  if (value === null || value === undefined) return '""';
  const s = String(value);
  return '"' + s.replace(/"/g, '""') + '"';
}

/* --------------------
   LÓGICA DE PREGUNTAS
   -------------------- */

let preguntasMostradas = [];
const TOTAL_MUESTRA = 8;

function generarPreguntasAleatorias() {
  const shuffled = shuffleArray(PREGUNTAS_100);
  preguntasMostradas = shuffled.slice(0, TOTAL_MUESTRA).map((p, idx) => {
    return Object.assign({}, p, { displayIndex: idx + 1 });
  });
}

// Renderiza las preguntas
function renderPreguntas() {
  const container = document.getElementById('questions-list');
  if (!container) return;
  container.innerHTML = "";
  preguntasMostradas.forEach((p, idx) => {
    const qid = `q${idx + 1}`;
    const div = document.createElement('div');
    div.className = 'q-card';
    const optsHtml = p.options.map((opt, i) => {
      const val = ['a', 'b', 'c', 'd', 'e'][i];
      return `<label class="opt"><input type="radio" name="${qid}" value="${val}"> ${val}) ${opt}</label>`;
    }).join("");
    div.innerHTML = `
      <div class="q-head">
        <div class="q-title">Pregunta ${idx + 1}</div>
        <div class="muted">ID:${p.id}</div>
      </div>
      <div style="margin-top:6px;">${p.q}</div>
      <div class="options">${optsHtml}</div>
    `;
    container.appendChild(div);
  });
}

function initExam() {
  generarPreguntasAleatorias();
  renderPreguntas();
  const resultadoDiv = document.getElementById('resultado');
  if (resultadoDiv) resultadoDiv.innerHTML = "";
}
initExam();

/* --------------------
   FUNCIONALIDAD PRINCIPAL
   -------------------- */

function obtenerRespuestas() {
  const respuestas = [];
  for (let i = 0; i < TOTAL_MUESTRA; i++) {
    const name = `q${i + 1}`;
    const sel = document.querySelector(`input[name="${name}"]:checked`);
    respuestas.push(sel ? sel.value : "");
  }
  return respuestas;
}

function evaluar(respuestas) {
  let puntaje = 0;
  const detalles = [];

  for (let i = 0; i < TOTAL_MUESTRA; i++) {
    const p = preguntasMostradas[i];
    const selected = respuestas[i] || "";
    const correctLetter = p.answer;
    const correct = selected && selected === correctLetter;
    if (correct) puntaje++;

    detalles.push({
      id: p.id,
      preguntaIndex: i + 1,
      pregunta: p.q,
      selected: selected,
      correct: correct,
      correctLetter: correctLetter,
      explanation: p.explanation,
      opciones: p.options
    });
  }

  return { puntaje, detalles };
}

function construirEncabezadoCSV() {
  const headers = ["FECHA", "APELLIDOS Y NOMBRES", "DNI", "PUNTAJE"];
  for (let i = 1; i <= TOTAL_MUESTRA; i++) {
    headers.push(`Q${i}_ID`, `Q${i}_RESP`, `Q${i}_CORR`);
  }
  return headers.join(",") + "\r\n";
}

function construirFilaCSV(fecha, nombre, dni, resultadoEval) {
  const row = [];
  row.push(csvEscape(fecha));
  row.push(csvEscape(nombre));
  row.push(csvEscape(dni));
  row.push(String(resultadoEval.puntaje));

  resultadoEval.detalles.forEach(d => {
    row.push(csvEscape(d.id));
    row.push(csvEscape(d.selected || ""));
    row.push(csvEscape(d.correct ? "SI" : "NO"));
  });
  return row.join(",") + "\r\n";
}

/* --------------------
   EVENTO: GUARDAR
   -------------------- */
document.getElementById('guardar').addEventListener('click', function () {
  const nombre = (document.getElementById('nombre')?.value || "").trim();
  const dni = (document.getElementById('dni')?.value || "").trim();

  const respuestas = obtenerRespuestas();
  const preguntasSinResponder = respuestas.filter(resp => resp === "").length;
  if (preguntasSinResponder > 0) {
    alert(`Falta seleccionar respuestas. Tiene ${preguntasSinResponder} pregunta(s) sin responder.`);
    return;
  }

  const resultado = evaluar(respuestas);
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  const fecha = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

  // ✅ Mostrar resultados con pregunta incluida
  const resultadoDiv = document.getElementById('resultado');
  let html = `
    <div style="margin-bottom:8px;">
      <strong>Tu puntaje:</strong> ${resultado.puntaje} / ${TOTAL_MUESTRA}
    </div>
    <div style="font-size:13px; color:#374151; margin-bottom:8px;">
      Fecha: ${fecha}
    </div>
    <div>
  `;

  resultado.detalles.forEach((d) => {
    const correctaLetra = d.correctLetter;
    const correctaTexto = d.opciones[['a', 'b', 'c', 'd', 'e'].indexOf(correctaLetra)];
    const selTexto = d.selected
      ? d.opciones[['a', 'b', 'c', 'd', 'e'].indexOf(d.selected)]
      : "<em>No respondió</em>";

    html += `
      <div style="padding:8px; border-radius:8px; margin-bottom:10px; background:#fff; border:1px solid #e5e7eb;">
        <div style="font-weight:700; color:#8b0000;">
          Pregunta ${d.preguntaIndex} (ID ${d.id})
        </div>
        <div style="margin-top:4px; font-weight:600; color:#111;">
          ${d.pregunta}
        </div>
        <div style="margin-top:6px;">
          <strong>Respuesta seleccionada:</strong> ${d.selected || "-"} — ${selTexto}
        </div>
        <div>
          <strong>Respuesta correcta:</strong> ${correctaLetra} — ${correctaTexto}
        </div>
        <div style="margin-top:6px; color:#374151;">
          <em>Explicación:</em> ${d.explanation}
        </div>
        <div style="margin-top:6px; font-weight:700; color:${d.correct ? '#059669' : '#dc2626'};">
          ${d.correct ? '✅ Correcta' : '❌ Incorrecta'}
        </div>
      </div>`;
  });

  html += `</div>`;
  if (resultadoDiv) resultadoDiv.innerHTML = html;

  // Ocultar el examen
  const formSection = document.getElementById('cuestionario');
  if (formSection) formSection.style.display = "none";

  // Enviar a Google Sheets
  const sheetURL = "https://script.google.com/macros/s/AKfycbxiG8S7__jkM3NnACNo8_mdTX-3-DPWiNDpHVxIWm5__4z3oebF15Hlp7Qswajnqi63/exec";
  const payload = {
    fecha: fecha,
    nombre: nombre,
    dni: dni,
    puntaje: resultado.puntaje,
    detalles: resultado.detalles.map(d => ({
      id: d.id,
      selected: d.selected || "",
      correct: d.correct
    }))
  };

  fetch(sheetURL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(() => console.log("✅ Datos completos enviados a Google Sheets correctamente."))
    .catch(err => console.error("⚠️ Error al enviar a Google Sheets:", err));
});

/* --------------------
   EVENTOS ADICIONALES
   -------------------- */

document.getElementById('verPuntuacion').addEventListener('click', function () {
  const respuestas = obtenerRespuestas();
  const resultado = evaluar(respuestas);
  alert(`Tu puntuación actual es: ${resultado.puntaje} / ${TOTAL_MUESTRA}`);
});

document.getElementById('reiniciar').addEventListener('click', function () {
  if (!confirm("¿Generar nuevas preguntas aleatorias? Se perderán las respuestas no guardadas.")) return;
  initExam();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* --------------------
   BLOQUEO DE CLIC DERECHO Y COPIA
   -------------------- */
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("selectstart", e => e.preventDefault());
document.addEventListener("copy", e => e.preventDefault());
