package org.example;

import java.util.ArrayList;

public class Asignatura {
    private String codigo;
    private String grupo;
    private String semestre;
    private String nombre;
    private int creditos;
    private ArrayList<Estudiante> estudiantes;  // Lista para almacenar estudiantes registrados

    // Constructor vacío
    public Asignatura() {
        estudiantes = new ArrayList<>();
    }

    // Constructor completo
    public Asignatura(String codigo, String grupo, String semestre, String nombre, int creditos) {
        this.codigo = codigo;
        this.grupo = grupo;
        this.semestre = semestre;
        this.nombre = nombre;
        this.creditos = creditos;
        this.estudiantes = new ArrayList<>();
    }

    // Getters
    public String getCodigo() {
        return codigo;
    }

    public String getGrupo() {
        return grupo;
    }

    public String getSemestre() {
        return semestre;
    }

    public String getNombre() {
        return nombre;
    }

    public int getCreditos() {
        return creditos;
    }

    // Setters
    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }

    public void setSemestre(String semestre) {
        this.semestre = semestre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setCreditos(int creditos) {
        this.creditos = creditos;
    }

    // Método para agregar un estudiante a la asignatura
    public void agregarEstudiante(Estudiante estudiante) {
        estudiantes.add(estudiante);
    }

    // Método para obtener los estudiantes de la asignatura
    public ArrayList<Estudiante> getEstudiantes() {
        return estudiantes;
    }

    // toString para mostrar la asignatura en texto
    @Override
    public String toString() {
        return "ASIGNATURA - Código: " + codigo +
                ", Grupo: " + grupo +
                ", Semestre: " + semestre +
                ", Nombre: " + nombre +
                ", Créditos: " + creditos;
    }
}
