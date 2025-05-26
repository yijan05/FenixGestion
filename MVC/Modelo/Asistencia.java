package org.example;

import java.util.ArrayList;

public class Asistencia {
    private String fecha;
    private String horaInicio;
    private String horaFinal;
    private ArrayList<String> codigos;
    private ArrayList<String> estados;

    public Asistencia(String fecha, String horaInicio, String horaFinal) {
        this.fecha = fecha;
        this.horaInicio = horaInicio;
        this.horaFinal = horaFinal;
        this.codigos = new ArrayList<>();
        this.estados = new ArrayList<>();
    }

    // Getters y Setters
    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFinal() {
        return horaFinal;
    }

    public void setHoraFinal(String horaFinal) {
        this.horaFinal = horaFinal;
    }

    public ArrayList<String> getCodigos() {
        return codigos;
    }

    public void setCodigos(ArrayList<String> codigos) {
        this.codigos = codigos;
    }

    public ArrayList<String> getEstados() {
        return estados;
    }

    public void setEstados(ArrayList<String> estados) {
        this.estados = estados;
    }

    /**
     * Adiciona la asistencia de un estudiante.
     *
     * @param codigo número de documento del estudiante
     * @param estado "0" = a tiempo, "1" = tarde, "2" = no llegó
     * @return true si se registró correctamente
     */
    public boolean adicionarAsistencia(String codigo, String estado) {
        codigos.add(codigo);
        estados.add(estado);
        return true;
    }

    /**
     * Retorna un resumen de asistencia por estudiante.
     *
     * @return Lista de cadenas con formato "Documento - Estado"
     */
    public ArrayList<String> obtenerResumenAsistencia() {
        ArrayList<String> resumen = new ArrayList<>();
        for (int i = 0; i < codigos.size(); i++) {
            resumen.add("Estudiante: " + codigos.get(i) + ", Estado: " + estadoComoTexto(estados.get(i)));
        }
        return resumen;
    }

    // Método auxiliar para traducir estado a texto
    private String estadoComoTexto(String estado) {
        switch (estado) {
            case "0": return "Asistió a tiempo";
            case "1": return "Llegó tarde";
            case "2": return "No asistió";
            default: return "Estado desconocido";
        }
    }
}
