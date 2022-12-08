import { useState } from 'react';
import { FaPlus, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Components
import ProgressBar from '../components/create-profile/ProgressBar';

const DashProfile = () => {
  const [formStep, setFormStep] = useState<number>(0);
  const [progressAmount, setProgressAmount] = useState<number>(20);

  const handleNextFormStep = () => {
    if (formStep >= 4) {
      setFormStep(100);
      return;
    }
    setFormStep((previousStep) => previousStep + 1);
    setProgressAmount((progressAmount) => progressAmount + 20);
  };

  const handlePreviousFormStep = () => {
    if (formStep === 0) {
      setFormStep(0);
      return;
    }
    setFormStep((previousStep) => previousStep - 1);
    setProgressAmount((progressAmount) => progressAmount - 20);
  };

  return (
    <div className="bg-theme-background">
      <div className="mx-auto flex h-screen max-w-prose flex-col items-center justify-center">
        <div className="max-w-prose rounded bg-white p-8 drop-shadow-md">
          <ProgressBar progress={progressAmount} />
          <div className="flex flex-col items-center">
            <h1 className="text-theme-headline text-xl font-semibold">
              Create profile
            </h1>
          </div>
          <form
            className="flex max-w-prose flex-col items-center space-y-5 py-6"
            noValidate
          >
            {/* SECTION 1 - JOB INFO */}
            {formStep === 0 && (
              <section>
                <fieldset className="flex w-80 flex-col space-y-1">
                  <div className="flex flex-row items-center justify-between">
                    <label
                      className="text-theme-headline text-xs font-semibold"
                      htmlFor="jobTitle"
                    >
                      What is your job title?
                    </label>
                    <span className="text-theme-paragraph text-xs">
                      Required
                    </span>
                  </div>
                  <input
                    type="text"
                    id="jobTitle"
                    className="bg-theme-input text-theme-paragraph ring-theme-button h-9 w-full rounded p-2 text-sm focus:outline-none focus:ring-2"
                  />
                  <span className="text-theme-tertiary text-xs font-semibold">
                     
                  </span>
                </fieldset>
                <fieldset className="flex w-80 flex-col space-y-1">
                  <div className="flex flex-row items-center justify-between">
                    <label
                      className="text-theme-headline text-xs font-semibold"
                      htmlFor="company"
                    >
                      Where do you work?
                    </label>
                    <span className="text-theme-paragraph text-xs">
                      Required
                    </span>
                  </div>
                  <input
                    type="text"
                    id="company"
                    className="bg-theme-input text-theme-paragraph ring-theme-button h-9 w-full rounded p-2 text-sm focus:outline-none focus:ring-2"
                  />
                  <span className="text-theme-tertiary text-xs font-semibold">
                     
                  </span>
                </fieldset>
                <fieldset className="flex w-80 flex-col space-y-1">
                  <div className="flex flex-row items-center justify-between">
                    <label
                      className="text-theme-headline text-xs font-semibold"
                      htmlFor="location"
                    >
                      Location
                    </label>
                  </div>
                  <input
                    type="text"
                    id="location"
                    className="bg-theme-input text-theme-paragraph ring-theme-button h-9 w-full rounded p-2 text-sm focus:outline-none focus:ring-2"
                  />
                  <span className="text-theme-tertiary text-xs font-semibold">
                     
                  </span>
                </fieldset>
              </section>
            )}
            {/* END SECTION 1 - JOB INFO */}
            {/* SECTION 2 - SOCIAL */}
            {formStep === 1 && (
              <section>
                <fieldset className="flex w-80 flex-col space-y-1">
                  <div className="flex flex-row items-center justify-between">
                    <label
                      className="text-theme-headline text-xs font-semibold"
                      htmlFor="portfolioUrl"
                    >
                      What is your portfolio URL?
                    </label>
                  </div>
                  <input
                    type="text"
                    id="portfolioUrl"
                    className="bg-theme-input text-theme-paragraph ring-theme-button h-9 w-full rounded p-2 text-sm focus:outline-none focus:ring-2"
                  />
                  <span className="text-theme-tertiary text-xs font-semibold">
                     
                  </span>
                </fieldset>
                <fieldset className="flex w-80 flex-col space-y-1">
                  <div className="flex flex-row items-center justify-between">
                    <label
                      className="text-theme-headline text-xs font-semibold"
                      htmlFor="twitter"
                    >
                      What is Twitter handle?
                    </label>
                  </div>
                  <input
                    type="text"
                    id="twitter"
                    className="bg-theme-input text-theme-paragraph ring-theme-button h-9 w-full rounded p-2 text-sm focus:outline-none focus:ring-2"
                  />
                  <span className="text-theme-tertiary text-xs font-semibold">
                     
                  </span>
                </fieldset>
                <fieldset className="flex w-80 flex-col space-y-1">
                  <div className="flex flex-row items-center justify-between">
                    <label
                      className="text-theme-headline text-xs font-semibold"
                      htmlFor="linkedin"
                    >
                      What is your LinkedIn handle?
                    </label>
                  </div>
                  <input
                    type="text"
                    id="linkedin"
                    className="bg-theme-input text-theme-paragraph ring-theme-button h-9 w-full rounded p-2 text-sm focus:outline-none focus:ring-2"
                  />
                  <span className="text-theme-tertiary text-xs font-semibold">
                     
                  </span>
                </fieldset>
                <fieldset className="flex w-80 flex-col space-y-1">
                  <div className="flex flex-row items-center justify-between">
                    <label
                      className="text-theme-headline text-xs font-semibold"
                      htmlFor="github"
                    >
                      What is your GitHub handle?
                    </label>
                  </div>
                  <input
                    type="text"
                    id="github"
                    className="bg-theme-input text-theme-paragraph ring-theme-button h-9 w-full rounded p-2 text-sm focus:outline-none focus:ring-2"
                  />
                  <span className="text-theme-tertiary text-xs font-semibold">
                     
                  </span>
                </fieldset>
              </section>
            )}
            {/* END SECTION 2 - SOCIAL */}
            {/* SECTION 3 - SKILLS */}
            {formStep === 2 && (
              <section>
                <fieldset className="flex w-80 flex-col space-y-1">
                  <div className="flex flex-row items-center justify-between">
                    <label
                      className="text-theme-headline text-xs font-semibold"
                      htmlFor="skills"
                    >
                      Enter up to 5 skills
                    </label>
                    <span className="text-theme-paragraph text-xs">
                      Required
                    </span>
                  </div>
                  <div className="space-between flex w-full flex-row">
                    <input
                      type="text"
                      id="skills"
                      className="bg-theme-input text-theme-paragraph ring-theme-button h-9 w-full rounded p-2 text-sm focus:outline-none focus:ring-2"
                    />
                    <button className="bg-theme-button text-theme-button-text hover:bg-theme-button-hover ml-4 flex h-9 items-center justify-center rounded px-4 transition">
                      <FaPlus />
                    </button>
                  </div>
                  <span className="text-theme-tertiary text-xs font-semibold">
                     
                  </span>
                </fieldset>
              </section>
            )}
            {/* END SECTION 3 - SKILLS */}
            {/* SECTION 4 - ABOUT */}
            {formStep === 3 && (
              <section>
                <fieldset className="flex w-80 flex-col space-y-1">
                  <div className="flex flex-row items-center justify-between">
                    <label
                      className="text-theme-headline text-xs font-semibold"
                      htmlFor="about"
                    >
                      A bit about yourself
                    </label>
                    <span className="text-theme-paragraph text-xs">
                      Required
                    </span>
                  </div>
                  <textarea
                    id="about"
                    className="bg-theme-input text-theme-paragraph ring-theme-button h-9 h-24 w-full rounded p-2 text-sm focus:outline-none focus:ring-2"
                  />
                  <span className="text-theme-tertiary text-xs font-semibold">
                     
                  </span>
                </fieldset>
              </section>
            )}
            {/* END SECTION 4 - ABOUT */}
            {/* SECTION 5 - OVERVIEW */}
            {formStep === 4 && (
              <section>
                <div className="flex w-80 flex-col space-y-1">
                  <h3 className="text-theme-headline mb-2 font-semibold">
                    Overview
                  </h3>
                  <div className="space-y-2 pb-4">
                    <p className="text-theme-paragraph text-xs font-semibold">
                      Job title:{' '}
                      <span className="font-normal">Front-End develoepr</span>
                    </p>
                    <p className="text-theme-paragraph text-xs font-semibold">
                      Company: <span className="font-normal">Apple</span>
                    </p>
                    <p className="text-theme-paragraph text-xs font-semibold">
                      Location: <span className="font-normal">London</span>
                    </p>
                    <p className="text-theme-paragraph text-xs font-semibold">
                      Portfolio URL:{' '}
                      <span className="font-normal">www.jossbleach.com</span>
                    </p>
                    <p className="text-theme-paragraph text-xs font-semibold">
                      Twitter: <span className="font-normal">JossBleach</span>
                    </p>
                    <p className="text-theme-paragraph text-xs font-semibold">
                      LinkedIn: <span className="font-normal">JossBleach</span>
                    </p>
                    <p className="text-theme-paragraph text-xs font-semibold">
                      GitHub: <span className="font-normal">JossBleach</span>
                    </p>
                    <p className="text-theme-paragraph text-xs font-semibold">
                      Skills:{' '}
                      <span className="font-normal">
                        HTML, ReactJS, CSS, NodeJs
                      </span>
                    </p>
                    <p className="text-theme-paragraph text-xs font-semibold">
                      About:{' '}
                      <span className="font-normal">
                        I'm a front end developer working for Apple in London.
                      </span>
                    </p>
                  </div>
                  <button
                    className="bg-theme-button text-theme-button-text hover:bg-theme-button-hover h-9 w-80 rounded text-sm transition disabled:cursor-not-allowed disabled:opacity-30"
                    type="submit"
                  >
                    Create profile
                  </button>
                </div>
              </section>
            )}
            {/* END SECTION 5 - OVERVIEW */}
            <div className="flex w-full justify-between">
              <span
                role="button"
                onClick={handlePreviousFormStep}
                aria-label="Go to previous form step"
                className="text-theme-button hover:theme-button-hover flex cursor-pointer items-center space-x-2 text-xs transition"
              >
                <FaChevronLeft className="mr-2" /> Back
              </span>
              <span
                role="button"
                onClick={handleNextFormStep}
                aria-label="Go to next form step"
                className="text-theme-button hover:theme-button-hover flex cursor-pointer items-center space-x-2 text-xs transition"
              >
                Next
                <FaChevronRight className="ml-2" />
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashProfile;
