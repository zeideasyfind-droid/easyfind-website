import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NAVY, GOLD } from "@/routes/index";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    requirement: "",
    location: "",
    budget: "",
    details: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStatus("Submitting...");

    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSeyRnYIMCl3ouDgMfGkZBK57ccIeIk6e6nlYmoZubRaoLdOsA/formResponse";
    const payload = new URLSearchParams();
    payload.append("entry.647419092", formData.name);
    payload.append("entry.1504466253", formData.phone);
    payload.append("entry.1645082311", formData.requirement);
    payload.append("entry.616237414", formData.location);
    payload.append("entry.1733021043", formData.budget);
    payload.append("entry.1656301094", formData.details);
    payload.append("entry.128907828", "Website Hero Form");

    try {
      await fetch(formUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      });
      setSubmissionStatus("Form submitted successfully!");
      setFormData({
        name: "",
        phone: "",
        requirement: "",
        location: "",
        budget: "",
        details: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("Failed to submit form. Please try again.");
    }
  };

  const labelClass = "block text-sm font-semibold mb-1.5";
  const inputClass =
    "w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-white p-6 shadow-xl">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <Input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your full name"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone
        </label>
        <Input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          placeholder="+91 XXXXX XXXXX"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="requirement" className={labelClass}>
          Requirement
        </label>
        <Input
          type="text"
          name="requirement"
          id="requirement"
          value={formData.requirement}
          onChange={handleChange}
          required
          placeholder="e.g. 2BHK rental in Koramangala"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="location" className={labelClass}>
          Location
        </label>
        <Input
          type="text"
          name="location"
          id="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Koramangala, HSR Layout"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="budget" className={labelClass}>
          Budget
        </label>
        <Input
          type="text"
          name="budget"
          id="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="e.g. ₹30,000/month or ₹80 Lakhs"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="details" className={labelClass}>
          Details
        </label>
        <Textarea
          name="details"
          id="details"
          value={formData.details}
          onChange={handleChange}
          rows={4}
          placeholder="Anything else we should know?"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg py-3 text-base font-bold shadow-md transition-transform hover:-translate-y-0.5"
        style={{ background: GOLD, color: NAVY }}
      >
        Submit
      </button>
      {submissionStatus && (
        <p
          className="mt-3 text-center text-sm font-medium"
          style={{
            color: submissionStatus.includes("successfully") ? "#0a7f3f" : "#dc2626",
          }}
        >
          {submissionStatus}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
