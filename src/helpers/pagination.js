export function handlePaginatedResponse(response, state, page, itemsPerPage) {
  if (response && response.results !== undefined) {
    state.items.value = response.results
    state.currentPage.value = response.page ?? page
    state.totalPages.value = response.total_pages ?? 1
  } else if (Array.isArray(response)) {
    state.items.value = response
    state.currentPage.value = page
    state.totalPages.value = 1
  } else {
    console.warn('[PaginationHelper] Resposta inesperada:', response)
    state.items.value = []
    state.currentPage.value = 1
    state.totalPages.value = 1
  }
}
