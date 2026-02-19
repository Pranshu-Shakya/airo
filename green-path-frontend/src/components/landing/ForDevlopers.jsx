import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Code, Server, Wind, ArrowRight } from "lucide-react";
import PrimaryParagraph from "../PrimaryParagraph";
import PrimaryHeading from "../PrimaryHeading";
import PrimaryButton from "../PrimaryButton";
import { useNavigate } from "react-router-dom";

function ForDevelopers() {
    const navigate = useNavigate();
    return (
        <section className="w-full">
            <div
                className="
          grid grid-cols-1 lg:grid-cols-2
          items-stretch
          min-h-[40vh] lg:min-h-[50vh]
        "
            >
                {/* LEFT : Content */}
                <div className="app-bg flex items-center px-6 py-6 sm:px-10 lg:px-16">
                    <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                        <PrimaryHeading text="Built for Companies & Developers" />

                        <PrimaryParagraph
                            size="md"
                            text="Airo provides a unified API for air quality insights and health-optimised route intelligence. Build smarter fitness, navigation, or urban-mobility products without worrying about raw data complexity."
                        />

                        <div className="mt-6 flex justify-center lg:justify-start">
                            <PrimaryButton onClick={() => navigate("/docs")}>
                                Explore Docs <ArrowRight />
                            </PrimaryButton>
                        </div>
                    </div>
                </div>

                {/* RIGHT : Visual */}
             
                    <img 
                        src="/apiflow.png"
                        alt="api-flow"
                        className="w-full app-bg app-secondary-bg flex items-center justify-center px-6 py-6"
                    />
                
            </div>
        </section>
    );
}


export default ForDevelopers;
