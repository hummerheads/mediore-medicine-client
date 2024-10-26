import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid';

const Contact = () => {
  return (
    <div className="md:mb-20">
      <div className="md:pb-10 pb-4">
        <h1 className="text-[#28A745] uppercase text-center md:text-5xl font-bold">Contact Us</h1>
        <p className="text-center text-gray-700 font-medium text-xs md:text-lg">
          Any question or remarks? Just write us a message!
        </p>
      </div>
      <div className="flex flex-col lg:flex-row max-w-7xl md:mx-auto bg-gray-50 rounded-lg mx-2 shadow-2xl">
        <div className="flex-2 bg-[#28A745] text-white p-4 md:p-10 rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg md:pt-56">
          <h2 className="md:text-3xl font-bold mb-4">Contact Information</h2>
          <p className="mb-6">Say something to start a live chat!</p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <PhoneIcon className="w-6 h-6 mr-3" /> +1012 3456 789
            </li>
            <li className="flex items-center">
              <EnvelopeIcon className="w-6 h-6 mr-3" /> demo@gmail.com
            </li>
            <li className="flex items-center">
              <MapPinIcon className="w-6 h-6 mr-3" /> 132 Dartmouth Street, Boston, MA 02156
            </li>
          </ul>
          <div className="flex space-x-4 mt-6">
            <i className="fab fa-instagram cursor-pointer"></i>
            <i className="fab fa-discord cursor-pointer"></i>
          </div>
        </div>
        <div className="flex-1 p-2 md:p-10 bg-white rounded-b-lg lg:rounded-l-none lg:rounded-r-lg ">
          <form className="space-y-2 md:space-y-6 mt-4">
            <div className="flex space-x-4">
              <div className="md:w-1/2">
                <label className="block mb-2 font-medium">First Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="John"
                />
              </div>
              <div className="w-1/2">
                <label className="block mb-2 font-medium">Last Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Phone Number</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="+1 012 3456 789"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Select Subject?</label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subject"
                    defaultChecked
                    className="text-black focus:ring-2 focus:ring-black"
                  />
                  <span>General Inquiry</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subject"
                    className="text-black focus:ring-2 focus:ring-black"
                  />
                  <span>Support</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="subject"
                    className="text-black focus:ring-2 focus:ring-black"
                  />
                  <span>Feedback</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block mb-2 font-medium">Message</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black h-32 resize-none"
                placeholder="Write your message.."
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
