package br.com.ribeiro.service;

import br.com.ribeiro.service.dto.DocumentoDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link br.com.ribeiro.domain.Documento}.
 */
public interface DocumentoService {

    /**
     * Save a documento.
     *
     * @param documentoDTO the entity to save.
     * @return the persisted entity.
     */
    DocumentoDTO save(DocumentoDTO documentoDTO);

    /**
     * Get all the documentos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DocumentoDTO> findAll(Pageable pageable);


    /**
     * Get the "id" documento.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DocumentoDTO> findOne(Long id);

    /**
     * Delete the "id" documento.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

	Page<DocumentoDTO> search(DocumentoDTO query, Pageable pageable);
}
