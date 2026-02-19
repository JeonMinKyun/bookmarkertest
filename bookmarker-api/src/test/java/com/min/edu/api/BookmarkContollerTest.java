package com.min.edu.api;

import static org.hamcrest.CoreMatchers.is;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.min.edu.domain.Bookmark;
import com.min.edu.repository.BookmarkRepository;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@TestPropertySource(properties = { "spring.datasource.url=jdbc:tc:postgresql:14-alpine:///demo" })
class BookmarkContollerTest {

	@Autowired
	private MockMvc mvc;

	@Autowired
	private BookmarkRepository bookmarkRepository;

	@BeforeEach
	void setUp() {
		bookmarkRepository.deleteAllInBatch();

		List bookmarks = new ArrayList<>();
		bookmarks.add(new Bookmark(null, "devopsbookmark", "https://www.devopsbookmark.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "techblog", "https://www.techblog.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "codingresource", "https://www.codingresource.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "programminghub", "https://www.programminghub.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "javaguide", "https://www.javaguide.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "webdevtips", "https://www.webdevtips.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "cloudcomputing", "https://www.cloudcomputing.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "datasciencetools", "https://www.datasciencetools.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "aiinsights", "https://www.aiinsights.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "devtools", "https://www.devtools.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "machinelearning", "https://www.machinelearning.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "opensource", "https://www.opensource.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "cybersecurity", "https://www.cybersecurity.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "frontendfocus", "https://www.frontendfocus.com", Instant.now()));
		bookmarks.add(new Bookmark(null, "backendbasics", "https://www.backendbasics.com", Instant.now()));
		bookmarkRepository.saveAll(bookmarks);
	}

	@ParameterizedTest
	@CsvSource({ "1,15,2,1,true,false,true,false", "2,15,2,2,false,true,false,true" })
	void shouldBookmarks(int pageNo, int totalElements, int totalPages, int currentPage, boolean isFirst,
			boolean isLast, boolean hasNext, boolean hasPrevious) throws Exception {
		mvc.perform(MockMvcRequestBuilders.get("/api/bookmarks?page=" + pageNo)).andExpect(status().isOk())
				.andExpect(jsonPath("$.totalElements", CoreMatchers.equalTo(totalElements)))
				.andExpect(jsonPath("$.totalPages", CoreMatchers.equalTo(totalPages)))
				.andExpect(jsonPath("$.currentPage", CoreMatchers.equalTo(currentPage)))
				.andExpect(jsonPath("$.isFirst", CoreMatchers.equalTo(isFirst)))
				.andExpect(jsonPath("$.isLast", CoreMatchers.equalTo(isLast)))
				.andExpect(jsonPath("$.hasNext", CoreMatchers.equalTo(hasNext)))
				.andExpect(jsonPath("$.hasPrevious", CoreMatchers.equalTo(hasPrevious)));

	}
	
	@Test
	public void shouldCreateBookmarkSuccessfully() throws Exception {
		MvcResult result =this.mvc.perform(
				MockMvcRequestBuilders.post("/api/bookmarks")
		        		.contentType(org.springframework.http.MediaType.APPLICATION_JSON)
		                .content("""
				                {
			                    "title": "SivaLabs Blog"
			                }
			                """)
		    )
		    .andExpect(status().is4xxClientError())
		    .andExpect(jsonPath("$.status", is(400))) // is는 정적임포트가 되어 있어야 한다. 아닌경우는 hancrest의 CoreMatchers.is()
		    .andExpect(jsonPath("$.field", is("url")))
		    .andExpect(jsonPath("$.message", is("URL은 필수 입력 값입니다")))
		    .andReturn();
		
		String contentType = result.getResponse().getContentType();
		System.out.println("Content Type: " + contentType);
		String responseBody = result.getResponse().getContentAsString();
		System.out.println("Response JSON: " + responseBody);
	}

}
