import React from "react";
import agent from "../../api/agent";

const About = () => {
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Uncaught Promise Rejection:", event.reason);
  });
  return (
    <div className="max-width mx-auto px-3 flex gap-3">
      <button
        className="bg-blue-500 text-white"
        onClick={() =>
          agent.TestError.get400Error().catch((error) => console.log(error))
        }
      >
        Test 400 Error
      </button>
      <button
        className="bg-blue-500 text-white"
        onClick={() =>
          agent.TestError.get401Error().catch((error) => console.log(error))
        }
      >
        Test 401 Error
      </button>
      <button
        className="bg-blue-500 text-white"
        onClick={() =>
          agent.TestError.get404Error().catch((error) => console.log(error))
        }
      >
        Test 404 Error
      </button>
      <button
        className="bg-blue-500 text-white"
        onClick={() =>
          agent.TestError.get500Error().catch((error) => console.log(error))
        }
      >
        Test 500 Error
      </button>
      <button
        className="bg-blue-500 text-white"
        onClick={() =>
          agent.TestError.getValidationError().catch((error) =>
            console.log(error)
          )
        }
      >
        Test Validation Error
      </button>
    </div>
  );
};

export default About;
