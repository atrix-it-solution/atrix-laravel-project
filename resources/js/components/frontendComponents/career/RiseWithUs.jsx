import React from 'react';
import rise_img from '../../assets/career/career.svg';
import Button from '../Button';

const RiseWithUs = ({ scrollToRolesSection }) => {
  return (
    <div>
      <div className="container mx-auto mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-7">
          <div className="md:pr-36 pt-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Be a part of Atrix IT Solutions
            </h2>
            <p className="mt-4 mb-10">
              Atrix IT Solutions is more than just a workplace — it’s a place where creative and hardworking people come together to achieve great things. We believe in teamwork, innovation, and helping each other grow.
            </p>

            {/* Button receives scroll function from parent */}
            <Button
              mybtn="Open Vacancies"
              targetRef={{
                current: {
                  scrollIntoView: scrollToRolesSection,
                },
              }}
            />
          </div>

          <div className="md:pl-36">
            <div className="img-wraper rounded-2xl overflow-hidden h-[400px]">
              <img src={rise_img} alt="Rise With Us" className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiseWithUs;
