enum Constants {
  g = 9.81,
  rho = 1.22,
  c1 = 3.59 * (10 ** -8),
  c2 = 4.23 * (10 ** -4),
}

export type Propeller = {
  diameter: number
  pitch: number
}

export type Battery = {
  battery:
    { cells: 2, voltage: 7.4 } |
    { cells: 3, voltage: 11.1 } |
    { cells: 4, voltage: 14.8 }
  capacity: number
}

export type Motor = {
  kV: number
  mass: {
    value: 40,
    units: 'g'
  }
}

export type WingArea = {
  value: number,
  units: 'cm^2' | 'm^2'
}

export type Mass = {
  value: number,
  units: 'g' | 'kg'
}

export type Plane = {
  wing_span: number
  wing_chord: number
  coefficient_of_lift: number
  coefficient_of_drag: number
  aspect_ratio: number
  mass: Mass
  propeller: Propeller
  battery: Battery
  motor: Motor
}

export function calculateWingArea(
  wing_span: number,
  wing_chord: number
): WingArea
{
  return {
    value: wing_span * wing_chord,
    units: 'cm^2'
  }
}

export function calculatePlaneMass(
  wing_area: WingArea
): Mass
{
  let area
  if (wing_area.units === 'cm^2')
    area = wing_area.value
  else
    area = wing_area.value * 100
  return {
    value: 0.25 * area,
    units: 'g'
  }
}

export function calculateCoefficientOfLift(
  coefficient_of_drag: number,
  aspect_ratio: number
)
{
  return coefficient_of_drag + (0.1 * Math.sqrt(aspect_ratio))
}

export function calculateMassOfBattery(
  battery: Battery
): Mass
{
  return {
    value: (battery.battery.voltage * battery.capacity) / 130,
    units: 'g'
  }
}

export function calculateMassOfPropeller(
  propeller: Propeller
): Mass
{
  return {
    value: propeller.diameter,
    units: 'g'
  }
}

export function calculateMassOfComponents(
  battery: Battery,
  motor: Motor,
  propeller: Propeller
): Mass
{
  return {
    value: calculateMassOfBattery(battery).value + motor.mass.value + calculateMassOfPropeller(propeller).value,
    units: 'g'
  }
}

export function calculateTotalMass(
  planeMass: Mass,
  componentsMass: Mass
): Mass
{
  return {
    value: planeMass.value + componentsMass.value,
    units: 'g'
  }
}

export function calculateMotorEfficiencyRating(
  propeller: Propeller,
  motor: Motor
)
{
  return 1.10 - 3.0E-2 * propeller.diameter - 1.1E-4 * motor.kV - 7.0E-6 * propeller.diameter * motor.kV
}

export function calculateAspectRatio(
  wing_span: number,
  wing_chord: number
)
{
  return (wing_span ** 2) / calculateWingArea(wing_span, wing_chord).value
}

export function calculateWCL(
  total_mass: Mass,
  wing_area: WingArea
)
{
  let area
  if (wing_area.units === 'cm^2')
    area = wing_area.value / 10000
  else
    area = wing_area.value

  let mass
  if (total_mass.units === 'g')
    mass = total_mass.value / 1000
  else
    mass = total_mass.value

  return mass / (area ** 1.5)
}

export function calculateWeight(
  total_mass: Mass
)
{
  let mass
  if (total_mass.units === 'g')
    mass = total_mass.value / 1000
  else
    mass = total_mass.value

  return mass * Constants.g
}

export function calculateLift(
  velocity: number,
  wing_area: WingArea,
  coefficient_of_lift: number
)
{
  let area
  if (wing_area.units === 'cm^2')
    area = wing_area.value / 10000
  else
    area = wing_area.value
  return 0.5 * Constants.rho * (velocity ** 2) * area * coefficient_of_lift
}

export function calculateThrust(
  RPM: number,
  propeller: Propeller,
  velocity: number
)
{
  return Constants.c1 * (Constants.rho * RPM * (propeller.diameter ** 3.5) / Math.sqrt(propeller.pitch)) * (Constants.c2 * RPM * propeller.pitch - velocity)
}

