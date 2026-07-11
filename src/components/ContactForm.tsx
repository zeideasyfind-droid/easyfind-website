import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    requirement: '',
    location: '',
    budget: '',
    details: '',
    formType: '',
  });

  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus('Submitting...');

    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeyRnYIMCl3ouDgMfGkZBK57ccIeIk6e6nlYmoZubRaoLdOsA/formResponse';
    const payload = new URLSearchParams();
    payload.append('entry.647419092', formData.name); // Name
    payload.append('entry.1504466253', formData.phone); // Phone
    payload.append('entry.1645082311', formData.requirement); // Requirement
    payload.append('entry.616237414', formData.location); // Location
    payload.append('entry.1733021043', formData.budget); // Budget
    payload.append('entry.1656301094', formData.details); // Details
    payload.append('entry.128907828', formData.formType); // Form Type

    try {
      const response = await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Forms submission from a different origin
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      });

      // Google Forms typically redirects to a confirmation page or returns an empty response with no-cors
      // We can't directly check response.ok or read response.json() due to 'no-cors'
      // A successful fetch without network errors usually means the submission went through.
      setSubmissionStatus('Form submitted successfully!');
      setFormData({
        name: '',
        phone: '',
        requirement: '',
        location: '',
        budget: '',
        details: '',
        formType: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionStatus('Failed to submit form. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="requirement" className="block text-sm font-medium text-gray-700">Requirement</label>
        <input
          type="text"
          name="requirement"
          id="requirement"
          value={formData.requirement}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
        <input
          type="text"
          name="budget"
          id="budget"
          value={formData.budget}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
        <textarea
          name="details"
          id="details"
          value={formData.details}
          onChange={handleChange}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div>
        <label htmlFor="formType" className="block text-sm font-medium text-gray-700">Form Type</label>
        <input
          type="text"
          name="formType"
          id="formType"
          value={formData.formType}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
      {submissionStatus && <p className="mt-3 text-center text-sm text-gray-600">{submissionStatus}</p>}
    </form>
  );
};

export default ContactForm;
