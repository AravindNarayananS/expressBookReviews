// Get books by author
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author; // get author from request
  try {
    const response = await axios.get(BOOKS_API); // fetch all books
    // Properly filter books by author
    const filteredBooks = Object.values(response.data).filter(
      book => book.author.toLowerCase() === author.toLowerCase()
    );

    if (filteredBooks.length > 0) {
      return res.status(200).json(filteredBooks); // Return matching books
    } else {
      // Handle case when no books match
      return res.status(404).json({ message: `No books found for author: ${author}` });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching books by author",
      error: error.message
    });
  }
});
