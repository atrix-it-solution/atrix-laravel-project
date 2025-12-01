import React, { useState } from 'react';
const reacticons = "/assets/TechnologyImage/react.svg"
const GraphQL = "/assets/TechnologyImage/graphql.svg";
const TypeScript = "/assets/TechnologyImage/typescript.svg";
const JQuery = "/assets/TechnologyImage/jquery.svg";
const D3JS = "/assets/TechnologyImage/d3.svg";
const AngularJS = "/assets/TechnologyImage/angular.svg";
const VueJS = "/assets/TechnologyImage/vue.svg";
const Javascript = "/assets/TechnologyImage/javascript.svg";
const CSS = "/assets/TechnologyImage/css.svg";
const HTML = "/assets/TechnologyImage/html.svg";

const nodeicons = "/assets/TechnologyImage/node-js.svg"
const Ruby = "/assets/TechnologyImage/rubys.svg"
const DJnago = "/assets/TechnologyImage/django.svg"
const ExpressJS = "/assets/TechnologyImage/express-js.svg"
const ASPNet = "/assets/TechnologyImage/asp.svg"
const Laravel = "/assets/TechnologyImage/laravel.svg"
const Firebase = "/assets/TechnologyImage/firebase.svg"
import "./TechnologySecPart.css"

// Define TypeScript interface for technology item
interface TechnologyItem {
  icons: string;
  TechnologyName: string;
}

type SectionType = "frontend" | "backend";

const frontend: TechnologyItem[] = [
  { icons: GraphQL, TechnologyName: "GraphQL" },
  { icons: TypeScript, TechnologyName: "TypeScript" },
  { icons: JQuery, TechnologyName: "JQuery" },
  { icons: D3JS, TechnologyName: "D3 JS" },
  { icons: AngularJS, TechnologyName: "Angular JS" },
  { icons: reacticons, TechnologyName: "React JS" },
  { icons: VueJS, TechnologyName: "Vue JS" },
  { icons: Javascript, TechnologyName: "Javascript" },
  { icons: CSS, TechnologyName: "CSS" },
  { icons: HTML, TechnologyName: "HTML" },
];

const backend: TechnologyItem[] = [
  { icons: nodeicons, TechnologyName: "Node JS" },
  { icons: Ruby, TechnologyName: "Ruby" },
  { icons: DJnago, TechnologyName: "Django" },
  { icons: ExpressJS, TechnologyName: "Express JS" },
  { icons: ASPNet, TechnologyName: "ASP .Net" },
  { icons: Laravel, TechnologyName: "Laravel" },
  { icons: Firebase, TechnologyName: "Firebase" },
];

const TechnologySecPart: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>("frontend");

  const handleSectionChange = (section: SectionType) => {
    setActiveSection(section);
  };

  const data: TechnologyItem[] = activeSection === "frontend" ? frontend : backend;

  return (
    <div>
      <style>
        {`
          .icon-ul li:nth-child(1) > div, .icon-ul li:nth-child(6) > div {
            min-height: 250px;
          }
        `}
      </style>

      <div className="flex justify-center gap-3 mb-6">
        {(["frontend", "backend"] as SectionType[]).map((section) => (
          <h6
            key={section}
            className={`bg-(--black) text-sm md:text-lg rounded-full font-bold cursor-pointer relative flex justify-center items-center px-4 py-1 lg:px-8 lg:py-[6px] ${
              activeSection === section ? "bg-(--blue)" : ""
            }`}
            onClick={() => handleSectionChange(section)}
          >
            {section === "frontend" ? "Front-end" : "Back-end"}
            {activeSection === section && (
              <span className="absolute left-0 right-0 -bottom-1 mx-auto w-4 h-3 bg-(--blue) rotate-45 -z-10"></span>
            )}
          </h6>
        ))}
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <ul className="flex flex-wrap items-end justify-center icon-ul">
          {data.map((item, index) => (
            <li key={index} className="flex items-end w-[16.66%] p-[10px]">
              <div className="card-bg bg-(--black) rounded-lg w-full flex items-center justify-center flex-col min-h-[180px]">
                <div className="flex justify-center">
                  <img className="h-8 md:h-14" src={item.icons} alt={item.TechnologyName} />
                </div>
                <h6 className="text-sm lg:text-lg font-bold mt-6">{item.TechnologyName}</h6>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile */}
      <div className="md:hidden block">
        <ul className="grid grid-cols-2 items-end justify-center mt-5">
          {data.map((item, index) => (
            <li key={index} className="flex p-[10px]">
              <div className="bg-(--black) rounded-lg w-full flex items-center justify-center flex-col pt-6 pb-4">
                <div className="flex justify-center">
                  <img className="h-8 md:h-14" src={item.icons} alt={item.TechnologyName} />
                </div>
                <p className="text-lg md:text:5xl mt-3">{item.TechnologyName}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TechnologySecPart;