export function calculateEndurance(
  battery_capacity: number,
  current: number
)
{
  return battery_capacity / current
}

export function calculateCurrent(
  thrust: number,
  velocity: number,
  voltage: number
)
{
  return (thrust * velocity) / voltage
}

export function calculateRPM(
  efficiency_rating: number,
  kV: number,
  voltage: number
) {
  return efficiency_rating * kV * voltage
}

export function calculateMinimumVelocity(
  wing_area: WingArea,
  coefficient_of_lift: number,
  weight: number
)
{
  let area
  if (wing_area.units === 'cm^2')
    area = wing_area.value / 10000
  else
    area = wing_area.value
  return Math.sqrt((weight) / (0.5 * Constants.rho * area * coefficient_of_lift))
}

export function calculateThrustWithoutVelocityTermOne(
  RPM: number,
  diameter: number,
  pitch: number
) {
  return Constants.c1 * (Constants.rho * RPM * (diameter ** 3.5) / Math.sqrt(pitch))
}

export function calculateThrustWithoutVelocityTermTwo(
  RPM: number,
  pitch: number,
) {
  return Constants.c2 * RPM * pitch - 0
}

export function calculateDrag(
  wing_area: WingArea,
  coefficient_of_drag: number,
  velocity?: number
) {
  let area
  if (wing_area.units === 'cm^2')
    area = wing_area.value / 10000
  else
    area = wing_area.value
  return 0.5 * Constants.rho * ((velocity || 1) ** 2) * area * coefficient_of_drag
}

export function quadraticFormula(
  a: number,
  b: number,
  c: number
) {
  return (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a)
}

export function calculateMaximumVelocity(
  RPM: number,
  diameter: number,
  pitch: number,
  wing_area: WingArea,
  coefficient_of_drag: number
) {
  const thrustTermOne = calculateThrustWithoutVelocityTermOne(RPM, diameter, pitch)
  const thrustTermTwo = calculateThrustWithoutVelocityTermTwo(RPM, pitch)
  const drag = calculateDrag(wing_area, coefficient_of_drag)

  const thrust = thrustTermOne * thrustTermTwo
  return quadraticFormula(drag, thrustTermOne, -thrust)
}

export function calculateStability(
  aspect_ratio: number,
  wcl: number
) {
  return aspect_ratio / wcl
}

export function calculatePayloadCapacity(
  lift: number,
  total_mass: Mass
): Mass
{
  const maximumMass = lift / Constants.g

  let massOfPlane
  if (total_mass.units === 'g')
    massOfPlane = total_mass.value / 1000
  else
    massOfPlane = total_mass.value

  return {
    value: maximumMass - massOfPlane,
    units: 'kg'
  }
}

export function testWingArea(
  wing_area: WingArea
)
{
  let area
  if (wing_area.units === 'cm^2')
    area = wing_area.value
  else
    area = wing_area.value * 100
  if (area < 750 || area > 3500)
  return false
return true
}

export function testWingSpan(
  wing_span: number
)
{
  if (wing_span < 50)
  return false
return true
}

export function testWingChord(
  wing_chord: number
)
{
  if (wing_chord < 15)
  return false
return true
}

export function testMotorKvRating(
  motor: Motor
)
{
  if (motor.kV < 500 || motor.kV > 2500)
  return false
return true
}

export function testPropellerDiameter(
  diameter: number
)
{
  if (diameter < 4 || diameter > 13)
  return false
return true
}

export function testPropellerPitch(
  pitch: number
)
{
  if (pitch < 3 || pitch > 7.5)
  return false
return true
}

export function testRelationshipBetweenDiameterAndPitch(
  propeller: Propeller
)
{
  if (propeller.diameter < propeller.pitch)
  return false
return true
}

export function testCoefficientOfDrag(
  coefficient_of_drag: number
)
{
  if (coefficient_of_drag < 0.2 || coefficient_of_drag > 0.5)
  return false
return true
}

export function testBatteryCapacity(
  capacity: number
)
{
  if (capacity < 500 || capacity > 5000)
  return false
return true
}
