import React from 'react'

const About = () => {
  return (
    <>
    <section className="bg-gray-50 py-12 mt-12">
      {/* Header Section */}
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">About Us</h2>
        <p className="text-gray-600 text-lg">
          We are committed to providing the best services to our clients. Here's more about who we are and what we do.
        </p>
      </div>

      {/* Company Info Section */}
      <div className="container mx-auto mt-12 px-6 grid gap-8 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h3>
          <p className="text-gray-600">
            Our mission is to deliver innovative solutions with a strong commitment to quality, efficiency, and customer satisfaction.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h3>
          <p className="text-gray-600">
            We envision a world where businesses thrive using technology that simplifies complex challenges, empowering them to focus on growth.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto mt-16 px-6 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-8">Meet Our Team</h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Team Member 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              className="w-32 h-32 mx-auto rounded-full mb-4"
              src="https://via.placeholder.com/150"
              alt="Team Member"
            />
            <h4 className="text-xl font-medium text-gray-800">Jane Doe</h4>
            <p className="text-gray-600">CEO & Founder</p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              className="w-32 h-32 mx-auto rounded-full mb-4"
              src="https://via.placeholder.com/150"
              alt="Team Member"
            />
            <h4 className="text-xl font-medium text-gray-800">John Smith</h4>
            <p className="text-gray-600">Chief Technical Officer</p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              className="w-32 h-32 mx-auto rounded-full mb-4"
              src="https://via.placeholder.com/150"
              alt="Team Member"
            />
            <h4 className="text-xl font-medium text-gray-800">Emily Davis</h4>
            <p className="text-gray-600">Marketing Director</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="container mx-auto mt-16 px-6">
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <h4 className="text-xl font-semibold text-gray-800">Want to work with us?</h4>
          <p className="text-gray-600 mt-3">
            Contact us today to learn more about how we can help your business thrive.
          </p>
          <button className="mt-6 px-6 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700">
            Contact Us
          </button>
        </div>
      </div>
    </section>
    </>
  )
}

export default About