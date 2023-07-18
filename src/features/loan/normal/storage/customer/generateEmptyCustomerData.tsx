export const generateEmptyCustomerState = () => ({
  discussions: [], 
  query: {
    page: 1,
    size: 10,
    sort: "created_at(desc)"
  },
  fetched: false,
  fetching: false,
})