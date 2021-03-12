import styled from "@emotion/styled";
import colors from "@/styles/colors.json";
import fontFamily from "@/styles/fontFamily.json";
import { AgendaEvents } from "@/types/utils";
import { listMonthsFR } from "@/types/date";
import { Fragment, useMemo } from "react";

const Wrapper = styled.div({
  maxWidth: "800px",
});

type PropsPoint = {
  done?: boolean;
  first: boolean;
  last: boolean;
};

const WrapperPoint = styled.div<PropsPoint>(({ first, last, done }) => ({
  position: "absolute",
  left: "88px",
  top: "0",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:before": {
    position: "absolute",
    left: "calc(50% - 2px)",
    top: first ? "50%" : "0%",
    bottom: last ? "50%" : "0%",
    content: '""',
    border: `2px solid ${colors.light}`,
  },
  ".border-point": {
    backgroundColor: colors.light,
    borderRadius: "999rem",
    height: "18px",
    width: "18px",
    position: "relative",
    ".point": {
      backgroundColor: colors.white,
      borderRadius: "999rem",
      height: "12px",
      width: "12px",
      top: "3px",
      left: "3px",
      position: "absolute",
      zIndex: 10,
    },
    ".point.colored": {
      backgroundColor: colors.primary,
    },
    ".icon": {
      color: colors.primary,
      display: done ? "block" : "none",
      //
      fontSize: "10px",
      top: "5px",
      left: "4px",
      position: "absolute",
      zIndex: 20,
    },
  },
}));

const YearElement = styled.div({
  display: "flex",
  alignItems: "center",
  position: "relative",
  ".year": {
    color: colors.primary,
    fontFamily: fontFamily.display.join(","),
    fontSize: "1.5rem",
    fontWeight: "bold",
    lineHeight: "40px",
    marginLeft: "calc(83px + 36px)",
    textAlign: "center",
  },
});

const MonthElement = styled.div({
  display: "flex",
  alignItems: "center",
  position: "relative",
  paddingTop: "6px",
  paddingBottom: "6px",
  ".month": {
    flexShrink: 0,
    color: colors.primary,
    fontFamily: fontFamily.display.join(","),
    fontSize: "1.1rem",
    fontWeight: "bold",
    lineHeight: "1.5rem",
    width: "83px",
    textAlign: "center",
  },
  ".event": {
    marginLeft: "36px",
    color: colors.dark,
    fontFamily: fontFamily.body.join(","),
  },
});

type AgendaMapping = {
  year: number;
  elements: {
    month: string;
    events: {
      color: string;
      name: string;
    }[];
  }[];
};

const TestAgendaMappingYear = (year: number) => (e: AgendaMapping) =>
  e.year === year;
const TestAgendaMappingMonth = (month: string) => (e: AgendaMapping) =>
  e.elements.find((e) => e.month === month);
const TestAgendaMapping = (month: string, year: number) => (e: AgendaMapping) =>
  TestAgendaMappingYear(year)(e) && TestAgendaMappingMonth(month)(e);

const Agenda: React.FC = () => {
  const agendaEvents = useMemo(
    () =>
      AgendaEvents.reduce<AgendaMapping[]>((acc, event) => {
        const month = listMonthsFR[event.date.getMonth()];
        const year = event.date.getFullYear();
        if (!acc.find(TestAgendaMapping(month, year))) {
          if (!acc.find(TestAgendaMappingYear(year)))
            acc.push({ year, elements: [] });
          acc
            .find(TestAgendaMappingYear(year))
            ?.elements.push({ month, events: [] });
        }
        acc
          .find(TestAgendaMappingYear(year))
          ?.elements.find((e) => e.month === month)
          ?.events.push({
            color: event.color,
            name: event.name,
          });
        return acc;
      }, []),
    []
  );

  const [currentYear, currentMonth] = useMemo(() => {
    const date = new Date();
    return [date.getFullYear(), date.getMonth()];
  }, []);
  return (
    <div className="bg-background-1 flex justify-center items-center pt-4">
      <Wrapper className="flex flex-col items-center rounded-lg overflow-hidden">
        <div>
          {/* <YearElement>
            <span className="year font-display uppercase">Calendrier</span>
          </YearElement> */}
          {agendaEvents.map((listY, indexY) => (
            <Fragment key={listY.year}>
              <YearElement>
                <span className="year">{listY.year}</span>
                <WrapperPoint first={indexY === 0} last={false}>
                  <div className="border-point">
                    <div className="point colored" />
                  </div>
                </WrapperPoint>
              </YearElement>
              {listY.elements.map((listM, indexM) => (
                <MonthElement key={listM.month}>
                  <span className="month">{listM.month}</span>
                  <WrapperPoint
                    first={false}
                    last={
                      indexY === agendaEvents.length - 1 &&
                      indexM === listY.elements.length - 1
                    }
                    done={
                      listY.year < currentYear ||
                      (listY.year === currentYear &&
                        listMonthsFR.indexOf(listM.month) < currentMonth)
                    }
                  >
                    <div className="border-point">
                      <div className="point" />
                      <i className="fas fa-check icon" />
                    </div>
                  </WrapperPoint>
                  <span className="event">{listM.events[0].name}</span>
                </MonthElement>
              ))}
            </Fragment>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Agenda;
