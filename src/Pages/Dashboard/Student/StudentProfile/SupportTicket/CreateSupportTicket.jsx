import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../../../../providers/AuthProvider";
import SupportTicketDetails from "./SupportTicketDetails";
import supportImg from "../../../../../assets/iconForDashboard/support.png";
import closeSupport from "../../../../../assets/iconForDashboard/closeSupport.png";

const CreateSupportTicket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  const [supportTickets, setSupportTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const supportTicketDetailsRef = useRef(null);
  useEffect(() => {
    fetchAllSupportTickets();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubject("");
    setMessage("");
  };

  const fetchAllSupportTickets = () => {
    fetch(
      `https://cm-academy-test-server-production.up.railway.app/api/support-tickets/${user?.email}/${user?.fullName}`
    )
      .then((response) => response.json())
      .then((data) => {
        setSupportTickets(data);
      })
      .catch((error) => {
        console.error("Error fetching support tickets:", error);
      });
  };

  const handleSubmit = () => {
    if (subject.trim() === "" || message.trim() === "") {
      alert("Subject and message cannot be empty");
      return;
    }

    const newTicket = {
      studentName: user?.fullName,
      studentEmail: user?.email,
      sender: "student",
      timestamp: new Date().toLocaleString(),
      subject,
      message,
    };

    fetch(
      "https://cm-academy-test-server-production.up.railway.app/api/support-tickets",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTicket),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        fetchAllSupportTickets();
        closeModal();
      })
      .catch((error) => {
        console.error("Error creating support ticket:", error);
      });
  };

  const handleViewTicket = async (ticketNumber) => {
    setSelectedTicket(ticketNumber);
    // Scroll to the SupportTicketDetails section when viewing a ticket
    if (supportTicketDetailsRef.current) {
      window.scrollTo({
        top: supportTicketDetailsRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleCloseTicket = async (ticketNumber) => {
    // Close the ticket and update its status
    try {
      const response = await fetch(
        `http://localhost:5000/api/support-tickets/${ticketNumber}/close`,
        {
          method: "PUT",
        }
      );

      if (response.status === 200) {
        // Ticket closed successfully, update its status immediately
        const updatedTickets = supportTickets.map((ticket) =>
          ticket.TicketNumber === ticketNumber
            ? { ...ticket, status: "closed" }
            : ticket
        );
        setSupportTickets(updatedTickets);
      }
    } catch (error) {
      console.error("Error closing support ticket:", error);
    }
  };
  // Close the ticket and update its status

  return (
    <div className="px-4">
      <div className=" mobile: tablet:flex justify-around max-w-7xl mx-auto  pt-5 pb-1 gap-3  mb-6  bg-white">
        <div className="">
          <h1 className=" text-4xl font-bold text-gray-700 font-TitilliumWeb ">
            Empower Learning: Design Your Course
          </h1>
          <p className="mt-4 mobile:text-[14px] laptop:text-[14px] tablet:text-[14px] desktop:text-[18px] text-gray-600 font-TitilliumWeb">
            Your knowledge can change lives. Begin your teaching journey by
            creating a course that reflects your expertise. The 'Create Course'
            page is where you lay the foundation. Define your course's title and
            description, and let your passion for teaching shine through.
          </p>
        </div>
        <img className="h-32 mobile:hidden" src={supportImg} alt="" />
      </div>

      <button
        className="bg-gray-700 text-white font-bold py-2 px-4 rounded font-Lexend"
        onClick={openModal}
      >
        Create a new support ticket +
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay"></div>
          <div className="modal-container p-4 md:p-8">
            <div className="bg-white rounded shadow-lg p-4">
              <h2 className="text-xl font-semibold mb-4">
                Create a new support ticket
              </h2>
              <div className="mb-4">
                <label htmlFor="subject" className="block mb-2">
                  Subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full border border-gray-300 rounded py-2 px-3"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block mb-2">
                  Message:
                </label>
                <textarea
                  id="message"
                  className="w-full border border-gray-300 rounded py-2 px-3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-600 font-bold py-2 px-4 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className=" mt-14">
        <h2 className="text-2xl font-semibold mt-4 mb-2 font-Lexend">
          Your All Support Ticket
        </h2>

        <div className="grid tablet:grid-cols-2 gap-4">
          {supportTickets.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-lg shadow-md p-4 mb-4 border-8"
            >
              <div>
                <div className="mobile:min-w-[300px]">
                  <h3 className="text-2xl font-bold text-gray-700 font-LeagueSpartan text-left mb-3 truncate">
                    {ticket.Subject}
                  </h3>
                </div>
                <p className="text-gray-500 text-sm font-LeagueSpartan mb-4">
                  {" "}
                  Created on: {ticket.Date}
                </p>
                <div className="flex items-center text-sm justify-between ">
                  <p className="text-gray-500 text-sm font-LeagueSpartan">
                    TN : {ticket.TicketNumber}
                  </p>
                  <p
                    className={` ${
                      ticket.status === "pending"
                        ? "text-[#61ba86] bg-[#e6fff2] border-green-300"
                        : "text-[#f44336] bg-[#ffebee]"
                    }  px-2 relative border rounded-[3px] `}
                  >
                    {ticket.status === "pending" ? (
                      <span className="absolute -right-[4px] -top-[5px]">
                        <span className="relative flex h-3 w-3 ">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#047734] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#61ba86]"></span>
                        </span>
                      </span>
                    ) : (
                      ""
                    )}

                    {ticket.status === "pending" ? "Active" : "Closed"}
                  </p>
                </div>

                <hr className="mt-5" />
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleViewTicket(ticket.TicketNumber)}
                    className="text-gray-700 border hover:bg-[#58ec9631] font-bold py-1 px-2 font-mono text-sm rounded mt-4"
                  >
                    View Ticket
                  </button>

                  {ticket.status === "pending" ? (
                    <button
                      onClick={() => handleCloseTicket(ticket.TicketNumber)}
                      className="text-gray-700 border flex gap-1  items-center hover:bg-[#58ec9631] font-bold py-1 px-2 font-mono text-sm rounded mt-4"
                    >
                      Close Ticket
                      <img className="h-4" src={closeSupport} alt="" />
                    </button>
                  ) : (
                    <p className=" font-mono text-sm text-[#f44336]">
                      Ticket Closed!
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedTicket && (
        <div className="scroll-container" ref={supportTicketDetailsRef}>
          <SupportTicketDetails
            ticketNumber={selectedTicket}
            onClose={() => {
              setSelectedTicket(null);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CreateSupportTicket;
