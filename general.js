// Get books by author using Axios and async/await
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    // Fetch all books from the local API endpoint
    const response = await axios.get(BOOKS_API);

    // Filter books by the requested author
    const filteredBooks = Object.values(response.data).filter(book => book.author === author);

    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks); // Return filtered books
    } else {
      return res.status(404).json({ message: "No books found for this author" });
    }
  } catch (error) {
    // Handle any errors during the Axios request
    return res.status(500).json({ message: "Error fetching books by author", error: error.message });
  }
});
