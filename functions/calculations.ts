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
  mass: 40
}

export type Plane = {
  wing_span: number
  wing_chord: number
  coefficient_of_lift: number
  coefficient_of_drag: number
  aspect_ratio: number
  mass: number
  propeller: Propeller
  battery: Battery
  motor: Motor
}

export function calculateWingArea(plane: Plane) {
  return plane.wing_span * plane.wing_chord
}

export function calculateMassOfPlane(plane: Plane) {
  return 0.25 * calculateWingArea(plane)
}

export function calculateCoefficientOfLift(plane: Plane) {
  return plane.coefficient_of_drag + (0.1 * Math.sqrt(plane.aspect_ratio))
}

export function calculateMassOfBattery(battery: Battery) {
  return (battery.battery.voltage * battery.capacity) / 130
}

export function calculateMassOfPropeller(propeller: Propeller) {
  return propeller.diameter
}

export function calculateMotorEfficiencyRating(plane: Plane) {
  return 1.10 - 3.0E-2 * plane.propeller.diameter - 1.1E-4 * plane.motor.kV - 7.0E-6 * plane.propeller.diameter * plane.motor.kV
}

export function calculateAspectRatio(plane: Plane) {
  return (plane.wing_span ** 2) / (plane.wing_span * plane.wing_chord)
}

export function calculateWCL(plane: Plane) {
  return plane.mass / (calculateWingArea(plane) ** 1.5)
}

export function calculateWeight(plane: Plane) {
  return plane.mass * Constants.g
}

export function calculateLift(
  velocity: number,
  wingArea: number,
  coefficientOfLift: number
) {
  return 0.5 * Constants.rho * (velocity ** 2) * wingArea * coefficientOfLift
}

export function calculateThrust(
  RPM: number,
  propeller: Propeller,
  velocity: number
) {
  return Constants.c1 * (Constants.rho * RPM * (propeller.diameter ** 3.5) / Math.sqrt(propeller.pitch)) * (Constants.c2 * RPM * propeller.pitch - velocity)
}

export function calculateEndurance(
  batteryCapacity: number,
  current: number
) {
  return batteryCapacity / current
}

export function calculateCurrent(
  thrust: number,
  velocity: number,
  voltage: number
) {
  return (thrust * velocity) / voltage
}

export function testWingArea(area: number) {
  if (area < 750 || area > 3500)
  return false
return true
}

export function testWingSpan(span: number) {
  if (span < 50)
  return false
return true
}

export function testWingChord(chord: number) {
  if (chord < 15)
  return false
return true
}

export function testMotorKvRating(motor: Motor) {
  if (motor.kV < 500 || motor.kV > 2500)
  return false
return true
}

export function testPropellerDiameter(diameter: number) {
  if (diameter < 4 || diameter > 13)
  return false
return true
}

export function testPropellerPitch(pitch: number) {
  if (pitch < 3 || pitch > 7.5)
  return false
return true
}

export function testRelationshipBetweenDiameterAndPitch(propeller: Propeller) {
  if (propeller.diameter < propeller.pitch)
  return false
return true
}

export function testCoefficientOfDrag(cd: number) {
  if (cd < 0.2 || cd > 0.5)
  return false
return true
}

export function testBatteryCapacity(capacity: number) {
  if (capacity < 500 || capacity > 5000)
  return false
return true
}
