const Cohort1 = (data) => {
  const impact = {};
  const severeImpact = {};

  // Challenge - 1
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  // Challenge - 2
  let calDays = 1;
  if (data.periodType === 'weeks') {
    calDays = 7;
  } else if (data.periodType === 'months') {
    calDays = 30;
  }
  const nDays = (data.timeToElapse * calDays);
  const factor = Math.trunc(nDays / 3);
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** factor);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** factor);

  impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
  let temp = severeImpact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = Math.trunc(temp * 0.15);

  const availableBeds = Math.trunc(data.totalHospitalBeds * 0.35);
  impact.hospitalBedsByRequestedTime = availableBeds - impact.severeCasesByRequestedTime + 1;
  temp = severeImpact.severeCasesByRequestedTime - 1;
  severeImpact.hospitalBedsByRequestedTime = availableBeds - temp;

  // Challenge - 3
  impact.casesForICUByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.05);
  temp = severeImpact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = Math.trunc(temp * 0.05);

  temp = impact.infectionsByRequestedTime;
  impact.casesForVentilatorsByRequestedTime = Math.trunc(temp * 0.02);
  temp = severeImpact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(temp * 0.02);

  temp = impact.infectionsByRequestedTime;
  impact.dollarsInFlight = Math.trunc((temp * 0.65 * data.region.avgDailyIncomePolulation) / nDays);
  temp = severeImpact.infectionsByRequestedTime;
  const tempDollarFlight = Math.trunc((temp * 0.65 * data.region.avgDailyIncomePolulation) / nDays);
  severeImpact.dollarsInFlight = tempDollarFlight;

  return { data, impact, severeImpact };
};

const covid19ImpactEstimator = (data) => {
  const estimator = Cohort1(data);

  return estimator;
};

export default covid19ImpactEstimator;
