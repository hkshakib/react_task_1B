import React, { useState, useEffect } from "react";

const DashBoard = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const fetchVideos = async (page) => {
    try {
      const response = await fetch(
        "https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-project":
              "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            payload: {},
            page,
            limit: 10,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error fetching videos");
      }

      setVideos(data.list);
      setNumPages(data.num_pages);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h1>Today's Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Most Liked</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr key={video.id}>
              <td>{index + 1}</td>
              <td>{video.title}</td>
              <td>{video.username}</td>
              <td>{video.like}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={handleNextPage} disabled={currentPage === numPages}>
        Next
      </button>
    </div>
  );
};

export default DashBoard;
