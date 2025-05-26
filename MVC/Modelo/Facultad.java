package org.example;

import java.util.ArrayList;

public class Facultad {
    private String nombre;
    private ArrayList<Asignatura> asignaturas;

    public Facultad() {
        this.asignaturas = new ArrayList<>();
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public ArrayList<Asignatura> getAsignaturas() {
        return asignaturas;
    }

    public void setAsignaturas(ArrayList<Asignatura> asignaturas) {
        this.asignaturas = asignaturas;
    }

    public void agregarAsignatura(String codigo, String grupo, String semestre, String nombre, int creditos) {
        Asignatura asignatura = new Asignatura(codigo, grupo, semestre, nombre, creditos);
        asignaturas.add(asignatura);
        System.out.println("Asignatura agregada exitosamente.");
    }

    public String consultarAsignatura(String codigo, String grupo, String semestre) {
        for (Asignatura asignatura : asignaturas) {
            if (codigo.equalsIgnoreCase(asignatura.getCodigo()) &&
                    grupo.equalsIgnoreCase(asignatura.getGrupo()) &&
                    semestre.equalsIgnoreCase(asignatura.getSemestre())) {

                return "Asignatura encontrada: " + asignatura.getNombre() +
                        " (" + asignatura.getCodigo() + "), Grupo: " + asignatura.getGrupo() +
                        ", Semestre: " + asignatura.getSemestre() +
                        ", Créditos: " + asignatura.getCreditos();
            }
        }
        return "No se encontró la asignatura.";
    }

    public void modificarAsignatura(String codigo, String grupo, String semestre, String nombre, int creditos) {
        for (Asignatura asignatura : asignaturas) {
            if (codigo.equalsIgnoreCase(asignatura.getCodigo()) &&
                    grupo.equalsIgnoreCase(asignatura.getGrupo()) &&
                    semestre.equalsIgnoreCase(asignatura.getSemestre())) {

                asignatura.setNombre(nombre);
                asignatura.setCreditos(creditos);
                System.out.println("Asignatura modificada exitosamente.");
                return;
            }
        }
        System.out.println("No se encontró la asignatura para modificar.");
    }

    public void eliminarAsignatura(String codigo, String grupo, String semestre) {
        boolean removed = asignaturas.removeIf(asignatura ->
                codigo.equalsIgnoreCase(asignatura.getCodigo()) &&
                        grupo.equalsIgnoreCase(asignatura.getGrupo()) &&
                        semestre.equalsIgnoreCase(asignatura.getSemestre()));

        if (removed) {
            System.out.println("Asignatura eliminada exitosamente.");
        } else {
            System.out.println("No se encontró la asignatura para eliminar.");
        }
    }
}

