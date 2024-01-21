import React from "react";
import agent from "../../api/agent";

const About = () => {
  return (
    <div className="max-width mx-auto px-3 flex gap-3">
      <button
        className="bg-blue-500 text-white"
        onClick={() => agent.TestError.get400Error()}
      >
        Test 400 Error
      </button>
      <button
        className="bg-blue-500 text-white"
        onClick={() => agent.TestError.get401Error()}
      >
        Test 401 Error
      </button>
      <button
        className="bg-blue-500 text-white"
        onClick={() => agent.TestError.get404Error()}
      >
        Test 404 Error
      </button>
      <button
        className="bg-blue-500 text-white"
        onClick={() => agent.TestError.get500Error()}
      >
        Test 500 Error
      </button>
      <button
        className="bg-blue-500 text-white"
        onClick={() => agent.TestError.getValidationError()}
      >
        Test Validation Error
      </button>
    </div>
  );
};

export default About;
