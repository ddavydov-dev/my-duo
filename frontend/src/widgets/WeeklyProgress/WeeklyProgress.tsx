import { WeeklyActivity } from "@prisma/client";
import { getCurrentWeek } from "~/utils";
import {
  ExpProgressBlock,
  ExpProgressTitle,
  WeeklyProgressContainer,
} from "./lib";

const DAY_COORDS = [
  "0.5",
  "42.166666666666664 0",
  "83.83333333333333 0",
  "125.5 0",
  "167.16666666666666 0",
  "208.83333333333334 0",
  "250.5 0",
];

const EXP_VALUES = [
  { val: 0, coords: "0 150.5" },
  { val: 0, coords: "0 113" },
  { val: 0, coords: "0 75.5" },
  { val: 0, coords: "0 38" },
  { val: 0, coords: "0 0.5" },
];

const DOTS_X_COORDS = [
  "0.5",
  "41.666",
  "83.333",
  "125",
  "166.666",
  "208.333",
  "250",
];

export default function WeeklyProgress({
  activity,
}: {
  activity: WeeklyActivity;
}) {
  const maxActivity = Math.max(...Object.values(activity));
  EXP_VALUES[1].val = Math.round(maxActivity / 3.5);
  EXP_VALUES[2].val = Math.round(maxActivity / 2.0);
  EXP_VALUES[3].val = Math.round(maxActivity / 1.2);
  EXP_VALUES[4].val = Math.round(maxActivity / 0.9);

  const days = getCurrentWeek();
  const dotsData = days.map((day, index) => ({
    x: DOTS_X_COORDS[index],
    y:
      maxActivity &&
      (activity[day as keyof WeeklyActivity] / EXP_VALUES[4].val) * 150,
    exp: activity[day as keyof WeeklyActivity],
  }));

  const filledBackgroundCoords = dotsData
    .map(({ x, y }, idx) => {
      if (idx === 0) return "M" + x + " " + y + " ";
      return "L" + x + " " + y + " ";
    })
    .join()
    .replace(/,/g, "");

  const progressLine = dotsData
    .map(({ x, y }, idx) => {
      if (idx === 0) return "M" + x + " " + y + " ";
      return "L" + x + " " + y + " ";
    })
    .join()
    .replace(/,/g, "");

  return (
    <WeeklyProgressContainer>
      <ExpProgressBlock>
        <ExpProgressTitle>XP Progress</ExpProgressTitle>
        <svg direction="ltr" height="220" width="320">
          <g transform="translate(45, 35)">
            <g></g>
            <g
              transform="translate(0, 150)"
              fill="none"
              fontSize="10"
              fontFamily="sans-serif"
              textAnchor="middle"
            >
              {days.map((day, index) => (
                <g
                  className="tick"
                  opacity="1"
                  transform={`translate(${DAY_COORDS[index]})`}
                  key={day}
                >
                  <text
                    fill="currentColor"
                    y="16"
                    dy="0.71em"
                    color="#cccac9"
                    fontFamily="din-round, sans-serif"
                    fontSize="17px"
                  >
                    {day}
                  </text>
                </g>
              ))}
            </g>
            <g
              transform=""
              fill="none"
              fontSize="10"
              fontFamily="sans-serif"
              textAnchor="end"
            >
              <path
                className="GNoB0"
                d={`M0 0L250 0L250 150L0 150Z`}
                fill="#ffc800"
                fillOpacity="0.1"
              ></path>
              <path
                className="GNoB0"
                d={`M0 0${filledBackgroundCoords} L250 150L208.33333333333334 150L166.66666666666666 150L125 150L83.33333333333333 150L41.666666666666664 150L0 150Z`}
                fill="#fff"
                fillOpacity="1"
                style={{ transform: "scaleY(-1) translateY(-150px)" }}
              ></path>

              <path
                className="QZq6Z"
                d={progressLine}
                fillOpacity="0"
                stroke="#ffc800"
                strokeOpacity="0.5"
                strokeWidth="2"
                style={{ transform: "scaleY(-1) translateY(-150px)" }}
              ></path>
              {EXP_VALUES.map(({ val, coords }) => (
                <g
                  className="tick"
                  opacity="1"
                  transform={`translate(${coords})`}
                  key={coords}
                >
                  <line
                    stroke="#dedede"
                    x2="250"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                  ></line>
                  <text
                    fill="currentColor"
                    x="-16"
                    dy="0.32em"
                    color="#cccac9"
                    fontFamily="din-round, sans-serif"
                    fontSize="17px"
                  >
                    {val}
                  </text>
                </g>
              ))}
            </g>
            <g>
              {dotsData.map(({ x, y, exp }) => (
                <circle
                  className="_2Hihu"
                  cx={x}
                  cy={y}
                  fill={exp > 50 ? "#ffc800" : "#fff"}
                  r="3.75"
                  stroke="#ffc800"
                  strokeWidth="2"
                  style={{ transform: "scaleY(-1) translateY(-150px)" }}
                  key={x + y}
                >
                  <title>{exp} XP</title>
                </circle>
              ))}
            </g>
          </g>
        </svg>
      </ExpProgressBlock>
    </WeeklyProgressContainer>
  );
}
