package br.com.ribeiro.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import br.com.ribeiro.service.DocumentoService;
import br.com.ribeiro.service.dto.DocumentoDTO;
import br.com.ribeiro.web.rest.errors.BadRequestAlertException;
import br.com.ribeiro.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.micrometer.core.annotation.Timed;

/**
 * REST controller for managing {@link br.com.ribeiro.domain.Documento}.
 */
@RestController
@RequestMapping("/api")
public class DocumentoResource {

	private final Logger log = LoggerFactory.getLogger(DocumentoResource.class);

	private static final String ENTITY_NAME = "documento";

	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	private final DocumentoService documentoService;

	public DocumentoResource(DocumentoService documentoService) {
		this.documentoService = documentoService;
	}

	/**
	 * {@code POST  /documentos} : Create a new documento.
	 *
	 * @param documentoDTO the documentoDTO to create.
	 * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
	 *         body the new documentoDTO, or with status {@code 400 (Bad Request)}
	 *         if the documento has already an ID.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PostMapping("/documentos")
	public ResponseEntity<DocumentoDTO> createDocumento(@Valid @RequestBody DocumentoDTO documentoDTO)
			throws URISyntaxException {
		log.debug("REST request to save Documento : {}", documentoDTO);
		if (documentoDTO.getId() != null) {
			throw new BadRequestAlertException("A new documento cannot already have an ID", ENTITY_NAME, "idexists");
		}
		DocumentoDTO result = documentoService.save(documentoDTO);
		return ResponseEntity
				.created(new URI("/api/documentos/" + result.getId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * {@code PUT  /documentos} : Updates an existing documento.
	 *
	 * @param documentoDTO the documentoDTO to update.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the updated documentoDTO, or with status {@code 400 (Bad Request)} if
	 *         the documentoDTO is not valid, or with status
	 *         {@code 500 (Internal Server Error)} if the documentoDTO couldn't be
	 *         updated.
	 * @throws URISyntaxException if the Location URI syntax is incorrect.
	 */
	@PutMapping("/documentos")
	public ResponseEntity<DocumentoDTO> updateDocumento(@Valid @RequestBody DocumentoDTO documentoDTO)
			throws URISyntaxException {
		log.debug("REST request to update Documento : {}", documentoDTO);
		if (documentoDTO.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		DocumentoDTO result = documentoService.save(documentoDTO);
		return ResponseEntity.ok().headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME,
				documentoDTO.getId().toString())).body(result);
	}

	/**
	 * {@code GET  /documentos} : get all the documentos.
	 *
	 * @param pageable    the pagination information.
	 * @param queryParams a {@link MultiValueMap} query parameters.
	 * @param uriBuilder  a {@link UriComponentsBuilder} URI builder.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
	 *         of documentos in body.
	 */
	@GetMapping("/documentos")
	public ResponseEntity<List<DocumentoDTO>> getAllDocumentos(Pageable pageable,
			@RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder) {
		log.debug("REST request to get a page of Documentos");
		Page<DocumentoDTO> page = documentoService.findAll(pageable);
		HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "api/documentos");
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

	/**
	 * {@code GET  /documentos/:id} : get the "id" documento.
	 *
	 * @param id the id of the documentoDTO to retrieve.
	 * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
	 *         the documentoDTO, or with status {@code 404 (Not Found)}.
	 */
	@GetMapping("/documentos/{id}")
	public ResponseEntity<DocumentoDTO> getDocumento(@PathVariable Long id) {
		log.debug("REST request to get Documento : {}", id);
		Optional<DocumentoDTO> documentoDTO = documentoService.findOne(id);
		return ResponseUtil.wrapOrNotFound(documentoDTO);
	}

	/**
	 * {@code DELETE  /documentos/:id} : delete the "id" documento.
	 *
	 * @param id the id of the documentoDTO to delete.
	 * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	 */
	@DeleteMapping("/documentos/{id}")
	public ResponseEntity<Void> deleteDocumento(@PathVariable Long id) {
		log.debug("REST request to delete Documento : {}", id);
		documentoService.delete(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
				.build();
	}

	/**
	 * SEARCH /_search/documentos
	 *
	 * @param filter   the DocumentoDTO filter information
	 * @param pageable the pagination information
	 * @return the ResponseEntity with status 200 (OK) and the list of DocumentoDTO
	 *         in body
	 */
	@GetMapping("/_search/documentos")
	@Timed
	public ResponseEntity<List<DocumentoDTO>> searchByFilter(DocumentoDTO filter,
			@SortDefault.SortDefaults({ @SortDefault(sort = "descricao") }) Pageable pageable) {
		log.debug("REST request to get a page of DocumentoDTO by filter : {}", filter);
		Page<DocumentoDTO> page = documentoService.search(filter, pageable);
		HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(filter, page,
				"/api/_search/documentos");
		return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
	}
}
