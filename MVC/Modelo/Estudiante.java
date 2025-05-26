package org.example;
import java.util.Objects;
public class Estudiante {
    private String tipoDocumento;
    private String documentoIdentidad;
    private String nombre;
    private String apellido;
    private String programaAcademico;
    private String semestre;

    // Constructor completo
    public Estudiante(String tipoDocumento, String documentoIdentidad,
                      String nombre, String apellido,
                      String programaAcademico, String semestre) {
        this.tipoDocumento = tipoDocumento;
        this.documentoIdentidad = documentoIdentidad;
        this.nombre = nombre;
        this.apellido = apellido;
        this.programaAcademico = programaAcademico;
        this.semestre = semestre;
    }

    // Getters
    public String getTipoDocumento() {
        return tipoDocumento;
    }

    public String getDocumentoIdentidad() {
        return documentoIdentidad;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getProgramaAcademico() {
        return programaAcademico;
    }

    public String getSemestre() {
        return semestre;
    }

    // Setters
    public void setTipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public void setDocumentoIdentidad(String documentoIdentidad) {
        this.documentoIdentidad = documentoIdentidad;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public void setProgramaAcademico(String programaAcademico) {
        this.programaAcademico = programaAcademico;
    }

    public void setSemestre(String semestre) {
        this.semestre = semestre;
    }

    // Código único para identificar al estudiante
    public String getCodigoUnico() {
        return tipoDocumento + "-" + documentoIdentidad;
    }

    @Override
    public String toString() {
        return nombre + " " + apellido + " (" + getCodigoUnico() + ")";
    }

    // Comparación basada en tipo y documento
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (!(obj instanceof Estudiante)) return false;
        Estudiante otro = (Estudiante) obj;
        return tipoDocumento.equalsIgnoreCase(otro.tipoDocumento) &&
                documentoIdentidad.equalsIgnoreCase(otro.documentoIdentidad);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tipoDocumento.toLowerCase(), documentoIdentidad.toLowerCase());
    }
}
