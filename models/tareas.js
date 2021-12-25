const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => this._listado[tarea.id] = tarea);
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, index) => {

            const idx = `${index + 1}`.green
            const { desc, completadoEn } = tarea;

            const estado = completadoEn
                ? 'Completada'.green
                : 'Pendiente'.red

            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        let cont = 0;
        this.listadoArr.forEach(tarea => {
            if (completadas && tarea.completadoEn) {
                cont++;
                console.log(`${(cont + '.').green} ${tarea.desc} :: ${tarea.completadoEn.green}`);
            } else if (!completadas && !tarea.completadoEn) {
                cont++;
                console.log(`${(cont + '.').green} ${tarea.desc} :: ${'Pendiente'.red}`)
            }
        });
    }


    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}


module.exports = Tareas;