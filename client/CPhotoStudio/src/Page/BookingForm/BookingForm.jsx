import React, { useState, useEffect } from "react";
import backgroundImage from "../../assets/image/bg-img/2.jpg"; // Correct image path

const BookingForm = () => {
  const [photographers, setPhotographers] = useState([]);
  const [selectedPhotographer, setSelectedPhotographer] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [bookingDetails, setBookingDetails] = useState({
    client_name: "",
    client_email: "",
    booking_date: "",
    start_time: "",
    end_time: "",
  });
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5555/photographers")
      .then((response) => response.json())
      .then((data) => setPhotographers(data))
      .catch((error) => console.error("Error fetching photographers:", error));
  }, []);

  const fetchAvailableSlots = () => {
    fetch(
      `http://localhost:5555/available-slots?photographer_id=${selectedPhotographer}&date=${bookingDetails.booking_date}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAvailableSlots(data);
        if (data.length > 0) {
          setAvailabilityMessage("Photographer is available");
        } else {
          setAvailabilityMessage("Photographer is not available");
        }
      })
      .catch((error) => {
        console.error("Error fetching available slots:", error);
        setAvailabilityMessage("Error fetching availability");
      });
  };

  const handleBooking = () => {
    console.log("Booking details:", {
      ...bookingDetails,
      photographer_id: selectedPhotographer,
    });

    // Add debugging logs
    console.log("Sending booking request to server...");

    fetch("http://localhost:5555/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...bookingDetails,
        photographer_id: selectedPhotographer,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            console.error("Booking failed:", text);
            throw new Error("Booking failed");
          });
        }
        setSuccessMessage("Booking confirmed! Check your email for details.");
        console.log("Booking confirmed");
      })
      .catch((error) => {
        console.error("Error making booking:", error);
        alert("Booking failed: " + error.message); // Show detailed error message
      });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (validateEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email address");
    }
    setBookingDetails({ ...bookingDetails, client_email: email });
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="py-auto pt-auto flex justify-center items-center h-full">
          <div className="max-w-2xl w-11/12 mx-auto mt-10 p-4 bg-white rounded-lg shadow-md relative border-4 border-customGreen">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 border-b-4 border-customGreen pb-3">
              Book a Session
            </h2>
            <label className="block mb-2">
              <span className="text-gray-700">Photographer:</span>
              <select
                onChange={(e) => setSelectedPhotographer(e.target.value)}
                value={selectedPhotographer}
                className="block w-full mt-1 p-2 border rounded-md bg-gray-300 text-black"
              >
                <option value="" disabled>
                  Select a photographer
                </option>
                {photographers.map((photographer) => (
                  <option
                    key={photographer.photographer_id}
                    value={photographer.photographer_id}
                  >
                    {photographer.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block mb-2">
              Date:
              <input
                type="date"
                value={bookingDetails.booking_date}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    booking_date: e.target.value,
                  })
                }
                className="block w-full mt-1 p-2 border rounded-md bg-gray-200 text-black"
              />
            </label>
            <button
              onClick={fetchAvailableSlots}
              className="w-full bg-blue-500 text-white p-2 rounded-md mt-2 hover:bg-blue-600"
            >
              Check Availability
            </button>

            {availabilityMessage && (
              <div className="mt-4 text-lg font-bold border-4 border-customOrange bg-white text-black p-2 rounded-md">
                {availabilityMessage}
              </div>
            )}

            {availableSlots.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xl font-bold mb-2">Available Slots</h3>
                <select
                  onChange={(e) => {
                    const [start_time, end_time] = e.target.value.split("-");
                    setBookingDetails({
                      ...bookingDetails,
                      start_time,
                      end_time,
                    });
                  }}
                  className="block w-full mt-1 p-2 border rounded-md bg-gray-200 text-black"
                >
                  <option value="" disabled>
                    Select a time slot
                  </option>
                  {availableSlots.map((slot, index) => (
                    <option
                      key={index}
                      value={`${slot.start_time}-${slot.end_time}`}
                    >
                      {`${slot.start_time} - ${slot.end_time}`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <label className="block mb-2">
              <span className="text-gray-700">Name:</span>
              <input
                type="text"
                value={bookingDetails.client_name}
                onChange={(e) =>
                  setBookingDetails({
                    ...bookingDetails,
                    client_name: e.target.value,
                  })
                }
                className="block w-full mt-1 p-2 border rounded-md bg-gray-200 text-black"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Email:</span>
              <input
                type="email"
                value={bookingDetails.client_email}
                onChange={handleEmailChange}
                className="block w-full mt-1 p-2 border rounded-md bg-gray-200 text-black"
              />
              {emailError && (
                <span className="text-red-500 text-sm mt-1">{emailError}</span>
              )}
            </label>
            <button
              onClick={handleBooking}
              className="w-full bg-green-500 text-white p-2 rounded-md mt-4 hover:bg-green-600"
              disabled={!!emailError}
            >
              Book Now
            </button>
            {successMessage && (
              <div className="mt-4 text-lg font-bold border-4 border-customGreen bg-white text-black p-2 rounded-md">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
