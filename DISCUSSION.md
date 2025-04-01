
I targeted two PRs around mobile responsiveness and React best practices and one PR that implements backend database support with pagination and DB-based filtering and searching, modifying the schemas and table structure. The combined changeset is in PR #3, it includes all changes from 1 and 2.

I was unclear on if I should be merging these PRs, so I have built upon them continually by forking the PR and pointing the merge target to its parent. They are labeled #1 - #3 for the ordering, but I have attempted to split them up into distinct concepts that would be mergeable on their own, minus a few merge conflicts reverting back and pointing to main. I did this as to a way to keep some changes persistent like advocate typings, and reduce duplicated style code or abstractions.



# Additional Improvements
In addition to my existing changes, with additional time I would expand on the following:
- Add a loading spinner when fetching data and a fallback message when no data is available. I would lean towards an infinite scrolling list with the search bar pinned to the top when scrolling down.
- While backend pagination support was added, the frontend implementation of pagination is still needed. Since the backend supports lastId as a parameter, the frontend would simply need to pass the lastId from the result set. The backend could also be adjusted to pass the nextId value directly for the frontend clients. 
- Add support for complex filtering rather than a singular search field. Since the backend now stores Specialties in different table, these could be loaded in the frontend as a dropdown selection with an ID. This would also improve on the existing backend filtering PR by reducing the payload size and improving DB performance by passing specialty IDs instead of full strings. 
- Implement a 'distance from' filter by storing the latitude and longitude of the advocate city and utilizing a third party API to calculate the distance from the users current location.
- Implement API tests for validating pagination is exhaustive and respects filtering for all relevant fields
- Validate DB performance and add indexes to relevant searchable fields
