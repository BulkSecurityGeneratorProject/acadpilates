package br.com.ribeiro.service;

import br.com.ribeiro.service.dto.PessoaDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link br.com.ribeiro.domain.Pessoa}.
 */
public interface PessoaService {

    /**
     * Save a pessoa.
     *
     * @param pessoaDTO the entity to save.
     * @return the persisted entity.
     */
    PessoaDTO save(PessoaDTO pessoaDTO);

    /**
     * Get all the pessoas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PessoaDTO> findAll(Pageable pageable);


    /**
     * Get the "id" pessoa.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PessoaDTO> findOne(Long id);

    /**
     * Delete the "id" pessoa.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

	/**
	 * Search
	 * 
	 * @param searchDTO search
	 * @param pageable  pagination
	 * @return list of PessoaDTO
	 */
    Page<PessoaDTO> search(PessoaDTO dto, Pageable pageable);
    
    Page<PessoaDTO> autocomplete(PessoaDTO dto, Pageable pageable);

}
