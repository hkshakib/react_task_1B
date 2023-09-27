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
    <div className="flex basis-[100%] flex-col mt-20">
      <div className="flex justify-between ml-10 mr-10 text-white">
        <span className="text-[40px] font-thin leading-[48px]">
          Today's Leaderboard
        </span>
        <div className="flex justify-evenly items-center bg-[#1D1D1D] w-[418px] h-[56px] rounded-lg">
          <span className="mr-4 font-thin text-[16px]">30 may 2022</span>
          <span>
            <svg
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2" r="2" fill="#696969" />
            </svg>
          </span>
          <button className="ml-4 mr-4 flex bg-[#9BFF00] text-[14px] px-1 py-1 text-black h-[25px] w-[156px] font-thin leading-[16px] justify-center items-center rounded-lg gap-2">
            Submission Open
          </button>
          <span>
            <svg
              width="4"
              height="4"
              viewBox="0 0 4 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2" r="2" fill="#696969" />
            </svg>
          </span>
          <span className="ml-4">11:34</span>
        </div>
      </div>
      <div className="flex flex-col text-[#666666] mt-20">
        <thead className="ml-10 mr-10 mb-4">
          <tr className="flex flex-1 items-center pl-4">
            <th className="flex mr-8 font-thin leading-5">#</th>
            <th className="flex flex-1 ml-2 font-thin leading-5">Title</th>
            <th className="flex flex-1 ml-4 font-thin leading-5">Author</th>
            <th className="flex mr-4 font-thin leading-5">
              Most Liked
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_5778_388)">
                  <path
                    d="M8 10L12 14L16 10"
                    stroke="#696969"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_5778_388">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </th>
          </tr>
        </thead>
        <tbody className="flex flex-col text-[#666666] ml-10 mr-10">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="flex justify-between border border-[#FFFFFF1F] items-center pl-4 mb-4 h-24 rounded-[16px]"
            >
              <td className="flex mr-8">
                {index < 9 ? `0${index + 1}` : index + 1}
              </td>
              <td className="flex flex-1 justify-stretch items-center">
                <img
                  src={video.photo}
                  alt="No Image"
                  className="w-[118px] h-[64px] p-1 rounded-[8px]"
                />
                <span className="flex p-4 text-[18px]">{video.title}</span>
              </td>
              <td className="flex flex-1 items-center">
                <img
                  src={video.photo}
                  alt="No Image"
                  className="w-[24px] h-[24px] p-1 rounded-[40px]"
                />
                {video.username}
              </td>
              <td className="flex mr-12 justify-center items-center">
                {video.like}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_5778_97)">
                    <path
                      d="M10.0085 3.75833V16.25"
                      stroke="#9BFF00"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.01929 8.76167L10.0001 3.74834L14.981 8.76167"
                      stroke="#9BFF00"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_5778_97">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </td>
            </div>
          ))}
        </tbody>
      </div>
      <div className="flex m-4 text-[#666666]">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex mr-8"
        >
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === numPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
