import React, { useState } from "react";
import "../styles.css";
import { css } from "emotion";

const Testimonial = () => {
  const quotes = {
    0: {
      client: "Marko J.",
      quote: "Awesome page,fast shipping!",
      work: "CEO of Health department",
    },
    1: {
      client: "Daniela",
      quote: "Quick delivery, like the product.",
      work: "Policeman",
    },
    2: {
      client: "Marina C.",
      quote: "Everything was perfect!",
      work: "Fireman",
    },
    3: {
      client: "Hugh",
      quote: "Impressive page, quick delivery. Thank you!",
      work: "Patient from General Hospital",
    },
    4: {
      client: "Marco",
      quote: "All good.",
      work: "Developer",
    },
    5: {
      client: "Laura",
      quote: "Perfect!",
      work: "Sales manager",
    },
    6: {
      client: "Dennis",
      quote: "Everything you need at one place!",
      work: "Retired lawyer",
    },
  };

  const [current, setCurrent] = useState(quotes[0]);

  const [active, setActive] = useState(0);

  const handleSetClick = (event) => {
    setCurrent(quotes[event.target.getAttribute("data-quote")]);
    setActive(event.target.getAttribute("data-quote"));
  };

  return (
    <div className="mt-4 bg">
      <div className="container">
        <h1 className="m-2 text-center p-2">Testimonials</h1>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 40px auto;
            max-width: 700px;

            h3,
            h2 {
              text-align: center;
              margin-bottom: 20px;
              color: #45454d;
            }
            h4 {
              text-align: center;
              margin-bottom: 20px;
              color: #45454d;
              text-transform: uppercase;
            }
          `}
        >
          <h2>"{current.quote}"</h2>
          <h3>{current.client}</h3>
          <h4>
            <i>{current.work}</i>
          </h4>
          <div
            className={css`
          display: flex;

          span {
            height: 20px;
            width: 20px;
            margin: 0 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          span::before {
            content: "";
            height: 6px;
            width: 6px;
            background-color: #d4d4d4;
            border-radius: 50%;
            transition: background-color 0.3s ease;
          }

          span:hover::before {
            background-color: #45454d;
          }

          span[data-quote="${active}"]::before{
            background-color: #45454d;
          }
        `}
          >
            {Object.keys(quotes).map((index) => (
              <span
                onClick={(event) => handleSetClick(event)}
                data-quote={index}
                key={index}
              >
                {" "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
