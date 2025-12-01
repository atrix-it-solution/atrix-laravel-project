import React from "react";
import CountUp from "react-countup";

const counterData = [
    { title: "Clients", count: 350, suffix: "+" },
    { title: "Departments", count: 4, suffix: "" },
    { title: "Talents", count: 80, suffix: "+" },
];

const CounterSec = () => {
    return (
        <div className="container mx-auto  pt-24">
            <div className="grid grid-cols-3 gap-6">

      
                {counterData.map((item, index) => (
                    <div key={index} className="flex flex-col gap-5">
                        <div className="counter-heading">
                            <h3 className="text-2xl  md:text-3xl font-bold  ">{item.title}</h3>
                        </div>
                        <hr className="max-w-[200px] border border-(--white)" />
                        <div className="counter">
                            <CountUp
                                end={item.count}
                                suffix={item.suffix}
                                className="text-4xl md:text-6xl font-bold"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CounterSec;
