import React from "react";
import {
  FaCalendarPlus,
  FaHandsHelping,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";

const FeatureSection = () => {
  return (
    <div className="w-full mx-auto">
      <section className="py-16 bg-base-200 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Join Our Platform?</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 bg-base-100 shadow rounded hover:shadow-lg transition">
            <FaCalendarPlus className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">
              Create & Manage Events
            </h3>
            <p>Organize impactful social events effortlessly.</p>
          </div>

          <div className="p-6 bg-base-100 shadow rounded hover:shadow-lg transition">
            <FaHandsHelping className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">
              Join Local Activities
            </h3>
            <p>Get involved in your community with just one click.</p>
          </div>

          <div className="p-6 bg-base-100 shadow rounded hover:shadow-lg transition">
            <FaUsers className="text-4xl text-purple-500 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">
              Connect with Volunteers
            </h3>
            <p>Meet passionate people who care about the same causes as you.</p>
          </div>

          <div className="p-6 bg-base-100 shadow rounded hover:shadow-lg transition">
            <FaChartLine className="text-4xl text-orange-500 mx-auto mb-4" />
            <h3 className="font-semibold text-xl mb-2">Track Your Impact</h3>
            <p>
              Monitor the events you’ve joined and see your contribution grow.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureSection;
